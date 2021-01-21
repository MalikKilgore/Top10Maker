import React, { useState } from "react";
import "../css/ListItem.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type } from "os";

function ListItem(props: any) {
  const [search, setSearch] = useState(``);

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

  // FETCH CONFIG BELOW
  async function gameRequest(event: any) {
    await setSearch(event.target.value)
    //console.log(search)
    const data = `search "${search}"; fields name;`
    //console.log(data)

    const request = new Request(
      "https://mysterious-beach-94424.herokuapp.com/https://oj9aui1qpi.execute-api.us-west-2.amazonaws.com/production/v4/games", 
    {
      method: 'POST',
      body: data
    });
    await fetch(request)
      .then((response) => {
        console.log(response.json());
        //return response.json()
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // FETCH CONFIG ABOVE

  return (
    <div className="item-Root" ref={setNodeRef} style={style}>
      <div className="item-Header" {...attributes} {...listeners}>
        Click here to drag!
      </div>
      <div className="item-Main">
        <img className="itemImage" alt="Video game cover"></img>
        <h1 className="itemTitle">Game title here</h1>
          <input
            className="itemSearch"
            placeholder="search games here..."
            value={search}
            onChange={gameRequest}
          ></input>
        <p className="itemReview">Your review here</p>
      </div>
      <div className="item-Footer">Trash button here</div>
    </div>
  );
}

export default ListItem;
