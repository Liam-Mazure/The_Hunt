import React from "react";

function EditHunt(){
    return(
        <>{/* This may not be needed if play and edit are combined into one page */}
            <h1 className="flex place-content-center font-bold text-purple-600">Change...Change Away</h1>
            <div className="flex flex-col items-center">
                {stepList && stepList.length > 0 ? (
                    stepList.map(step => (
                        <Huntstep key = {step.id} stepId={step.step} clue = {step.clue} hint = {step.hint} img = {step.img} huntId = {huntId} isSaved={true} setPlay={true}/>
                    ))
                ) : (
                    <p>No Steps found...</p>
                )}
            </div>
        </>
    )
}

export default EditHunt