import React, {useState} from 'react';
import "../css/Explore.css";
import axios from 'axios'

function Explore(){
    function populatePage(){

        axios.get('http://top10maker.com/explore/lists')
    }

    return (
        <div className="share-Root">
            this is the explore page
            <button onClick={populatePage}>Populate Page</button>
        </div>
    )
}

export default Explore