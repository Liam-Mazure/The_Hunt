import React from "react";
import { useState } from "react";
import Huntstep from "../components/huntStep";
import axios from 'axios'

function CreateHunt() {
    const [stepCount, setStepCount] = useState(0);
    const [stepList, setStepList] = useState([]);
    const [huntData, setHuntData] = useState({
        title : '',
        total_steps : '',
    })

    const handleHuntChange = e => {
        setHuntData({...huntData, [e.target.name]: e.target.value})
    }

    const handleHuntSubmit = async e => {
        e.preventDefault();
        try{
            console.log(huntData)
            const dataToSend = {
                ...huntData,
                total_steps: stepCount
            }
            const reponse = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/hunt/create/`, dataToSend);

            if(reponse && reponse.data){
                alert('Hunt Created')
            }
        }
        catch(error){
            if(error.reponse && error.reponse.data && error.reponse.data.error){
                alert(`Error: ${error.reponse.data.error}`)
            }
            else{
                alert('Failed to create Hunt')
            }
            console.error(error)
        }
    }

    const addStepClick = () => {
        setStepCount(stepCount + 1);
        const Id = Date.now()
        setStepList(stepList => [...stepList, {id:Id}])
    };

    const removeStepClick = (idToDelete) => {
        setStepCount(stepCount - 1);
        setStepList(stepList => stepList.filter(step => step.id !== idToDelete));
    };


    return(
        <form className="flex flex-col" onSubmit={handleHuntSubmit}>
            <h1 className="flex justify-center text-yellow-500 text-shadow-purple-900 text-shadow-xs font-bold text-2xl ">Create Hunt</h1>

            <div className="flex justify-evenly items-center m-5">
                <label className="text-yellow-500 font-bold text-2xl text-shadow-purple-900 text-shadow-xs">Hunt Title: </label>
                <input className = "text-purple-600 font-bold border-yellow-500 border-2 rounded" type="text" id = 'title' name="title" onChange={handleHuntChange}></input>
                <button type = "button" className = "flex justify-center bg-purple-600 text-yellow-500 p-2 hover:cursor-pointer rounded-2xl" onClick={addStepClick}>Add Step: {stepCount}</button>
            </div>
            
            <div>
                {stepList.map(step => (
                    <Huntstep key={step.id} stepId={step.id} onDelete = {() => removeStepClick(step.id)}/>
                ))}
            </div>

            {stepCount >= 1 && (
                <button className="justify-center bg-yellow-500 font-bold text-purple-600 hover:cursor-pointer hover:bg-yellow-300 rounded m-20" type="submit">Create</button>
            )}

        </form>
    )
}

export default CreateHunt