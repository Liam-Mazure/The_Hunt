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
    if (!userData) return <p className="flex justify-center font-bold text-2xl text-yellow-500 text-shadow-purple-700 text-shadow-sm p-2">Finding User Details...</p>

    return(
        <div className = "flex flex-col items-center">
            <div className = "text-yellow-500 font-bold bg-purple-600 border-yellow-500 border-4 rounded-sm p-3 m-3 w-1/2">
                <h1>Current User: </h1>
                        
                <h2>First Name: {userData.first_name}</h2>

                <h2>Last Name: {userData.last_name}</h2>

                <h2>Email: {userData.email}</h2>

                <h2>Username: {userData.username}</h2>


            </div>

            <a className="flex justify-center font-bold bg-purple-600 text-yellow-500 p-2 m-2 w-1/2 rounded hover:bg-yellow-500 hover:text-purple-700" href = "/user/editUser">Edit User</a>
            
            <a className="flex justify-center font-bold bg-purple-600 text-yellow-500 p-2 m-2 w-1/2 rounded hover:bg-yellow-500 hover:text-purple-700" href = "/user/signIn">Signout</a>
        </div>
    )
}

export default User