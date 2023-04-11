import styled from "styled-components";

const Note = ({note}) => {
    return (
        <StyledNote>
            <StyledNoteImg src={note.user.img}></StyledNoteImg>
            <StyledNoteContent>
                <div className="username">{note.user.name}</div>
                <div>{note.content}</div>
            </StyledNoteContent>
        </StyledNote>
    );
}

export default Note;

const StyledNote = styled.div`
    display: grid;
    grid-template-columns: 60px 1fr;
    padding: 4px 0px;
`;

const StyledNoteImg = styled.img`
    width: 50px;
`;

const StyledNoteContent = styled.div`
    text-align: left;

    .username {
        font-weight: bold;
        text-decoration: underline;
    }
`;