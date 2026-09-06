import DarkModeToggle from "./DarkModeToggle";

function Header({ totalUsers, darkMode, onToggleDarkMode }) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">User Management Dashboard</h1>
      <div className="flex items-center gap-4">
        <p className="text-gray-600 dark:text-gray-300">Total Users: <span className="font-semibold">{totalUsers}</span></p>
        <DarkModeToggle darkMode={darkMode} onToggle={onToggleDarkMode} />
      </div>
    </div>
  );
}

export default Header;