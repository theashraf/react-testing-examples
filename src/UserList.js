import React from "react";

const UserList = ({ users }) => {
  if (users.length === 0) return null;

  return (
    <ul>
      {users.map((user, i) => (
        <li key={i}>{user}</li>
      ))}
    </ul>
  );
};

export default UserList;
