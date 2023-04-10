import React, { useState, useEffect, useRef } from 'react';
import Note from './Note'
import UserDropdown from "./UserDropdown"
import PostNote from './PostNote'
import styled from "styled-components";
import axios from 'axios';

const Notes = () => {
    // GET notes from http://localhost:3001/getnotes
    const [notes, setNotes] = useState([]);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("");
    const [reload, setReload] = useState(0);
    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [notes]);

    useEffect(() => {
        const fetchNotes = async () => {
            const result = await axios('http://localhost:3001/getnotes');
            setNotes(result.data);
        };
    
        fetchNotes();
    }, [reload]);

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await axios('http://localhost:3001/getusers');
            setUsers(result.data);
        };
    
        fetchUsers();
    }, [reload]);

    //Callback for new note
    let onPostedNote = (newNote, error) => {
        if (newNote && !error) {
            setNotes(notes => [...notes, newNote]);
        } else {

            if (error) {
                alert(JSON.stringify(error));
            }
            setReload(reload + 1);
        }
    }

    let onSelectUser = async (userId) => {
        setUserId(userId);
    }

    return (
        <StyledNoteContainer>
            <NoteHistoryContainer>
                { notes ? <div>
                    { notes.map((note) => { return <Note note={note} key={note._id} /> }) }
                    <div ref={messagesEndRef} />
                </div> : <div>Loading...</div> }
            </NoteHistoryContainer>
            <UserDropdown users={users} onSelectUser={onSelectUser}/> 
            <PostNote onPostedNote={onPostedNote} userId={userId} />
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

const NoteHistoryContainer = styled.div`
    max-height: 600px;
    overflow: scroll;
`;

export default Notes;
