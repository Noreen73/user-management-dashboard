import { useState, useEffect } from "react";
import Button from "./Button";

function AddUserForm({ onAddUser, editingUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setCourse(editingUser.course);
    }
  }, [editingUser]);

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !course.trim()) {
      setError("Please fill all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    onAddUser({ name: name.trim(), email: email.trim(), course: course.trim() });
    setName("");
    setEmail("");
    setCourse("");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 mb-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button type="submit" variant="primary">
          {editingUser ? "Update" : "Add"}
        </Button>
      </form>
      {error && <p className="text-red-600 dark:text-red-400 text-sm mb-4">{error}</p>}
    </>
  );
}

export default AddUserForm;