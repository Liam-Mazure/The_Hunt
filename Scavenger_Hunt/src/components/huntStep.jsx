import React, { useEffect, useState } from "react";
import deleteStepIcon from "../images/orng-close-icon.svg"
import axios from 'axios'


function Huntstep({stepId, clue, hint, img, onDelete, onSave, isSaved, huntId, setPlay}){
    const play = setPlay
    const [saved, setSaved] = useState(isSaved)
    const [toEdit, setToEdit] = useState(false)
    const [uploadImg, setUploadImg] = useState(null)
    const [stepData, setStepData] = useState({
        clue : '',
        img : '',
        hint : '',
    })

    useEffect(() => {
        if(isSaved){
            setStepData({
                clue : clue || '',
                img : img || '',
                hint : hint || '',
            })
        }
    }, [clue,hint,img,isSaved])

    const handleImgAdded = e => {
        const file = e.target.files[0]
        setUploadImg(file)
    }

    const handleStepChange = e => {
        setStepData({...stepData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        console.log("Huntstep received huntId:", huntId)
    }, [huntId])

    const handleStepSubmit = async (e) => {
        
        if(e){
            e.preventDefault()
        }

        console.log("huntId in Step: ", huntId)
        const formData = new FormData();
    
        formData.append('hunt', huntId);
        formData.append('step', stepId);
        formData.append('clue', stepData.clue);
        formData.append('hint', stepData.hint);
        if(uploadImg){
            formData.append('img', uploadImg);
        }

        for(let pair of formData.entries()){
            console.log(`${pair[0]}: ${pair[1]}`)
        }
        console.log("Submitted Form Data: ", formData)
        try{
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/hunt/createstep/`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if(response && response.data){
                alert('Step Created')
                setSaved(true);
                onSave({...stepData, isSaved: true})
            }
        }
        catch(error){
            alert('Failed to create Step')
            console.error(error)
        }
    }

    const handleSaveClick = () => {
        onSave(stepData)
        handleStepSubmit()
    }

    const handleDeleteSubmit = async () => {
        try{
            console.log(`ID to Delete: ${stepId}`)
            const response = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/hunt/deletestep/${stepId}/`, {
                data: {
                    hunt_id: huntId,
                }
            })
            if (response.status === 204){
                console.log("Step Deleted Successfully!")
            }
        }
        catch(error){
            console.error("Error Deleting Step", error)
        }
    }

    const handleDelete = () => {
        handleDeleteSubmit()
        onDelete(stepId)
    }

    return(
        <div id = {`huntStep-${huntId}`} className = "flex flex-col bg-purple-600 text-yellow-500 p-2 m-5 rounded-2xl w-1/2">
            {!play &&(
                isSaved &&(
                        <button onClick={handleDelete}><img src = {deleteStepIcon} className="place-self-end hover:cursor-pointer"/></button>
                )
            )}
            <h1>Hunt Step: {stepId}</h1>
            <div className = "flex flex-col">

                {!isSaved && (
                    <input className="hover:cursor-pointer font-bold" type="file" id = "img" name = "img" accept="image/*" onChange={handleImgAdded}/>
                )}

                {uploadImg ? (
                    <img className = "border-2 border-yellow-500 rounded" src={URL.createObjectURL(uploadImg)} alt="No Img Uploaded"/>
                ) : stepData.img && (
                    <img className = "border-2 border-yellow-500 rounded" src={`${import.meta.env.VITE_APP_BACKEND_URL}${stepData.img}`} alt="No Img Uploaded"/>
                )}

                <label htmlFor = "clue">Clue: </label>
                {!play ? (
                    <textarea className = "bg-white rounded" id = "clue" name="clue" readOnly = {isSaved} onChange={handleStepChange}></textarea>
                ) : (
                    <textarea className = "bg-white rounded" id = "clue" name="clue" readOnly = {isSaved} onChange={handleStepChange} value={stepData.clue}></textarea>
                )}
                

                <label htmlFor = "hint">Hint: </label>
                {!play ? (
                    <textarea className = "bg-white rounded" id = "hint" name="hint" readOnly = {isSaved} onChange={handleStepChange}></textarea>
                ) : (
                    <textarea className = "bg-white rounded" id = "hint" name="hint" readOnly = {isSaved} onChange={handleStepChange} value={stepData.hint}></textarea>
                )}
                

                {!isSaved && (
                    <>
                        <button type = "button" className = "bg-yellow-500 text-purple-600 font-bold m-2 rounded-2xl hover:bg-green-600 hover:text-yellow-500" onClick={handleSaveClick}>Save</button>
                        <button className = "bg-yellow-500 text-purple-600 font-bold m-2 rounded-2xl hover:bg-red-600 hover:text-yellow-500" onClick={handleDelete}>Delete</button>
                    </>
                )}

                {/* {toEdit && (
                    <>
                        <button type = "button" className = "bg-yellow-500 text-purple-600 font-bold m-2 rounded-2xl hover:bg-green-600 hover:text-yellow-500" >Edit</button>
                        
                    </>
                )} */}

            </div>
        </div>
    )
}

export default Huntstep