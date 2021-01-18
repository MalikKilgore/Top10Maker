import React, { useState } from "react";
import "../css/ListItem.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
//import axios from 'axios'

function ListItem(props: any) {
  const [search, setSearch] = useState([``]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
// FETCH CONFIG
/* 
    https://oj9aui1qpi.execute-api.us-west-2.amazonaws.com/production/v4/games/
    https://cors-anywhere.herokuapp.com/
    https://api.igdb.com/v4/games
*/
  async function gameRequest() {
   await fetch('https://cors-anywhere.herokuapp.com/' + 
   'https://oj9aui1qpi.execute-api.us-west-2.amazonaws.com/production/v4/games')
     .then((response) => {
        console.log(response.json());
        //return response.json()
      })
      .catch((err) => {
        console.log(err);
      });
  }
// FETCH CONFIG

  return (
    <div
      className="item-Root"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="item-Main">
        <img className="itemImage" alt="Video game cover"></img>
        <h1 className="itemTitle">Game title here</h1>
        <input
          className="itemSearch"
          onClick={gameRequest}
          placeholder="search games here..."
        ></input>
        <p className="itemReview">Your review here</p>
      </div>
      <div className="item-Footer">Trash button here</div>
    </div>
  );
}

export default ListItem;
