import React from 'react';
import {FaCheckCircle} from 'react-icons/fa'
function Status ({status}) {
    console.log("all", status)



    const statusIcon = (status) => {
        switch(status){
            case "Succeeded":
                return (<FaCheckCircle></FaCheckCircle>)
            default:
                return (<div></div>)

        }
    }
    
    
    return (<div>{status}{statusIcon(status)}</div>)    
}


export default Status
