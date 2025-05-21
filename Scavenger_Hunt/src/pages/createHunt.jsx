import React from "react";
import { useState, useEffect } from "react";
import Huntstep from "../components/huntStep";
import axios from 'axios'

function CreateHunt() {
    const [huntCreated, setHuntCreated] = useState(false)
    const [stepCount, setStepCount] = useState(0);
    const [stepList, setStepList] = useState([]);
    const [huntId, setHuntId] = useState(null)
    const [huntData, setHuntData] = useState({
        title : '',
        total_steps : '',
    })

    const handleHuntChange = e => {
        setHuntData(huntData => ({...huntData, [e.target.name]: e.target.value}))
    }

    useEffect(() => {
        setHuntData(huntData => ({...huntData, total_steps: stepCount}))
    }, [stepCount])

    const handleHuntSubmit = async e => {
        e.stopPropagation()
        e.preventDefault();
        try{
            console.log("Submitting Hunt Data: ", huntData);
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/hunt/create/`, huntData);
            console.log("Submitted Hunt Data: ", huntData)
            if(response.data && response.data.id){
                alert('Hunt Created')
                setHuntId(response.data.id)
                setHuntCreated(true)
            }
        }
        catch(error){
            alert('Failed to create Hunt')
            console.error(error)
        }
    }

    const addStepClick = () => {
        if(!huntId){
            alert("Created the hunt before adding steps")
            return
        }
        const Id = Date.now()
        setStepCount(stepCount + 1);
        setStepList(stepList => [...stepList, {id:Id}])
    };

    const removeStepClick = async (idToDelete) => {
        setStepCount(stepCount - 1);
        setStepList(stepList => stepList.filter(step => step.id !== idToDelete));
    };

    const saveStepClick = (idToSave, updatedDate) => {
        setStepList(stepList => stepList.map(step => step.id === idToSave ? {...step, ...updatedDate, isSaved:true} : step))
    }


    return(
        <form className="flex flex-col" onSubmit={handleHuntSubmit} id="huntForm">
            <h1 className="flex justify-center text-yellow-500 text-shadow-purple-900 text-shadow-xs font-bold text-2xl ">Create Hunt</h1>

            <div className="flex justify-evenly items-center m-5">
                <label className="text-yellow-500 font-bold text-2xl text-shadow-purple-900 text-shadow-xs" htmlFor="title">Hunt Title: </label>
                <input className = "text-purple-600 font-bold border-yellow-500 border-2 rounded" type="text" id = 'title' name="title" onChange={handleHuntChange}></input>
                {huntCreated && (
                    <button type = "button" className = "flex justify-center bg-purple-600 text-yellow-500 p-2 hover:cursor-pointer rounded-2xl" onClick={addStepClick}>Add Step: {stepCount}</button>
                )}
            </div>
            
            {huntId && (
                <div className="flex flex-col items-center">
                    {stepList.map(step => (
                        <Huntstep key={step.id} stepId={step.id} onDelete = {() => removeStepClick(step.id)} onSave = {(updatedDate) => saveStepClick(step.id, updatedDate)} isSaved={step.isSaved} huntId={huntId}/>
                    ))}
                </div>
            )}

            <button className="justify-center bg-yellow-500 font-bold text-purple-600 hover:cursor-pointer hover:bg-yellow-300 rounded m-20" type="submit" form="huntForm">Create</button>

        </form>
    )
}

export default CreateHunt