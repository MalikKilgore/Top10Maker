import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import '../css/ListWebpage.css'
import axios from 'axios';

function ListWebpage(props:any) {
    const { id } = useParams<Record<string, string | undefined>>()
    const [listInfo, setListInfo] = useState([]);
    useEffect(() => {
        populateWebpage()
    }, [])

    return (
        <div className="webpage-Root" id={`${id}`}>
            This is a list webpage with id of {id}
            <div className="webpage-Main"> 
            List info will go here, and will map through an array to populate the webpage.
            </div>
        </div>
    )
    function populateWebpage(){
        axios.get(`http://top10maker.com/explore/lists/${id}`).then((response) => {
            //Response is an object containing list information
            const webpage = response.data
            console.log(webpage)
            setListInfo(webpage)
        })
    }
}

export default ListWebpage