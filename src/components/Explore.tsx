import React, {useState} from 'react';
import "../css/Explore.css";
import axios from 'axios'

function Explore(){
    function populatePage(){

        axios.post('http://top10maker.com/explore')
    }

    return (
        <div className="share-Root">
            this is the explore page
            <button onClick={populatePage}>Populate Page</button>
        </div>
    )
}

export default Explore