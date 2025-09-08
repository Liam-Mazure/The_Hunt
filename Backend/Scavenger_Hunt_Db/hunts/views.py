from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.template import loader
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage


from .models import Hunt, HuntStep, User
from .serializer import HuntSerializer, HuntStepsSerializer
from django.http import HttpResponse 

import boto3
from django.conf import settings
import logging

# Set up logger
logger = logging.getLogger(__name__)

# Create your views here.
class CreateHunt(APIView):
    serializer_class = HuntSerializer
    permission_classes = [IsAuthenticated]
    def post(self, request):
        if not request.session.exists(self.request.session.session_key):
            request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            id = serializer.validated_data.get('id')
            title = serializer.validated_data.get('title')

            # Fetch the User instance using the username provided
            author_username = request.user.username  # Since the user is already authenticated
            author = User.objects.get(username=author_username)  # This fetches the User instance

            queryset = Hunt.objects.filter(title=title)
            if queryset.exists():
                return Response({"error" : "A Hunt with this title already exists"})
            else:
                hunt = Hunt(title=title, author=author)
        hunt.save()
        return Response({"message" : "Hunt Created Successfully", "id": hunt.id})

class CreateHuntStep(APIView):
    stepSerializer_class = HuntStepsSerializer
    permissions_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        print("Authenticated User: ", request.user)
        print("Request Data: ", request.data)
        print("Requested FILES: ", request.FILES)
        
        # Add AWS configuration check
        logger.info("Checking AWS configuration...")
        aws_check = check_aws_config()
        if not aws_check:
            logger.error("AWS configuration failed - this may cause upload issues")

        serializer = self.stepSerializer_class(data=request.data)
        if serializer.is_valid():
            try:
                # Log before save
                if 'img' in request.FILES:
                    file = request.FILES['img']
                    logger.info(f"Attempting to upload image: {file.name} (size: {file.size} bytes)")
                
                # Save the step (this triggers the S3 upload)
                step = serializer.save()
                
                # Verify the upload worked
                if hasattr(step, 'img') and step.img:
                    logger.info(f"Step saved with image field: {step.img.name}")
                    
                    # Check if file actually exists in S3
                    if default_storage.exists(step.img.name):
                        logger.info(f"✓ File confirmed in S3: {step.img.name}")
                        logger.info(f"✓ File URL: {step.img.url}")
                    else:
                        logger.error(f"✗ File NOT found in S3: {step.img.name}")
                        return Response({
                            "error": "File upload failed - image not found in storage",
                            "details": f"Expected file: {step.img.name}"
                        }, status=400)
                else:
                    logger.warning("Step saved but no image field found")
                
                return Response({
                    "message": "Hunt Step Created Successfully",
                    "step": HuntStepsSerializer(step, context={"request": request}).data
                })
                
            except Exception as e:
                logger.error(f"Error during step creation: {str(e)}")
                return Response({
                    "error": "Failed to create hunt step",
                    "details": str(e)
                }, status=500)
        
        logger.error(f"Serializer validation failed: {serializer.errors}")
        return Response({"error": "Invalid Data", "Details": serializer.errors}, status=400)

class DeleteHuntStep(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, step_id):
        print(f"Trying to delete HuntStep with ID: {step_id}")

        try:
            step = HuntStep.objects.get(id=step_id)
            
            # Log image deletion
            if hasattr(step, 'img') and step.img:
                logger.info(f"Deleting image from S3: {step.img.name}")
            
            step.delete()
            return Response({'message':'Step Deleted'},status = status.HTTP_204_NO_CONTENT)
        except HuntStep.DoesNotExist:
            return Response({'error': 'Step Not Found'}, status = status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Unexpected error during deletion: {e}")
            return Response({'error': 'Server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UpdateHunt(APIView):
    def patch(self,request,*args, **kwargs ):
        hunt_id = kwargs.get('id')
        
        try:
            hunt = Hunt.objects.get(id = hunt_id)
        except Hunt.DoesNotExist:
            return Response(status = 404)
        
        serializer = HuntSerializer(hunt, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = 400)
        
class UpdateHuntStep(APIView):
    def patch(self,request, hunt_id, step_id):
        print("Request Data: ", request.data)
        try:
            hunt = Hunt.objects.get(id=hunt_id)
            step = HuntStep.objects.get(id=step_id)

            print("Hunt Id: ", hunt_id)
            print("Step: ", step)

            # Check if updating image
            if 'img' in request.FILES:
                file = request.FILES['img']
                logger.info(f"Updating step image: {file.name} (size: {file.size} bytes)")
        
            serializer = HuntStepsSerializer(step, data = request.data, partial = True)
            if serializer.is_valid():
                updated_step = serializer.save()
                
                # Verify updated image if one was uploaded
                if 'img' in request.FILES and hasattr(updated_step, 'img') and updated_step.img:
                    if default_storage.exists(updated_step.img.name):
                        logger.info(f"✓ Updated image confirmed in S3: {updated_step.img.name}")
                    else:
                        logger.error(f"✗ Updated image NOT found in S3: {updated_step.img.name}")
                
                return Response(serializer.data)
            
            logger.error(f"Update serializer validation failed: {serializer.errors}")
            return Response(serializer.errors, status = 400)
        
        except Hunt.DoesNotExist:
            return Response({'error': 'Hunt not found.'}, status=404)
        except HuntStep.DoesNotExist:
            return Response({'error': 'Step not found for this hunt.'}, status=404)
        except Exception as e:
            logger.error(f"Error during step update: {str(e)}")
            return Response({'error': 'Server error'}, status=500)

def play(request):
    return HttpResponse("Play Hunt")

def list_all_hunts(request):
    allhunts = Hunt.objects.all()
    serializer = HuntSerializer(allhunts, many=True)
    data = {
        'allhunts' : allhunts,
    }
    return JsonResponse(serializer.data, safe=False)

def list_hunt(request, id):
    hunt = Hunt.objects.get(id=id)
    serializer = HuntSerializer(hunt)
    template = loader.get_template('./allHunts.html')
    data = {
        'title': hunt.title,
        'total_steps':hunt.total_steps,
        'author': hunt.author,
    }
    return JsonResponse(serializer.data)

class GetHuntStep(APIView):
    def get(self, request, hunt_id):
        try:
            hunt = Hunt.objects.get(id=hunt_id)
            steps = HuntStep.objects.filter(hunt=hunt)
            serializer = HuntStepsSerializer(steps, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Hunt.DoesNotExist:
            return Response({'error': 'Hunt Not Found'}, status=status.HTTP_404_NOT_FOUND)
        
class HuntScore(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, hunt_id):
        hunt = Hunt.objects.get(id=hunt_id)
        user = request.user

        score = request.data.get('score')

        result = HuntScore.objects.create(user=user, hunt=hunt, score=score)

        return Response({
            "message": "Hunt Finished!",
            "score": score
        })

class LikeHunt(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, hunt_id):
        hunt = Hunt.objects.get(id=hunt_id)
        user = request.user

        if user in hunt.liked_by.all():
            hunt.liked_by.remove(user)
            return Response({'message': 'Hunt unliked'})
        else:
            hunt.liked_by.add(user)
            return Response({'message': 'Hunt liked'})

# AWS Configuration Check Function
def check_aws_config():
    """Debug function to verify AWS configuration"""
    try:
        logger.info(f"Checking AWS config - Bucket: {settings.AWS_STORAGE_BUCKET_NAME}")
        logger.info(f"Region: {getattr(settings, 'AWS_S3_REGION_NAME', 'Not set')}")
        logger.info(f"Access Key: {settings.AWS_ACCESS_KEY_ID[:4]}****")
        
        # Test credentials
        s3_client = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=getattr(settings, 'AWS_S3_REGION_NAME', None)
        )
        s3_client.head_bucket(Bucket=settings.AWS_STORAGE_BUCKET_NAME)
        logger.info("✓ Credentials and bucket access verified")
        return True
    except Exception as e:
        logger.error(f"✗ Credential test failed: {e}")
        return False

# Test View for AWS (you can remove this later)
class TestS3View(APIView):
    def get(self, request):
        """Test endpoint to check S3 connectivity"""
        result = check_aws_config()
        
        if result:
            # Try to list some objects
            try:
                s3_client = boto3.client('s3')
                response = s3_client.list_objects_v2(
                    Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                    MaxKeys=5
                )
                objects = response.get('Contents', [])
                return Response({
                    "status": "success",
                    "message": "S3 connection working",
                    "sample_objects": [obj['Key'] for obj in objects[:3]]
                })
            except Exception as e:
                return Response({
                    "status": "error",
                    "message": f"S3 list failed: {str(e)}"
                })
        else:
            return Response({
                "status": "error", 
                "message": "AWS configuration failed"
            })