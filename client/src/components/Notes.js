import React, { useState, useEffect } from 'react';
import Note from './Note'
import PostNote from './PostNote'
import styled from "styled-components";
import axios from 'axios';

const Notes = () => {
    // GET notes from http://localhost:3001/getnotes
    const [notes, setNotes] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const fetchNotes = async () => {
            const result = await axios('http://localhost:3001/getnotes');
            setNotes(result.data);
        };
    
        fetchNotes();
    }, [reload]);    

    let onPostedNote = () => {
        setReload(reload + 1);
    }

    return (
        <StyledNoteContainer>
            { notes ? <div>
                { notes.map((note) => { return <Note note={note} /> }) }
            </div> : <div>Loading...</div> }
            <PostNote onPostedNote={onPostedNote} />
        </StyledNoteContainer>
    );
}

const StyledNoteContainer = styled.div`
    width: 48%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    font-size: 1.5vmin;

    padding: 10px;
    background-color: white;
    border-radius: 10px;
`;

export default Notes;
