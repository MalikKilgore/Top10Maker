import React from 'react'
import '../css/SharedList.css';
import plusCircle from '../assets/plus-circle-duotone.png'

function Share(props: any) {
    function createList() {
        props.createList()
    }
    return (
        <div className="share-Root">
            <div className="share-Main">
                <input
                    className="username"
                    placeholder="Enter your username here"
                ></input> <br></br>
                <img
                    className="createBtn"
                    alt="Trash button here"
                    src={plusCircle}
                    onClick={createList}></img> <br></br>
                <textarea className="newURL" placeholder="Weblink will generate here"></textarea>
            </div>
        </div>

    )
}

export default Share;