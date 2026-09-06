// ===== Users Array =====
let users = JSON.parse(localStorage.getItem("users")) || [];
let editingId = null; // agar kisi user ko edit kar rahe hain to uski id yahan store hogi

// ===== DOM Elements =====
const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const courseInput = document.getElementById("courseInput");
const searchInput = document.getElementById("searchInput");
const courseFilter = document.getElementById("courseFilter");
const userTableBody = document.getElementById("userTableBody");
const userCount = document.getElementById("userCount");
const statusMessage = document.getElementById("statusMessage");
const formSubmitBtn = document.getElementById("formSubmitBtn");
const formError = document.getElementById("formError");

// ===== Save to Local Storage =====
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// ===== Render Users on Screen =====
function renderUsers(userList) {
  userTableBody.innerHTML = "";

  if (userList.length === 0) {
    userTableBody.innerHTML = `<tr><td colspan="4">No user found</td></tr>`;
  } else {
    userList.map(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.course}</td>
        <td>
          <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
          <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
        </td>
      `;
      userTableBody.appendChild(row);
    });
  }

  userCount.textContent = users.length;
}

// ===== Apply Search + Filter together =====
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCourse = courseFilter.value;

  let filtered = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm)
  );

  if (selectedCourse !== "All") {
    filtered = filtered.filter(user => user.course === selectedCourse);
  }

  renderUsers(filtered);
}

// ===== Form Validation =====
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== Add / Update User =====
userForm.addEventListener("submit", function (e) {
  e.preventDefault();
  formError.textContent = "";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const course = courseInput.value.trim();

  if (!name || !email || !course) {
    formError.textContent = "Please fill all fields.";
    return;
  }

  if (!isValidEmail(email)) {
    formError.textContent = "Please enter a valid email.";
    return;
  }

  if (editingId) {
    // Update existing user
    users = users.map(user =>
      user.id === editingId ? { ...user, name, email, course } : user
    );
    editingId = null;
    formSubmitBtn.textContent = "Add";
  } else {
    // Add new user
    const newUser = { id: Date.now(), name, email, course };
    users.push(newUser);
  }

  saveUsers();
  applyFilters();
  userForm.reset();
});

// ===== Edit User =====
function editUser(id) {
  const user = users.find(u => u.id === id);
  if (!user) return;

  nameInput.value = user.name;
  emailInput.value = user.email;
  courseInput.value = user.course;

  editingId = id;
  formSubmitBtn.textContent = "Update";
}

// ===== Delete User =====
function deleteUser(id) {
  users = users.filter(user => user.id !== id);
  saveUsers();
  applyFilters();
}

// ===== Search + Filter Events =====
searchInput.addEventListener("input", applyFilters);
courseFilter.addEventListener("change", applyFilters);

// ===== Fetch Users from API (only if no local data yet) =====
async function getUsersFromAPI() {
  statusMessage.textContent = "Loading users...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    if (users.length === 0) {
      users = data.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        course: "MERN"
      }));
      saveUsers();
    }

    statusMessage.textContent = "";
    applyFilters();

  } catch (error) {
    statusMessage.textContent = "Unable to load users.";
    console.log(error);
  }
}

// ===== On Page Load =====
getUsersFromAPI();
