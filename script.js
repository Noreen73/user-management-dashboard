// ===== Users Array =====
let users = JSON.parse(localStorage.getItem("users")) || [];
let editingId = null;

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

// ===== Render Users as Cards =====
function renderUsers(userList) {
  userTableBody.innerHTML = "";

  if (userList.length === 0) {
    userTableBody.innerHTML = `<p class="col-span-full text-center text-gray-400">No user found</p>`;
  } else {
    userList.map(user => {
      const card = document.createElement("div");
      card.className = "border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition";
      card.innerHTML = `
        <p class="font-semibold text-gray-800">${user.name}</p>
        <p class="text-sm text-gray-500">${user.email}</p>
        <p class="text-sm text-gray-500 mb-3">${user.course}</p>
        <div class="flex gap-2">
          <button onclick="editUser(${user.id})" class="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition">Edit</button>
          <button onclick="deleteUser(${user.id})" class="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
        </div>
      `;
      userTableBody.appendChild(card);
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
    users = users.map(user =>
      user.id === editingId ? { ...user, name, email, course } : user
    );
    editingId = null;
    formSubmitBtn.textContent = "Add";
  } else {
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
  statusMessage.className = "text-center text-gray-500 italic mb-4";

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
    statusMessage.className = "";
    applyFilters();

  } catch (error) {
    statusMessage.textContent = "Unable to load users.";
    statusMessage.className = "text-center text-red-600 bg-red-50 py-2 rounded mb-4";
    console.log(error);
  }
}

// ===== On Page Load =====
getUsersFromAPI();
