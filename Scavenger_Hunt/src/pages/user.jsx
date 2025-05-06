import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import.meta.env.VITE_APP_BACKEND_URL

function User(){
    const [error, setError] = useState(null)
    const [userData, setUserData] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        const getUserData = async () => {
            try{
                const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/user/all/info/${id}`)
                if(!response.ok){
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setUserData(data)
            }
            catch(err){
                setError(err.message);
            }
        };
        getUserData();
    }, []);
        
    if (error) return <p>Error: {error}</p>
    if (!userData) return <p>Loading...</p>

    return(
        <div class = "flex flex-col items-center">
            <div class = "text-yellow-500 bg-purple-600 border-yellow-500 border-1 rounded-sm p-2 m-2 w-1/2">
                <h1 class = "">Current User: </h1>
                        
                <h1>First Name: {userData.first_name}</h1>

                <h3>Last Name: {userData.last_name}</h3>
            </div>

            <a className="flex justify-center bg-purple-600 text-yellow-500 p-2 m-2 w-1/2 rounded" href = "/user/editUser">Edit User</a>
            
            <a className="flex justify-center bg-purple-600 text-yellow-500 p-2 m-2 w-1/2 rounded" href = "/user/createUser">Create User</a>
        </div>
    )
}

export default User