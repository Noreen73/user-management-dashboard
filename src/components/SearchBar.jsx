function SearchBar({ searchTerm, onSearchChange, courseFilter, onCourseFilterChange }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      <input
        type="text"
        placeholder="Search User..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full md:w-72 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={courseFilter}
        onChange={(e) => onCourseFilterChange(e.target.value)}
        className="w-full md:w-48 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="All">All</option>
        <option value="MERN">MERN</option>
        <option value="React">React</option>
        <option value="Node.js">Node.js</option>
        <option value="C++">C++</option>
      </select>
    </div>
  );
}

export default SearchBar;