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
                    required
                    onChange={event => props.setUsername(event.target.value)}
                ></input> 
                    <br></br>
                    <br></br>
                <input
                    className="title"
                    placeholder="Enter the title of your list here"
                    required
                    onChange={event => props.setListTitle(event.target.value)}
                ></input> 
                    <br></br>
                    <h1>Create List</h1>
                <img
                    className="createBtn"
                    alt="Trash button here"
                    src={upCloud}
                    onClick={createList}></img> <br></br>
            </div>
        </div>
    )
}

export default Upload;