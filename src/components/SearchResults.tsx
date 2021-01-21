import React, {useState} from 'react'
import "../css/SearchResult.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type } from "os";

function SearchResults(props: any){
    const [search, setSearch] = useState(``)
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

    return (
        <div className="searchRoot" ref={setNodeRef} style={style}>
            <img className="gameCover" alt="Game cover search result" src=""></img>
            <div className="gameTitle"></div>
            <div className="gameDesc"></div>
        </div>
    )
}

export default SearchResults;
