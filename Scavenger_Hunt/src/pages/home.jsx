import React from "react";
import treasureMap from "../images/Treasure_map_img.jpg"
import girlNmap from "../images/girlNmap.jpg"
import studyMap from "../images/mapStudy.jpg"
import editMap from "../images/mapEdit.jpg"

function Home(){

    return(
        <div className = "flex flex-col justify-center">
           
            <div className="relative w-full">
                <div className = "absolute inset-0 flex flex-col justify-center items-center text-center px-4 font-bold text-shadow-md text-shadow-yellow-500">
                    <h1 className = " text-purple-600 text-4xl sm:text-6xl md:text-7xl lg:text-8xl">Clue Chasers Wanted!</h1>
                    <h2 className = "text-purple-600 text-lg sm:text-xl md:text-2xl lg:text-3xl">Decode each clue uncovering the mysteries that lie ahead</h2>
                </div>
                
                
                <img className = "w-full object-cover h-auto" src = {treasureMap} alt="Treasure Map"/>
                
            </div>    
            
            <div className = "flex flex-col justify-evenly p-2 md:flex-row">
                <div className = "flex flex-col justify-between bg-purple-600 text-yellow-500 p-5 m-2 rounded md:w-100">
                    <h2 className="font-bold">Section 1</h2>
                    <img className = "h-screen w-screen object-cover rounded" src = {studyMap} alt = "create page pic"></img>
                    <a className="font-bold text-center text-purple-600 bg-yellow-500 rounded hover:cursor-pointer p-1 m-2" href = "/hunt/create/">Create Hunt</a>
                </div>
                <div className = "flex flex-col justify-between bg-purple-600 text-yellow-500 p-5 m-2 rounded md:w-100">
                    <h2 className="font-bold">Section 2</h2>
                    <img className = "w-screen h-screen object-cover rounded" src = {girlNmap} alt = "play page pic"></img>
                    <a className="font-bold text-center text-purple-600 bg-yellow-500 rounded hover:cursor-pointer p-1 m-2" href = "/hunt/list/play">Play Hunt</a>
                </div>
                <div className = "flex flex-col justify-between bg-purple-600 text-yellow-500 p-5 m-2 rounded md:w-100">
                    <h2 className="font-bold">Section 3</h2>
                    <img className = "h-screen w-screen object-cover rounded" src = {editMap} alt = "edit page pic"></img>
                    <a className="font-bold text-center text-purple-600 bg-yellow-500 rounded hover:cursor-pointer p-1 m-2" href = "hunt/list/edit">Edit Hunt</a>
                </div>
            </div>
        </div>
    )
}

export default Home