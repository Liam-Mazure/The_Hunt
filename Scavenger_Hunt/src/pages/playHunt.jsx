import React, { useEffect, useState } from "react";
import Huntstep from "../components/huntStep";
import { useParams } from "react-router-dom";
import axios from "axios";


function PlayHunt(){
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
        <>
            <h1 className="flex place-content-center font-bold text-purple-600">Let the Hunt Begin</h1>
            <div className="flex flex-col items-center">
                {stepList && stepList.length > 0 ? (
                    stepList.map(step => (
                        <Huntstep key = {step.id} stepId={step.step} clue = {step.clue} hint = {step.hint} img = {step.img} huntId = {huntId} isSaved={true} setPlay={true} isEditMode={false}/>
                    ))
                ) : (
                    <p>No Steps found...</p>
                )}
            </div>
        </>
    )
}

export default PlayHunt