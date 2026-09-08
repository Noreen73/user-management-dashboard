// Catches any error passed via next(err) and sends a clean JSON response
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const isDev = process.env.NODE_ENV !== "production";

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong on the server",
    ...(isDev && { stack: err.stack }), // only included when NOT in production
  });
}

module.exports = errorHandler;