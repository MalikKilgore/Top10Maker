import React from 'react'
import plusCircle from '../assets/plus-circle-duotone.png'
import '../css/Social.css';

function Social(props:any) {
    function createList() {
        props.createList()
    }
    return (
        <div className="social-Root">
                <img
                    className="createBtn"
                    alt="Trash button here"
                    src={plusCircle}
                    onClick={createList}></img>
        </div>
    )
}

export default Social;