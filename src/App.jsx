import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddUserForm from "./components/AddUserForm";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import StatusMessage from "./components/StatusMessage";
import ConfirmDialog from "./components/ConfirmDialog";

function App() {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (users.length > 0) return;

    async function getUsersFromAPI() {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        const formatted = data.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          course: "MERN",
        }));
        setUsers(formatted);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    getUsersFromAPI();
  }, []);

  function handleAddUser(userData) {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...userData } : u)));
      setEditingUser(null);
    } else {
      setUsers([...users, { id: Date.now(), ...userData }]);
    }
  }

  function handleEdit(user) {
    setEditingUser(user);
  }

  function handleDeleteRequest(user) {
    setUserToDelete(user);
  }

  function confirmDelete() {
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    setUserToDelete(null);
  }

  function cancelDelete() {
    setUserToDelete(null);
  }

  const filteredUsers = users
    .filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((u) => courseFilter === "All" || u.course === courseFilter);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 md:p-8 transition-colors">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <Header
            totalUsers={users.length}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
          />
          <AddUserForm onAddUser={handleAddUser} editingUser={editingUser} />
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            courseFilter={courseFilter}
            onCourseFilterChange={setCourseFilter}
          />
          <StatusMessage loading={loading} error={error} />
          <UserList users={filteredUsers} onEdit={handleEdit} onDelete={handleDeleteRequest} />
        </div>
      </div>

      <ConfirmDialog
        open={!!userToDelete}
        message={`Are you sure you want to delete ${userToDelete?.name}?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}

export default App;