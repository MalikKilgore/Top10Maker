import React from 'react'
import '../css/Upload.css';
import upCloud from '../assets/cloud-arrow-up-duotone.png'

function Upload(props: any) {
    function createList() {
        props.createList()
    }
    return (
        <div className="upload-Root">
            <div className="upload-Main">
                <input
                    className="username"
                    placeholder="Enter your username here"
                ></input> <br></br>
                <img
                    className="createBtn"
                    alt="Trash button here"
                    src={upCloud}
                    onClick={createList}></img> <br></br>
                <textarea className="newURL" placeholder="Weblink will generate here"></textarea>
            </div>
        </div>

    )
}

export default Upload;