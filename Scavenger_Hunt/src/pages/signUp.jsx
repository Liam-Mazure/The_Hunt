import {useNavigate} from "react-router-dom";
import { useState } from "react";
import axios, { Axios } from 'axios'

function SignUp(){
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
    })

    const handleChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try{
            console.log(formData)
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/user/signUp/`, formData);
            
            if(response && response.data){
                alert('User Created')
            }
            navigate("/user/signIn")
        }
        catch(error){
            if (error.response && error.response.data && error.response.data.error){
                alert(`Error: ${error.response.data.error}`)
            }
            else{
                alert('Failed to create User')
            }
            console.error(error)
        }
    }

    return(
        <div className = "flex flex-col items-center text-yellow-500" >
            <h1 className="flex place-content-center text-purple-700 text-shadow-yellow-500 text-shadow-lg font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Sign Up
            </h1>
            <form className = "flex flex-col bg-purple-600 w-3/4 rounded m-5 p-3" onSubmit={handleSubmit}>
                <div className = "flex p-1 w-3/4">
                    <label htmlFor = 'first_name'>First Name: </label>
                    <input className = "bg-white rounded" type = 'text' id = 'first_name' name = "first_name" onChange={handleChange}></input>
                
                    <label className = "m-1" htmlFor = 'last_name'>Last Name: </label>
                    <input className = "bg-white rounded" type = 'text' id = 'last_name' name = "last_name" onChange={handleChange}></input>
                </div>
                
                <label htmlFor = 'email'>Email: </label>
                <input className = "bg-white rounded" type = 'email' id = 'email' name = "email" onChange={handleChange}></input>
                
                <label htmlFor = 'username'>Username: </label>
                <input className = "bg-white rounded" type = 'text' id = 'username' name = "username" onChange={handleChange}></input>
                
                <label htmlFor = 'password'>Password: </label>
                <input className = "bg-white rounded" type = 'password' id = 'password' name = "password" onChange={handleChange}></input>
                
                {/* <label for = 'secondpass'>Confirm Password: </label>
                <input className = "bg-white rounded" type = 'password' id = 'secondpass' onChange={handleChange}></input> */}
                
                <button className = " font-bold m-2 hover:border-2 hover:border-yellow-500 rounded-sm" type = 'submit'>Create</button>
            </form>
        </div>
    )
}

export default SignUp 