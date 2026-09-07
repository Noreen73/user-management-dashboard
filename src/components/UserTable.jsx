function UserTable({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return <p className="text-center text-gray-400 dark:text-gray-500 py-8">No user found</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-800 dark:bg-gray-900 text-white text-left">
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Course</th>
            <th className="px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className="border-t border-gray-100 dark:border-gray-700 hover:bg-indigo-50/50 dark:hover:bg-gray-700/40 transition"
            >
              <td className="px-4 py-3 text-gray-400">{index + 1}</td>
              <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{user.name}</td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{user.email}</td>
              <td className="px-4 py-3 text-indigo-600 dark:text-indigo-400">{user.course}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1.5 rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;