import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddUserForm from "./components/AddUserForm";
import StatsCards from "./components/StatsCards";
import CourseFilter from "./components/CourseFilter";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import StatusMessage from "./components/StatusMessage";
import ConfirmDialog from "./components/ConfirmDialog";
import BackendStatus from "./components/BackendStatus";

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
    const saved = localStorage.getItem("users");
    if (saved && JSON.parse(saved).length > 0) return;

    let cancelled = false;

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
          source: "api",
        }));
        if (!cancelled) setUsers(formatted);
      } catch (err) {
        if (!cancelled) setError(true);
        console.log(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    getUsersFromAPI();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleAddUser(userData) {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...userData } : u)));
      setEditingUser(null);
    } else {
      setUsers([...users, { id: Date.now(), ...userData, source: "local" }]);
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

  const courses = ["MERN", "React", "Node.js", "C++"];
  const courseCounts = { All: users.length };
  courses.forEach((c) => {
    courseCounts[c] = users.filter((u) => u.course === c).length;
  });

  const filteredUsers = users
    .filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((u) => courseFilter === "All" || u.course === courseFilter);

  const apiCount = users.filter((u) => u.source === "api").length;
  const localCount = users.filter((u) => u.source === "local").length;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 min-h-screen p-4 md:p-8 transition-colors">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
            <BackendStatus />
            <AddUserForm onAddUser={handleAddUser} editingUser={editingUser} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Users</h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Manage all users</p>

            <StatsCards total={users.length} apiCount={apiCount} localCount={localCount} />

            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <CourseFilter
              courses={["All", ...courses]}
              counts={courseCounts}
              selected={courseFilter}
              onSelect={setCourseFilter}
            />

            <StatusMessage loading={loading} error={error} />

            <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDeleteRequest} />
          </div>
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