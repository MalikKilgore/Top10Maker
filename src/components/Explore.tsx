import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import "../css/Explore.css";
import axios from 'axios';

function Explore() {
    //Stores Received lists in an array
    //DATA TYPES: post.list, post._id, post.date, post.title, post.user, post.url, post.likes
    const [returnedLists, setRenderLists] = useState([]);

    const history = useHistory();

    return (
        <div className="explore-Root">
            this is the explore page
            <button onClick={populatePage}>Populate Page</button>
            <div className="explore-Main">
                {returnedLists.map((post: any) => <Link 
                key={post._id}
                id={post._id}
                className={'completeList'}
                //onClick={loadWebpage}
                to={`/explore/lists/${post._id}`}>
                    {post.title}
                    <br></br>
                    <h3>Created by: {post.user}</h3>
                    <br></br>
                    <h3>Created on: {post.date}</h3> 
                    <br></br>
                    
                </Link>)}
            </div>
        </div>
    )
    function populatePage() {
        axios.get('http://top10maker.com/explore/lists').then((response) => {
            //Response is an array of objects. The Objects are individual lists
            const array = response.data
            setRenderLists(array)
        })
    }
    // function loadWebpage(){
    //     axios.get('http://top10maker.com/explore/lists/:id').then((response) => {
    //         //Response is an object containing list information
    //         const webpage = response.data
    //         console.log(webpage)
    //         history.push(`/explore/lists/${webpage._id}`)
    //     })
    // }
}

export default Explore