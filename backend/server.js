const http = require("http");
require("dotenv").config();
const { getStatusResponse } = require("./utils/statusResponse");

const PORT = process.env.PORT || 5000;

// Small helper to allow the React app (running on a different port) to call this server
function setCORSHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// Example async operation (bonus: experimenting with async/await)
function simulateAsyncTask() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Async task completed"), 200);
  });
}

const server = http.createServer(async (req, res) => {
  setCORSHeaders(res);

  // Handle preflight requests from the browser
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Backend is running. Try /api/status");
    return;
  }

  if (req.method === "GET" && req.url === "/api/status") {
    const data = getStatusResponse();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
    return;
  }

  // Bonus: another JSON test endpoint using async/await
  if (req.method === "GET" && req.url === "/api/message") {
    const asyncResult = await simulateAsyncTask();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Hello from the Node.js backend!",
        asyncResult,
      })
    );
    return;
  }

  // Basic POST example (required: understand GET and POST)
  if (req.method === "POST" && req.url === "/api/echo") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ youSent: body }));
    });
    return;
  }

  // Fallback for unknown routes
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});