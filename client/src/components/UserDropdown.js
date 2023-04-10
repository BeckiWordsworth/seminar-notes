import { React, useState, useEffect } from 'react'
import styled from 'styled-components';

const UserDropdown = ({users, onSelectUser}) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  
  const toggleDropdown = () => setOpen(!isOpen);
  
  const onChangeUser = (id) => {
    setSelectedUserId(id);
    onSelectUser(id);
  }
  
  return (
    <StyledUserDropdown>
      <select value={selectedUserId} onChange={e => onChangeUser(e.target.value)}>
        <option>Select a User...</option>
        { users.map((user) => {
          return <option value={user._id} key={user._id}>{user.name}</option>
        })}
      </select>
    </StyledUserDropdown>
  )
}

const StyledUserDropdown = styled.div`
  margin-top: 6px;
  margin-bottom: 2px;

  select {
    width: 100%;
    font-size: 1rem;
    background-color: #f6f6f6;
    padding: 4px;
  }
`;

export default UserDropdown;
