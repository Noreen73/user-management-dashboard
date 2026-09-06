function Button({ children, onClick, type = "button", variant = "primary", className = "" }) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white",
    edit: "bg-blue-500 hover:bg-blue-600 text-white",
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