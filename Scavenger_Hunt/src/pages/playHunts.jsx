import {React, useEffect, useState} from "react"
import ViewHunts from "../components/viewHunts"
import axios from "axios"

function Play(){
    const [play, setPlay] = useState(true)
    const [huntList, setHuntList] = useState([])
    const [huntData, setHuntData] = useState(null)

    useEffect(() => {
        const getHuntData = async () => {
            try{
                const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/hunt/list/`)

                if(!response.ok){
                    throw new Error("Failed to fetch Hunts")
                }
                const data = await response.json()
                console.log('Json Data', data)
                setHuntList(data)
                
                data.forEach((hunt, index) => {
                    console.log(`Hunt ${index}: `, hunt)
                })

            }
            catch(error){
                console.log(error)
            }
        };
        getHuntData();
    }, []);

    return(
        <div>
            <h1 className="flex place-content-center font-bold text-purple-700 text-shadow-yellow-500 text-shadow-lg text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Play Hunts</h1>
            <div className="flex flex-wrap justify-center p-5 m-5"> 
                {huntList.map(hunt => (
                    <ViewHunts key={hunt.id} hunt={hunt} mode = "play"/>
                ))}
            </div>
        </div>
    )
}

export default Play