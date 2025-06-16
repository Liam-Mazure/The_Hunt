import {useState} from "react";
import {useNavigate} from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";

function Form({route, method}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const name = method === "signin" ? "SignIn" : "SignUp"

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            console.log(`${email}, ${password}`)
            const res = await api.post(route, {email: email, password: password})
            
            if(method === "signin"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            }
            else{
                navigate("/user/signIn")
            }

        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <>
            <h1 className="flex place-content-center text-purple-700 text-shadow-yellow-500 text-shadow-lg font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                {name}
            </h1>

            <div className = "flex justify-center m-5">
            <form onSubmit = {handleSubmit} className = "flex flex-col bg-purple-600 text-yellow-500 border-yellow-500 border-1 rounded-sm p-2">
    
                <label htmlFor = 'email'>Email: </label>
                <input className = "bg-white text-black" type = 'email' id = 'email' value={email} onChange={(e) => setEmail(e.target.value)}></input>

                <label htmlFor = 'pass'>Password: </label>
                <input className = "bg-white text-black" type = 'password' id = 'pass' value={password} onChange={(e) => setPassword(e.target.value)}></input>

                <button className = "hover:bg-purple-500 border-yellow-500 border-1 rounded-sm m-2 font-bold" type = 'submit'>
                    {name}
                </button>

            </form>
        </div>
        </>
    )
}

export default Form