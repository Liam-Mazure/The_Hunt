import React from "react";
import treasureMap from "../images/Treasure_map_img.jpg"
import girlNmap from "../images/girlNmap.jpg"
import studyMap from "../images/mapStudy.jpg"
import editMap from "../images/mapEdit.jpg"

function Home(){

    return(
        <div class = "flex flex-col justify-center">
           
            <div className="flex">
                <div class = "absolute w-full h-full top-1/2 place-items-center font-bold text-shadow-md text-shadow-yellow-500">
                    <h1 class = " text-purple-600 text-5xl">Clue Chasers Wanted!</h1>
                    <h2 class = "text-purple-600 ">Decode each clue uncovering the mysteries that lie ahead</h2>
                </div>
                
                <div class = "flex justify-center">
                    <img src = {treasureMap} alt="Treasure Map" class = " "/>
                </div>
            </div>    
            
            <div class = "flex flex-col justify-evenly p-2 md:flex-row">
                <div class = "flex flex-col justify-evenly bg-purple-600 text-yellow-500 p-5 m-2 rounded md:w-100">
                    <h2>Section 1</h2>
                    <img className = "h-screen w-screen object-cover" src = {studyMap} alt = "create page pic"></img>
                    <a className="text-purple-600 bg-yellow-500 rounded hover:cursor-pointer p-1 m-2" href = "/hunt/create/">Create Hunt</a>
                </div>
                <div class = "flex flex-col justify-evenly bg-purple-600 text-yellow-500 p-2 m-2 rounded md:w-100">
                    <h2>Section 2</h2>
                    <img className = "w-screen h-screen object-cover" src = {girlNmap} alt = "play page pic"></img>
                    <a className="text-purple-600 bg-yellow-500 rounded hover:cursor-pointer p-1 m-2" href = "/hunt/list/">Play Hunt</a>
                </div>
                <div class = "flex flex-col justify-evenly bg-purple-600 text-yellow-500 p-5 m-2 rounded md:w-100">
                    <h2>Section 3</h2>
                    <img className = "h-screen w-screen object-cover" src = {editMap} alt = "edit page pic"></img>
                    <a className="text-purple-600 bg-yellow-500 rounded hover:cursor-pointer p-1 m-2" href = "hunt/edit/">Edit Hunt</a>
                </div>
            </div>
        </div>
    )
}

export default Home