import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import '../css/ListWebpage.css'
import axios from 'axios';

function ListWebpage(props: any) {
    const { id } = useParams<Record<string, string | undefined>>()
    const [listInfo, setListInfo] = useState<any[]>([]);
    const [uploader, setUploader] = useState('')
    const [title, setListTitle] = useState('')
    const [date, setCreatedOn] = useState('')
    useEffect(() => {
        fetchWebpageData()
    }, [])

    return (
        <div className="webpage-Root" id={`${id}`}>
            <div className="webpage-Main">
                <h3>Share this list: <h4 className="fullURL" 
                onClick={copyLink}> http://top10maker.com/list/{id}</h4></h3>
                <br></br>
                <h1>{title}</h1>
                <br></br>
                <h3>List created by: {uploader}</h3>
                <br></br>

                <div className="webpage-Data">

                    {listInfo.map((listitem: any) => (
                        <div key={`${listitem.id}`} id={`${listitem.id}`} className="listItem-Root">
                            <img className="listItem-Cover" alt="Video game cover" 
                            src={listitem.cover}></img>
                            <h1 className="listItem-Title">{listitem.title}</h1>
                            <p className="listItem-Desc">{listitem.description}</p>
                        </div>))}

                </div>
            </div>
        </div>
    )
    function fetchWebpageData() {
        axios.get(`http://top10maker.com/lists/${id}`).then((response) => {
            //Response is an object containing list information
            const webpage = response.data
            const createdOn = webpage.date
            const title = webpage.title
            const uploader = webpage.user

            // v This is the array v
            const top10List = webpage.list

            setListInfo(top10List)
            setListTitle(title)
            setUploader(uploader)
            setCreatedOn(createdOn)
        })
    }
    function copyLink(event: any){
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(event.target.value);
    }
}

export default ListWebpage