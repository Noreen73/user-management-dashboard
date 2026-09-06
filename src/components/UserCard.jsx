import Button from "./Button";

function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition">
      <p className="font-semibold text-gray-800 dark:text-white">{user.name}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{user.course}</p>
      <div className="flex gap-2">
        <Button variant="edit" onClick={() => onEdit(user)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(user)}>Delete</Button>
      </div>
    </div>
  );
}

export default UserCard;