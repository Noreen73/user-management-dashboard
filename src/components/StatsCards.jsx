function StatsCards({ total, apiCount, localCount }) {
  const cards = [
    { label: "Total Users", value: total, icon: "👥", color: "text-indigo-600 dark:text-indigo-400" },
    { label: "API Users", value: apiCount, icon: "🌐", color: "text-blue-500 dark:text-blue-400" },
    { label: "Local Users", value: localCount, icon: "📱", color: "text-purple-600 dark:text-purple-400" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 rounded-lg px-4 py-3"
        >
          <span className="text-xl">{card.icon}</span>
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-400">{card.label}</p>
            <p className={`text-lg font-bold ${card.color}`}>{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;