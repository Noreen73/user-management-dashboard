// Catches any error passed via next(err) and sends a clean JSON response
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong on the server",
  });
}

module.exports = errorHandler;