// Reusable validation middleware for POST and PUT /api/users requests
function validateUser(req, res, next) {
  let { name, email, course } = req.body;

  // Trim whitespace from all fields
  name = typeof name === "string" ? name.trim() : name;
  email = typeof email === "string" ? email.trim() : email;
  course = typeof course === "string" ? course.trim() : course;

  if (!name || !email || !course) {
    return res.status(400).json({
      success: false,
      message: "Name, email and course are all required",
    });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  // Put the cleaned values back on req.body so the controller uses trimmed data
  req.body.name = name;
  req.body.email = email;
  req.body.course = course;

  next();
}

module.exports = validateUser;