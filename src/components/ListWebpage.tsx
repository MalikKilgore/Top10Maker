import React, { useState } from "react";
import { useParams } from 'react-router-dom'
import '../css/ListWebpage.css'
import axios from 'axios';

function ListWebpage(props: any) {
    const { id } = useParams<Record<string, string | undefined>>()
    const [listInfo, setListInfo] = useState([]);
    // useEffect(() => {
    //     fetchWebpageData()
    // }, listInfo)

    return (
        <div className="webpage-Root" id={`${id}`}>
            <div className="webpage-Main">
                <h3>This is a list webpage with id of {id}</h3>
                <button onClick={fetchWebpageData}>Populate data</button>
                List info will go here, and will map through an array to populate the webpage.
                <div className="webpage-Data">

                    {listInfo.map((list: any) => (
                        <div className="webpage-Data">
                            <h1>{list.title}</h1>
                            <br></br>
                            <h3>Created by: {list.user}</h3>
                            <br></br>
                            <h3>Created on: {list.date}</h3>
                            <br></br>

                        </div>))}

                </div>
            </div>
        </div>
    )
    function fetchWebpageData() {
        axios.get(`http://top10maker.com/lists/${id}`).then((response) => {
            //Response is an object containing list information
            const webpage = response.data
            console.log(webpage)
            setListInfo(webpage)
        })
    }
}

export default ListWebpage