import React from "react";

function Huntstep({stepId, onDelete}){

    return(
        <div class = "flex flex-col bg-purple-600 text-yellow-500 p-5 m-5 rounded-2xl">
            <h1>Hunt Step: {stepId}</h1>
            <form class = "flex flex-col">
                <label for = "cluePic">Photo: </label>
                <input className="hover:cursor-pointer font-bold" type="file" id = "cluePic" accept="image/*"></input>

                <label for = "clueTxt">Clue: </label>
                <textarea className = "bg-white rounded" id = "clueTxt"></textarea>

                <label for = "hintText">Hint: </label>
                <textarea className = "bg-white rounded" id = "hintTxt"></textarea>

                <button className = "bg-yellow-500 text-purple-600 font-bold m-2 rounded-2xl hover:bg-red-600 hover:text-yellow-500" onClick={onDelete}>Delete</button>
            </form>
        </div>
    )
}

export default Huntstep