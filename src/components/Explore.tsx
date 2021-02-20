import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import "../css/Explore.css";
import axios from 'axios';

function Explore(){
    function populatePage(){

        axios.get('http://top10maker.com/explore/lists').then((response) => {
            const array = response.data
            array.forEach(function(list:any){
                const element = <div className="completeList">{list}</div>;
                console.log(list)
                ReactDOM.render(element, document.getElementById('explore-Main'));
            })
        })
    }

    return (
        <div className="explore-Root">
            this is the explore page
            <button onClick={populatePage}>Populate Page</button>
            <div className="explore-Main">

            </div>
        </div>
    )
}

export default Explore