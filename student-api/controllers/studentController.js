const Student = require("../models/Student");

// @desc    Create a new student
// @route   POST /api/students
const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Get all students (supports ?semester=, ?email=, ?active=true, ?minAge=, ?sort=name)
// @route   GET /api/students
const getAllStudents = async (req, res) => {
  try {
    const { semester, email, active, minAge, sort } = req.query;
    const filter = {};

    if (semester) filter.semester = Number(semester);
    if (email) filter.email = email.toLowerCase();
    if (active !== undefined) filter.isActive = active === "true";
    if (minAge) filter.age = { $gt: Number(minAge) };

    let query = Student.find(filter);

    if (sort === "name") {
      query = query.sort({ name: 1 });
    }

    const students = await query;
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Get a single student by ID
// @route   GET /api/students/:id
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Update a student (also used for updating skills)
// @route   PUT /api/students/:id
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Delete a student
// @route   DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};