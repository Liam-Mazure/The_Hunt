import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewHunts({hunt}){

    return(
        <>
            <div className="bg-purple-600 text-yellow-500 font-bold min-w-30 min-h-30 max-w-30 max-h-30 m-5 p-2 rounded">
                {/* The link to this is the same for play and edit*/}
                <a href={`/hunt/list/${hunt.id}`}>
                    <div>
                        <h1>Title: {hunt.title}</h1>
                        <p>Total Steps: {hunt.total_steps}</p> 
                    </div>
                </a>
            </div>
        </>
    )
}

export default ViewHunts