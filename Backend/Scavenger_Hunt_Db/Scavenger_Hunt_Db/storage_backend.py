# storage_backends.py
from storages.backends.s3boto3 import S3Boto3Storage

class MediaStorage(S3Boto3Storage):
    location = ''  # No prefix
    file_overwrite = False