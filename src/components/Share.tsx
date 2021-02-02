import React from 'react'
import '../css/Share.css';
import plusCircle from '../assets/plus-circle-duotone.png'

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