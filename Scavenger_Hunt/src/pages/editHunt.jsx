import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Huntstep from "../components/huntStep";


function EditHunt(){
    const {huntId} = useParams()
    const [stepList, setStepList] = useState([])

    useEffect(() => {
        const getStepData = async () => {
            try{
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/hunt/list/${huntId}`)
                console.log("Response: ", response)
                setStepList(response.data)
                console.log("StepList: ", stepList)
                console.log("Step Data: ", response.data)

            }
            catch(error){
                console.log("Failed to load steps", error)

                if(error.response){
                    console.log("server responded with: ", error.response.status, error.response.data)
                }
            }
        }
        getStepData();
    }, [huntId]);

    return(
        <>{/* This may not be needed if play and edit are combined into one page */}
            <h1 className="flex place-content-center font-bold text-purple-600">Change...Change Away</h1>
            <div className="flex flex-col items-center">
                {stepList && stepList.length > 0 ? (
                    stepList.map(step => (
                        <Huntstep key = {step.id} stepId={step.id} clue = {step.clue} hint = {step.hint} img = {step.img} huntId = {huntId} isSaved={true} isPlayMode={false} isEditMode={true} onRevealHint={true} onRevealHintBtn={false}/>
                    ))
                ) : (
                    <p>No Steps found...</p>
                )}
            </div>
        </>
    )
}

export default EditHunt