import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Huntstep from "../components/huntStep";
import api from "../api";

function EditHunt(){
    const {huntId} = useParams()
    const [stepList, setStepList] = useState([])

    useEffect(() => {
        const getStepData = async () => {
            try{
                const response = await api.get(`${import.meta.env.VITE_APP_BACKEND_URL}/hunt/list/${huntId}`)
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

    const removeStepClick = async (idToDelete) => {
        setStepList(stepList => stepList.filter(step => step.id !== idToDelete));
    };

    return(
        <>{/* This may not be needed if play and edit are combined into one page */}
            <h1 className="flex place-content-center text-purple-700 text-shadow-yellow-500 text-shadow-lg font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Change...Change Away</h1>
            <div className="flex flex-col items-center">
                {stepList && stepList.length > 0 ? (
                    stepList.map(step => (
                        <Huntstep key = {step.id} stepId={step.id} clue = {step.clue} hint = {step.hint} img = {step.img} huntId = {huntId} isSaved={true} isPlayMode={false} isEditMode={true} onRevealHint={true} onRevealHintBtn={false} onDelete={removeStepClick}/>
                    ))
                ) : (
                    <p>No Steps found...</p>
                )}
            </div>
        </>
    )
}

export default EditHunt