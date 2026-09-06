import UserCard from "./UserCard";

function UserList({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return <p className="col-span-full text-center text-gray-400 dark:text-gray-500">No user found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default UserList;