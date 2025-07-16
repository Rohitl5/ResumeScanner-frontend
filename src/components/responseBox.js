import React from 'react';
import './responseBox.css'

function ResponseBox({data}){

    if (!data) return null;
    return (
        <div className =" response-container">

            <h2> Match Score : {data.matchScore}</h2>
            
            <p> {data.Summary}</p>
        </div>
    )
}

export default  ResponseBox;