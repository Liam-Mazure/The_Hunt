import React, { useEffect, useState } from "react";
import deleteStepIcon from "../images/orng-close-icon.svg"
import axios from 'axios'
import { useParams } from "react-router-dom";


function Huntstep({stepId, clue, hint, img, onDelete, onSave, isSaved, huntId, isPlayMode, isEditMode, onRevealHint, onRevealHintBtn}){
    const [isPlay, setIsPlay] = useState(isPlayMode)
    const [saved, setSaved] = useState(isSaved)
    const [isEdit, setIsEdit] = useState(isEditMode)
    const [uploadImg, setUploadImg] = useState(null)
    const [revealHint, setRevealHint] = useState(onRevealHint)
    const [revealHintBtn, setRevealHintBtn] = useState(onRevealHintBtn)
    const [stepData, setStepData] = useState({
        clue : '',
        img : '',
        hint : '',
    })
    console.log("Play: ", isPlay)
    console.log("Saved: ", saved)
    console.log("Edit: ", isEdit)

    useEffect(() => {
        if(saved){
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
                if(!isEdit){
                    onSave({...stepData, isSaved: true})
                }
            }
        }
        catch(error){
            alert('Failed to create Step')
            console.error(error)
        }
    }

    const handleSaveClick = () => {
        if(!isEdit){
            onSave(stepData)
            handleStepSubmit()
        }
        else{
            handleStepUpdate()
        }
        setSaved(true)
        setIsEdit(false)
        setIsPlay(true)
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
                onDelete(stepId)
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

    const handleEditClick = () => {
        setIsEdit(true)
        setIsPlay(false)
        setSaved(false)
    }

    const handleStepUpdate = async () => {
        const formData = new FormData();
        formData.append('clue', stepData.clue);
        formData.append('hint', stepData.hint);
        if(uploadImg instanceof File){
            formData.append('img', uploadImg);
        }
        
        try{
            const response = await axios.patch(`${import.meta.env.VITE_APP_BACKEND_URL}/hunt/list/${huntId}/update/${stepId}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            console.log(response)
        }
        catch(error){
            console.log(error)
        }
    }

    const handleRevealHint = () => {
        setRevealHint(revealHint => !revealHint)
    }

    return(
        <div id = {`huntStep-${huntId}`} className = "flex flex-col bg-purple-600 text-yellow-500 p-2 m-5 rounded-2xl w-1/2">
            {saved && isPlay &&(
                <button onClick={handleDelete}><img src = {deleteStepIcon} className="place-self-end hover:cursor-pointer"/></button>
            )}
            <h1>Hunt Step: </h1>
            <div className = "flex flex-col">

                {!saved && (
                    <input className="hover:cursor-pointer font-bold" type="file" id = "img" name = "img" accept="image/*" onChange={handleImgAdded}/>
                )}

                {uploadImg ? (
                    <img className = "border-2 border-yellow-500 rounded" src={URL.createObjectURL(uploadImg)} alt="No Img Uploaded"/>
                ) : stepData.img && (
                    <img className = "border-2 border-yellow-500 rounded" src={`${import.meta.env.VITE_APP_BACKEND_URL}${stepData.img}`} alt="No Img Uploaded"/>
                )}

                <label htmlFor = "clue">Clue: </label>
                {isPlay ? (
                    <textarea className = "bg-white rounded" id = "clue" name="clue" readOnly = {saved} onChange={handleStepChange}></textarea>
                ) : (
                    <textarea className = "bg-white rounded" id = "clue" name="clue" readOnly = {saved} onChange={handleStepChange} value={stepData.clue}></textarea>
                )}
                

                <label htmlFor = "hint">Hint: </label>
                {isPlay ? (
                    <textarea className = "bg-white rounded" id = "hint" name="hint" readOnly = {saved} onChange={handleStepChange}></textarea>
                ) : (
                    revealHint &&(
                        <textarea className = "bg-white rounded" id = "hint" name="hint" readOnly = {saved} onChange={handleStepChange} value={stepData.hint}></textarea>
                    ) 
                )}

                {!isPlay && !isEdit && revealHintBtn &&(
                    <button className="bg-yellow-500 text-purple-600 font-bold m-2 rounded-2xl hover:bg-green-600 hover:text-yellow-500" onClick={handleRevealHint}>Reveal Hint</button>
                )}
                

                {!saved && (
                    <>
                        <button type = "button" className = "bg-yellow-500 text-purple-600 font-bold m-2 rounded-2xl hover:bg-green-600 hover:text-yellow-500" onClick={handleSaveClick}>
                            Save
                        </button>
                        {isEdit && (
                            <button className = "bg-yellow-500 text-purple-600 font-bold m-2 rounded-2xl hover:bg-red-600 hover:text-yellow-500" onClick={handleDelete}>
                                Delete
                            </button>
                        )}
                    </>
                )}

                {isEdit && (
                    saved &&(
                        <>
                            <button type = "button" className = "bg-yellow-500 text-purple-600 font-bold m-2 rounded-2xl hover:bg-green-600 hover:text-yellow-500" onClick={handleEditClick}>Edit</button>
                            
                        </>
                    )
                )}

            </div>
        </div>
    )
}

export default Huntstep