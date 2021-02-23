import React, { useState } from "react";
import { useParams } from 'react-router-dom'
import '../css/ListWebpage.css'
import axios from 'axios';

function ListWebpage(props: any) {
    const { id } = useParams<Record<string, string | undefined>>()
    const [listInfo, setListInfo] = useState<any[]>([]);
    const [uploader, setUploader] = useState('')
    const [title, setListTitle] = useState('')
    const [date, setCreatedOn] = useState('')
    // useEffect(() => {
    //     fetchWebpageData()
    // }, [])

    return (
        <div className="webpage-Root" id={`${id}`}>
            <div className="webpage-Main">
                <h3>This web url is {id}</h3>
                <button onClick={fetchWebpageData}>Load List</button>
                <br></br>
                <h1>{title}</h1>
                <br></br>
                <h3>Created by: {uploader}</h3>
                <br></br>
                <h3>Created on: {date}</h3>
                <br></br>
                
                <div className="webpage-Data">

                    {listInfo.map((list: any) => (
                        <div key={`${list.id}`} id={`${list.id}`} className="listItem-Root">
                            <img className="listItem-Cover" alt="Video game cover" src={list.cover}></img>
                            <h1 className="listItem-Title">{list.title}</h1>
                            <h2 className="listItem-Author">Review below written by: {list.user.author}</h2>
                            <p className="listItem-Review">{list.user.review}</p>
                        </div>))}

                </div>
            </div>
        </div>
    )
    function fetchWebpageData() {
        axios.get(`http://top10maker.com/lists/${id}`).then((response) => {
            //Response is an object containing list information
            const webpage = response.data
            //const url = webpage._id
            //const likes = webpage.likes
            const createdOn = webpage.date
            const title = webpage.title
            const uploader = webpage.user
            
            // v This is the array v
            const top10List = webpage.list

            console.log(top10List)
            setListInfo(top10List)
            setListTitle(title)
            setUploader(uploader)
            setCreatedOn(createdOn)
        })
    }
}

export default ListWebpage