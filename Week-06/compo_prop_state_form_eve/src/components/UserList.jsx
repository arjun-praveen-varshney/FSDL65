import UserCard from './UserCard';

export default function UserList({ users, deleteUser, setEditUser }) {
  return (
    <div className="user-list">
      <h2>Team Members ({users.length})</h2>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          deleteUser={deleteUser}
          setEditUser={setEditUser}
        />
      ))}
    </div>
  );
}