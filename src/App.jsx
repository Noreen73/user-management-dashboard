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
import Toast from "./components/Toast";

const API_URL = "http://localhost:5000/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [toast, setToast] = useState(null); // { type: "success" | "error", message: string }
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  function showToast(type, message) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }

  // ===== Fetch all users from Express backend =====
  async function fetchUsers() {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setUsers(result.data || []);
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // ===== Add or Update user =====
  async function handleAddUser(userData) {
    try {
      if (editingUser) {
        const response = await fetch(`${API_URL}/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        const result = await response.json();

        if (!response.ok) {
          showToast("error", result.message || "Failed to update user");
          return;
        }

        setUsers(users.map((u) => (u.id === editingUser.id ? result.data : u)));
        setEditingUser(null);
        showToast("success", "User updated successfully");
      } else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        const result = await response.json();

        if (!response.ok) {
          showToast("error", result.message || "Failed to add user");
          return;
        }

        setUsers([...users, result.data]);
        showToast("success", "User added successfully");
      }
    } catch (err) {
      showToast("error", "Could not reach the server");
      console.log(err);
    }
  }

  function handleEdit(user) {
    setEditingUser(user);
  }

  function handleDeleteRequest(user) {
    setUserToDelete(user);
  }

  async function confirmDelete() {
    try {
      const response = await fetch(`${API_URL}/${userToDelete.id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        showToast("error", result.message || "Failed to delete user");
        setUserToDelete(null);
        return;
      }

      setUsers(users.filter((u) => u.id !== userToDelete.id));
      showToast("success", "User deleted successfully");
    } catch (err) {
      showToast("error", "Could not reach the server");
      console.log(err);
    } finally {
      setUserToDelete(null);
    }
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

            <StatsCards total={users.length} />

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

      <Toast toast={toast} />
    </div>
  );
}

export default App;