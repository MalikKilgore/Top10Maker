import React from "react";
import '../css/ListItem.css';

function ListItem () {
    return (
        <div className="item-Root"> 
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