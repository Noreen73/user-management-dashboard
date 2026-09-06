import DarkModeToggle from "./DarkModeToggle";

function Header({ darkMode, onToggleDarkMode }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
          U
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          User Management Dashboard
        </h1>
      </div>
      <DarkModeToggle darkMode={darkMode} onToggle={onToggleDarkMode} />
    </div>
  );
}

export default Header;