import { useEffect, useState } from "react";
import ViewHunts from "../components/viewHunts";

function EditHunts(){

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
            <h1 className="flex place-content-center font-bold text-purple-600 text-shadow-2xs text-shadow-yellow-500">Edit Hunts</h1>
            <div className="flex flex-wrap p-5 m-5"> 
                {huntList.map(hunt => (
                    <ViewHunts key={hunt.id} hunt={hunt} />
                ))}
            </div>
        </div>
    )
}

export default EditHunts