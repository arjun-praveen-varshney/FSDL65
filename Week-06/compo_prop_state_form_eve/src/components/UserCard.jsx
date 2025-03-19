export default function UserCard({ user, deleteUser, setEditUser }) {
    return (
      <div className="user-card">
        <div className="user-info">
          <h3>{user.name}</h3>
          <p>{user.role}</p>
          <p>{user.email}</p>
        </div>
        <div className="user-actions">
          <button 
            onClick={() => setEditUser(user)}
            className="btn edit-btn"
          >
            Edit
          </button>
          <button 
            onClick={() => deleteUser(user.id)}
            className="btn delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }