import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

export default function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const addUser = (user) => {
    setUsers([...users, { ...user, id: Date.now() }]);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditUser(null);
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="container">
      <h1>Lab Team Manager</h1>
      <div className="app-content">
        <UserForm 
          addUser={addUser} 
          updateUser={updateUser} 
          editUser={editUser}
        />
        <UserList 
          users={users} 
          deleteUser={deleteUser} 
          setEditUser={setEditUser}
        />
      </div>
    </div>
  );
}