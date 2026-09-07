// Logs every incoming request's method and URL to the terminal
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // pass control to the next middleware/route
}

module.exports = logger;