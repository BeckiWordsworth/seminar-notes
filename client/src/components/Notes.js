import React, { useState, useEffect, useRef } from 'react';
import Note from './Note'
import UserDropdown from "./UserDropdown"
import PostNote from './PostNote'
import styled from "styled-components";
import axios from 'axios';

const Notes = () => {
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
    //Callback for selected user
    let onSelectUser = async (userId) => {
        setUserId(userId);
    }

    return (
        <div>
            <StyledNoteContainer>
                <div className="NoteTitle">Discussion</div>
                <NoteHistoryContainer>
                    { notes ? <div>
                        { notes.map((note) => { return <Note note={note} key={note._id} /> }) }
                        <div ref={messagesEndRef} />
                    </div> : <div>Loading...</div> }
                </NoteHistoryContainer>
                <div className="NoteFooter">
                    <UserDropdown users={users} onSelectUser={onSelectUser} className="UserDropdown" /> 
                    <PostNote onPostedNote={onPostedNote} userId={userId} className="PostNote" />
                </div>                
            </StyledNoteContainer>
        </div>
    );
}

export default Notes;

const StyledNoteContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    font-size: 0.9rem;

    background-color: white;
    border: solid 1px #999;
    border-radius: 6px;

    .NoteTitle {
        padding: 6px 8px 6px 8px;
        text-align: center;
        background-color: #ddd;
        border-bottom: solid 1px #999;
        font-size: 1.1rem;
        font-weight: bold;
    }

    .NoteFooter {
        padding: 6px 6px 6px 6px;
        background-color: #ddd;
        border-top: solid 1px #999;
    }

    .UserDropdown {

    }

    .PostNote {
        margin-top: 6px;
    }

`;

const NoteHistoryContainer = styled.div`
    max-height: 400px;
    padding: 6px 10px 0 10px;
    overflow: scroll;

    @media screen and (min-width: 1000px) {
        max-height: 600px;
    }    
`;