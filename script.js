// Grab references to HTML elements
const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const courseInput = document.getElementById("courseInput");
const searchInput = document.getElementById("searchInput");
const usersTableBody = document.getElementById("usersTableBody");
const totalUsersEl = document.getElementById("totalUsers");
const statusMessage = document.getElementById("statusMessage");

// This array will hold all users
let users = [];

// Track if we are currently editing a user (for the Edit bonus feature)
let editingUserId = null;

// ---------- Local Storage ----------

// Load users from Local Storage when the page opens
function loadUsers() {
  const savedUsers = localStorage.getItem("users");
  if (savedUsers) {
    users = JSON.parse(savedUsers);
  }
}

// Save users to Local Storage
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// ---------- Display ----------

// Render (display) users in the table
function displayUsers(userList = users) {
  usersTableBody.innerHTML = "";

  if (userList.length === 0) {
    const message = users.length === 0 ? "No users yet. Add one above!" : "No matching users found.";
    usersTableBody.innerHTML = `<tr><td colspan="4">${message}</td></tr>`;
  } else {
    userList.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.course}</td>
        <td>
          <button class="edit-btn" data-id="${user.id}">Edit</button>
          <button class="delete-btn" data-id="${user.id}">Delete</button>
        </td>
      `;
      usersTableBody.appendChild(row);
    });
  }

  updateTotalUsers();
}

// Update the "Total Users" counter
function updateTotalUsers() {
  totalUsersEl.textContent = `Total Users: ${users.length}`;
}

// ---------- Add / Update User (Form Submit) ----------

userForm.addEventListener("submit", function (e) {
  e.preventDefault(); // page reload rokta hai

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const course = courseInput.value.trim();

  // Empty fields check
  if (!name || !email || !course) {
    statusMessage.textContent = "Please fill all fields.";
    return;
  }

  // Email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    statusMessage.textContent = "Please enter a valid email address.";
    return;
  }

  statusMessage.textContent = "";

  if (editingUserId) {
    // Update existing user
    users = users.map(user =>
      user.id === editingUserId ? { ...user, name, email, course } : user
    );
    editingUserId = null;
    userForm.querySelector("button").textContent = "Add User";
  } else {
    // Add new user
    const newUser = {
      id: Date.now(), // unique ID banane ka simple tareeqa
      name,
      email,
      course
    };
    users.push(newUser);
  }

  saveUsers();
  displayUsers();
  userForm.reset();
});

// ---------- Edit & Delete (event delegation on the table body) ----------

usersTableBody.addEventListener("click", function (e) {
  // Delete button clicked
  if (e.target.classList.contains("delete-btn")) {
    const userId = Number(e.target.getAttribute("data-id"));
    users = users.filter(user => user.id !== userId);
    saveUsers();
    displayUsers();
  }

  // Edit button clicked
  if (e.target.classList.contains("edit-btn")) {
    const userId = Number(e.target.getAttribute("data-id"));
    const user = users.find(u => u.id === userId);

    nameInput.value = user.name;
    emailInput.value = user.email;
    courseInput.value = user.course;

    editingUserId = userId;
    userForm.querySelector("button").textContent = "Update User";
  }
});

// ---------- Search ----------

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm)
  );

  displayUsers(filteredUsers);
});

// ---------- Course Filter (bonus) ----------

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn => {
  btn.addEventListener("click", function () {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const course = btn.getAttribute("data-course");

    if (course === "All") {
      displayUsers();
    } else {
      const filtered = users.filter(
        user => user.course.toLowerCase() === course.toLowerCase()
      );
      displayUsers(filtered);
    }
  });
});

// ---------- API Integration ----------

async function fetchApiUsers() {
  statusMessage.textContent = "Loading users...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const apiUsers = await response.json();

    // Convert API data into our format
    const formattedUsers = apiUsers.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      course: "N/A"
    }));

    // Add API users to our existing users array
    users = [...users, ...formattedUsers];

    saveUsers();
    displayUsers();

    statusMessage.textContent = "";
  } catch (error) {
    statusMessage.textContent = "Unable to load users.";
    console.log(error);
  }
}

// ---------- Init (runs when the page loads) ----------

function init() {
  loadUsers();       // localStorage se purana data laao
  displayUsers();     // table mein dikhao
  fetchApiUsers();    // API se naye users mangwao
}

init();