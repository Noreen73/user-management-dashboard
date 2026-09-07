function Toast({ toast }) {
  if (!toast) return null;

  const styles =
    toast.type === "success"
      ? "bg-green-600"
      : "bg-red-600";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`${styles} text-white px-4 py-3 rounded-lg shadow-lg text-sm`}>
        {toast.message}
      </div>
    </div>
  );
}

export default Toast;