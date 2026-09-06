function CourseFilter({ courses, counts, selected, onSelect }) {
  return (
    <div className="mb-4">
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Filter by Course:</p>
      <div className="flex flex-wrap gap-2">
        {courses.map((course) => {
          const isActive = selected === course;
          return (
            <button
              key={course}
              onClick={() => onSelect(course)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {course}
              <span
                className={`text-xs rounded-full px-1.5 ${
                  isActive ? "bg-white/25" : "bg-white dark:bg-gray-800"
                }`}
              >
                {counts[course] || 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CourseFilter;