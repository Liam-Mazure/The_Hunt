import React from "react"

function Login(){
    return(
        <div class = "flex justify-center m-5">
            <form class = "flex flex-col bg-purple-600 text-yellow-500 border-yellow-500 border-1 rounded-sm p-2">
    
                <label for = 'email'>Email: </label>
                <input class = "bg-white text-black" type = 'email' id = 'email'></input>

                <label for = 'pass'>Password: </label>
                <input class = "bg-white text-black" type = 'password' id = 'pass'></input>

                <input class = "hover:bg-purple-500 border-yellow-500 border-1 rounded-sm m-2 font-bold" type = 'submit' value = 'Submit'/>

            </form>
        </div>
    )
}

export default Login