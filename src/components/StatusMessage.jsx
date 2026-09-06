function StatusMessage({ loading, error }) {
  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-400 italic mb-4">Loading users...</p>;
  }
  if (error) {
    return <p className="text-center text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 py-2 rounded mb-4">Unable to load users.</p>;
  }
  return null;
}

export default StatusMessage;