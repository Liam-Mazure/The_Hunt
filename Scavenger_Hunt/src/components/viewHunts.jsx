import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewHunts({hunt, step, mode}){
    const link = mode === "edit" 
        ? `/hunt/list/${hunt.id}/update`
        : `/hunt/list/${hunt.id}`
    return(
        <>
            <a href={link}>
                <div className="bg-purple-600 text-yellow-500 overflow-auto font-bold min-w-40 min-h-40 max-w-40 max-h-40 m-3 p-2 rounded border-yellow-500 border-4">
                    {/* The link to this is the same for play and edit*/}
                    <div>
                        <h1>Title: {hunt.title}</h1>
                        <p>Total Steps: {hunt.total_steps}</p>
                        <p>Author: {hunt.author}</p> 
                    </div>
                </div>
            </a>
        </>
    )
}

export default ViewHunts