import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import "../css/Explore.css";
import axios from 'axios';

function Explore(props: any) {
    //Stores Received lists in an array
    //DATA TYPES: post.list, post._id, post.date, post.title, post.user, post.url, post.likes
    const [returnedLists, setRenderLists] = useState<any[]>([]);
    useEffect(() => {
        populatePage()
    }, [])

    return (
        <div className="explore-Root">
            <div className="explore-Main">
                {returnedLists.map((post: any) => (
                    <Link
                        key={post._id}
                        id={post._id}
                        className={'completeList'}
                        to={`/list/${post._id}`}>
                        <h1>{post.title}</h1>
                        <br></br>
                        <h3>Created by: {post.user}</h3>
                        <br></br>
                        {/* <h3>Created on: {post.date}</h3> */}
                    </Link>))}
            </div>
        </div>
    )
    function populatePage() {
        axios.get('http://top10maker.com/search').then((response) => {
            //Response is an array of objects. The Objects are individual lists
            const array = response.data
            setRenderLists(array)
        })
    }
}

export default Explore