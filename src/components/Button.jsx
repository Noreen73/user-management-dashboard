function Button({ children, onClick, type = "button", variant = "primary", className = "" }) {
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-sm",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white",
    edit: "bg-indigo-500 hover:bg-indigo-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition text-sm ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;