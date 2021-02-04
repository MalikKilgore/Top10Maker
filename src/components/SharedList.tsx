import React from 'react'
import '../css/Share.css';
import plusCircle from '../assets/plus-circle-duotone.png'

// db.finished.insert({
//     title: "My Top 10 RPGs",
//     user: "@AnyUsername",
//     date: Date(),
//     likes: 2,
//     list: [],
//     url: "INSERT",
// })

function Share(props: any) {
    function createList() {
        props.createList()
    }
    return (
        <div className="share-Root">
            <div className="share-Main">
                <img
                    className="createBtn"
                    alt="Trash button here"
                    src={plusCircle}
                    onClick={createList}></img>
            </div>
        </div>

    )
}

export default Share;