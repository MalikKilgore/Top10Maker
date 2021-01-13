import React, { useState } from "react";
import '../css/ListItem.css';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import axios from 'axios'

function ListItem (props: any) {
    const [search, setSearch] = useState([``]);

      const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: props.id});

      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };
      const axiosConfig = {
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Client-ID': '4a1ri5yfip3ikw2rxmpgqjmu51nok7',
            'Authorization': `Bearer 1hb6wzs1cvaz2hc2z1uqkto5vw8cp7`,
          }
      };
      const fields = {
        limit: 10,
      }

      function gameRequest(){
        return axios.post(`https://api.igdb.com/v4/games`, fields, axiosConfig)
        .then((results) => {
          console.log(results)
        })
        .catch((err) => {
            console.log("Axios Error: ", err)
        })
      }
      
    return (
        <div className="item-Root" 
        ref={setNodeRef} style={style} {...attributes} {...listeners}> 
            <div className="item-Main">
                <img className="itemImage" alt="Video game cover"></img>
                <h1 className="itemTitle">Game title here</h1>
                <input className="itemSearch" onClick={gameRequest} placeholder="search games here..."></input>
                <p className="itemReview">Your review here</p>
            </div>
            <div className="item-Footer">
                Trash button here
            </div>
        </div>
    )
}

export default ListItem;