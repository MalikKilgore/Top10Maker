import React from "react";
import '../css/ListItem.css';
//import {useDraggable} from '@dnd-kit/core';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

function ListItem (props: any) {
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
      
    return (
        <div className="item-Root" 
        ref={setNodeRef} style={style} {...attributes} {...listeners}> 
            <div className="item-Main">
                <img className="itemImage" alt="Video game cover"></img>
                <h1 className="itemTitle">Game title here</h1>
                <h3 className="itemSearch">Search Bar here</h3>
                <p className="itemReview">Your review here</p>
            </div>
            <div className="item-Footer">
                Trash button here
            </div>
        </div>
    )
}

export default ListItem;