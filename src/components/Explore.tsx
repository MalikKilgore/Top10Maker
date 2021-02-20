import React, { useState } from 'react';
import "../css/Explore.css";
import axios from 'axios';

function Explore() {
    //Stores Received lists in an array
    const [returnedLists, setRenderLists] = useState([]);

    return (
        <div className="explore-Root">
            this is the explore page
            <button onClick={populatePage}>Populate Page</button>
            <div className="explore-Main">
                {returnedLists.map((list: any) => <div key={list._id} className={'completeList'}>
                    {list.title}
                    <br></br>
                    {list.date}
                </div>)}
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
}

export default Explore