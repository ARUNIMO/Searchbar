import React, { useState, useEffect } from 'react';
import './Search.css'; 

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [availableUsers, setAvailableUsers] = useState([
    'John Doe',
    'Alice Smith',
    'Bob Johnson',
    'Emily Davis',
    'Chris Wilson',
  ]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [highlightedUser, setHighlightedUser] = useState(null);

  // Filter users based on user input
  const filteredUsers = availableUsers.filter((user) =>
    user.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Add user to the list of selected users
  const handleUserClick = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setAvailableUsers(availableUsers.filter((availableUser) => availableUser !== user));
    setInputValue('');
    setHighlightedUser(null);
  };

  // Remove user from selected users and add it back to the available users
  const handleChipRemove = (user) => {
    setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser !== user));
    setAvailableUsers([...availableUsers, user]);
  };

  // Highlight the last user when input is blank and backspace is pressed
  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && inputValue === '' && selectedUsers.length > 0) {
      setHighlightedUser(selectedUsers[selectedUsers.length - 1]);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputValue, selectedUsers]);

  return (
    <div className="auto-complete-chips-container">
      <h2 className="title">Pick Users</h2>
      <div className="search-bar-container">
        {selectedUsers.map((user) => (
          <div key={user} className="chip" onClick={() => handleChipRemove(user)}>
            🧑 {user} <span>&times;</span>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setHighlightedUser(null);
          }}
          onClick={() => setHighlightedUser(null)} // Clear highlighting on click
          placeholder={selectedUsers.length > 0 ? '' : 'Type to search...'}
        />

        <div className={`users-list ${inputValue !== '' ? 'visible' : ''}`}>
          {filteredUsers.map((user) => (
            <div
              key={user}
              className={highlightedUser === user ? 'highlighted' : ''}
              onClick={() => handleUserClick(user)}
            >
              🧑 {user}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
