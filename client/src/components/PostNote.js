import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';

const PostNote = ({onPostedNote}) => {
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [content, setContent] = useState('');

    let onClick = async () => {
        axios.post('http://localhost:3001/addnote', { userName, userImage, content })
          .then(function (response) {
            if (onPostedNote) {
                onPostedNote();
            }
          })
    }

    return (
        <StylePostNote>
            <div className="inputFields">
                <div>Name</div><input type="text" name="userName" onChange={e => setUserName(e.target.value)} />
                <div>Image URL (Optional)</div><input type="text" name="userImage" onChange={e => setUserImage(e.target.value)} />
            </div>
            <div className="contentField">
                <textarea type="text" name="content" onChange={e => setContent(e.target.value)}></textarea>
                <button onClick={onClick}>Post Message</button>
            </div>
        </StylePostNote>
    );
}

const StylePostNote = styled.div`
    border: solid 1px black;
    background-color: #f5f5f5;
    margin-top: 4px;
    padding: 8px;

    .inputFields {
        display: grid;
        grid-template-columns: 160px 1fr;
    }

    .contentField textarea {
        width: calc(100% - 6px);
    }

    .contentField button {
        width: 100%;
    }
`;

export default PostNote;