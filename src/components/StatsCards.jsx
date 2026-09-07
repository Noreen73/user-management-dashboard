function StatsCards({ total }) {
  return (
    <div className="mb-4">
      <div className="inline-flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 rounded-lg px-4 py-3">
        <span className="text-xl">👥</span>
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-400">Total Users</p>
          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{total}</p>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;