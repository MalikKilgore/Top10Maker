import React from "react";
// { useState }
import '../css/List.css';
import ListItem from './ListItem'

function List() {
 /* const [game, setGame] = useState([
    {
      //React hook
    },
  ]); */

  return (
    <div className="list-Root">
      <div className="list-Header"></div>
      <div className="list-Main">
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
      </div>
      <div className="list-Footer"></div>
    </div>
  );
}

export default List;