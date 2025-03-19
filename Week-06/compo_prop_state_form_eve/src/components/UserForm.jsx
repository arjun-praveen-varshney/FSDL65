import { useState, useEffect } from 'react';

export default function UserForm({ addUser, updateUser, editUser }) {
  const [user, setUser] = useState({
    name: '',
    role: 'Researcher',
    email: ''
  });

  useEffect(() => {
    if (editUser) setUser(editUser);
  }, [editUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name.trim() || !user.email.trim()) return;

    editUser ? updateUser(user) : addUser(user);
    setUser({ name: '', role: 'Researcher', email: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>{editUser ? 'Edit Member' : 'Add Team Member'}</h2>
      
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Role:</label>
        <select
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option>Researcher</option>
          <option>Lab Technician</option>
          <option>Project Manager</option>
          <option>Data Analyst</option>
        </select>
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
      </div>

      <button type="submit" className="btn">
        {editUser ? 'Update' : 'Add Member'}
      </button>
    </form>
  );
}