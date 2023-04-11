import React, { useState } from 'react';
import styled from "styled-components";
import axios from 'axios';

const PostNote = ({onPostedNote, userId, className}) => {
    const [content, setContent] = useState('');

    let onClickPost = async () => {
        try {
            let response = await axios.post('http://localhost:3001/addnote', { userId, content });
            
            // Call the onPostedNote callback with the new note
            if (onPostedNote) {
                if (response.data.error || !response.data.content) {
                    onPostedNote(null, response.data.error);
                } else {
                    onPostedNote(response.data, null);
                }
            }

            setContent("");
        } finally { }          
    };

    return (
        <StylePostNote className={className}>
            <div className="contentField">
                <textarea type="text" rows="3" name="content" onChange={e => setContent(e.target.value)} value={content}></textarea>
                <button onClick={onClickPost}>Post Message</button>
            </div>
        </StylePostNote>
    );
}

export default PostNote;

const StylePostNote = styled.div`
    .contentField textarea {
        width: calc(100% - 6px);
    }

    .contentField button {
        width: 100%;
        padding: 6px 0px;
        border-radius: 3px;
        border: solid 1px #333;
    }
`;