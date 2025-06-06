import React from "react";

function SignIn(){
    return(
        <>
            <h1 className="flex place-content-center text-purple-700 text-shadow-yellow-500 text-shadow-lg font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Sign In
            </h1>
            <div class = "flex justify-center m-5">
            <form class = "flex flex-col bg-purple-600 text-yellow-500 border-yellow-500 border-1 rounded-sm p-2">
    
                <label for = 'email'>Email: </label>
                <input class = "bg-white text-black" type = 'email' id = 'email'></input>

                <label for = 'pass'>Password: </label>
                <input class = "bg-white text-black" type = 'password' id = 'pass'></input>

                <input class = "hover:bg-purple-500 border-yellow-500 border-1 rounded-sm m-2 font-bold" type = 'submit' value = 'Submit'/>

            </form>
        </div>
        </>
    )
}

export default SignIn