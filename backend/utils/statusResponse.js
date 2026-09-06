// Reusable function that builds the status response object
function getStatusResponse() {
  return {
    status: "ok",
    message: "Backend is running successfully",
    timestamp: new Date().toISOString(),
  };
}

module.exports = { getStatusResponse };