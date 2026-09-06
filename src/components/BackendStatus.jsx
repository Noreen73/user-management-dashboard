import { useState, useEffect } from "react";

function BackendStatus() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch("http://localhost:5000/api/status");
        const data = await response.json();
        setStatus(data);
        setError(false);
      } catch (err) {
        setError(true);
        console.log(err);
      }
    }

    checkBackend();
  }, []);

  if (error) {
    return (
      <p className="text-center text-sm text-red-500 dark:text-red-400 mb-4">
        ⚠️ Backend server is currently unavailable.
      </p>
    );
  }

  if (!status) {
    return (
      <p className="text-center text-sm text-gray-400 mb-4">
        Checking backend connection...
      </p>
    );
  }

  return (
    <p className="text-center text-sm text-green-600 dark:text-green-400 mb-4">
      ✅ {status.message} (as of {new Date(status.timestamp).toLocaleTimeString()})
    </p>
  );
}

export default BackendStatus;