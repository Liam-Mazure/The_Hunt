import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditUser(){
    const [userData, setUserData] = useState(null)
    const [isEdit, setIsEdit] = useState(true)
    const [isSaved, setIsSaved] = useState(false)
    const userId = localStorage.getItem("id")

    useEffect(() => {
        const getUserData = async () => {
            try{
                const userId = localStorage.getItem("id")
                const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/user/all/info/id:${userId}`)
                if(!response.ok){
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setUserData(data)
            }
            catch(error){
                console.log(error)
            }
        };
        getUserData();
    }, []);

    if(!userData){ 
        return <div className="flex justify-center font-bold text-2xl text-yellow-500 text-shadow-purple-700 text-shadow-sm p-2">Loading...</div>;
    }

    const handleSaveClick = () => {
        setIsSaved(!isSaved)
        setIsEdit(!isEdit)
    }

    const handleEditClick = () => {
        setIsEdit(!isEdit)
        setIsSaved(!isSaved)
    }

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    return(
        <div className="flex flex-col items-center">
            <h1 className="text-purple-700 text-shadow-yellow-500 text-shadow-lg font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Edit User</h1>

            {isEdit && (
                <div className = "text-yellow-500 bg-purple-600 border-yellow-500 border-4 rounded-sm p-3 m-3 w-1/2">
                    <h1 className="font-bold text-2xl">Current User: </h1>
                            
                    <h2>First Name: {userData.first_name}</h2>

                    <h2>Last Name: {userData.last_name}</h2>

                    <h2>Email: {userData.email}</h2>

                    <h2>Username: {userData.username}</h2>

                </div>
            )}

            {!isEdit && (
                <div className = "flex flex-col font-bold bg-purple-600 text-yellow-500 w-3/4 rounded m-5 p-3">
                    <div className = "flex p-1">
                        <label htmlFor = 'first_name'>First Name: </label>
                        <input className = "bg-white rounded w-1/2" type = 'text' value = {userData.first_name} id = 'first_name' name = "first_name" onChange={handleChange}></input>
                    
                        <label className = "m-1" htmlFor = 'last_name'>Last Name: </label>
                        <input className = "bg-white rounded w-1/2" type = 'text' value = {userData.last_name} id = 'last_name' name = "last_name" onChange={handleChange}></input>
                    </div>
                    
                    <label htmlFor = 'email'>Email: </label>
                    <input className = "bg-white rounded" type = 'email' value = {userData.email} id = 'email' name = "email" onChange={handleChange}></input>
                    
                    <label htmlFor = 'username'>Username: </label>
                    <input className = "bg-white rounded" type = 'text' value = {userData.username} id = 'username' name = "username" onChange={handleChange}></input>
                    
                    <label htmlFor = 'password'>Password: </label>
                    <input className = "bg-white rounded" type = 'password' id = 'password' name = "password" onChange={handleChange}></input>
                    
                </div>
            )}

            
            {isSaved && (
                <button type = "button" className = "bg-yellow-500 text-purple-600 font-bold m-2 rounded hover:bg-green-600 hover:text-yellow-500 w-1/2" onClick={handleSaveClick}>
                    Save
                </button>
            )}

            {isEdit && (
                <button type = "button" className = "bg-yellow-500 text-purple-600 font-bold m-2 rounded hover:bg-green-600 hover:text-yellow-500 w-1/2" onClick={handleEditClick}>
                    Edit
                </button>
            )}
        </div>
    )
}

export default EditUser