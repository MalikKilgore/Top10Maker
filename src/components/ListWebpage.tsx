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
    // }, listInfo)

    return (
        <div className="webpage-Root" id={`${id}`}>
            <div className="webpage-Main">
                <h3>This is a list webpage with id of {id}</h3>
                <button onClick={fetchWebpageData}>Populate data</button>
                List info will go here, and will map through an array to populate the webpage.
                <div className="webpage-Data">
                    <h1>{title}</h1>
                        <br></br>
                    <h3>Created by: {uploader}</h3>
                        <br></br>
                    <h3>Created on: {date}</h3>
                        <br></br>

                    {listInfo.map((list: any) => (
                        <div className="webpage-Data">
                            <h1>{list.title}</h1>
                        </div>))}

                </div>
            </div>
        </div>
    )
    function parseArray(){
        //Might do object conversion here with listInfo as well.
        // const array = [...listInfo]
        // for (let i = 0; i < array.length; i++){
        //     let object = array[i]

        // }
    }
    function fetchWebpageData() {
        axios.get(`http://top10maker.com/lists/${id}`).then((response) => {
            //Response is an object containing list information
            const webpage = response.data
            const url = webpage._id
            const createdOn = webpage.date
            const title = webpage.title
            const uploader = webpage.user
            const likes = webpage.likes
            const top10List = webpage.list
            // for (let i = 0; i < top10List.length; i++){
            //     let object = top10List[i]

            // }
            console.log(top10List)
            setListInfo(top10List)
            setListTitle(title)
            setUploader(uploader)
            setCreatedOn(createdOn)
        })
    }
}

export default ListWebpage