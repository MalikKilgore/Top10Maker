import React from "react";
import {useParams} from 'react-router-dom'
import '../css/ListWebpage.css'

function ListWebpage(props:any) {
    const { id } = useParams<Record<string, string | undefined>>()

    return (
        <div 
        className="webpage-Root"
        id={`${id}`}>
            This is a list webpage with id of {id}
        </div>
    )
    function populateWebpage(){
        
    }
}

export default ListWebpage