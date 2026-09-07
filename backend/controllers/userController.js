// Temporary in-memory data (will be replaced by MongoDB later)
let users = [
  { id: 1, name: "Ayesha Khan", email: "ayesha@example.com", course: "MERN" },
  { id: 2, name: "Bilal Ahmed", email: "bilal@example.com", course: "React" },
  { id: 3, name: "Sara Malik", email: "sara@example.com", course: "Node.js" },
];
let nextId = 4;

// GET /api/users  (supports ?search=)
function getAllUsers(req, res) {
  const { search } = req.query;
  let result = users;

  if (search) {
    result = users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.status(200).json({ success: true, data: result });
}

// GET /api/users/:id
function getUserById(req, res) {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, data: user });
}

// POST /api/users
function createUser(req, res) {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({
      success: false,
      message: "Name, email and course are all required",
    });
  }

  const newUser = { id: nextId++, name, email, course };
  users.push(newUser);

  res.status(201).json({ success: true, data: newUser });
}

// PUT /api/users/:id
function updateUser(req, res) {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({
      success: false,
      message: "Name, email and course are all required",
    });
  }

  user.name = name;
  user.email = email;
  user.course = course;

  res.status(200).json({ success: true, data: user });
}

// DELETE /api/users/:id
function deleteUser(req, res) {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  users.splice(index, 1);

  res.status(200).json({ success: true, message: "User deleted successfully" });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};