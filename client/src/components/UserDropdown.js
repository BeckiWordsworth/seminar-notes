import { React, useState, useEffect } from 'react'
import styled from 'styled-components';

const UserDropdown = ({users, onSelectUser, className}) => {
  const [selectedUserId, setSelectedUserId] = useState("");
    
  const onChangeUser = (id) => {
    setSelectedUserId(id);
    onSelectUser(id);
  }
  
  return (
    <StyledUserDropdown className={className}>
      <select value={selectedUserId} onChange={e => onChangeUser(e.target.value)}>
        <option>Select a User...</option>
        { users.map((user) => {
          return <option value={user._id} key={user._id}>{user.name}</option>
        })}
      </select>
    </StyledUserDropdown>
  )
}

export default UserDropdown;

const StyledUserDropdown = styled.div`
  select {
    width: 100%;
    font-size: 1rem;
    background-color: #f6f6f6;
    padding: 4px;
  }
`;
