# User Management Dashboard

A full-stack user management application built progressively across multiple assignments — starting from vanilla JavaScript, moving through Tailwind CSS and React, and finishing with a Node.js/Express/MongoDB backend. Also includes a separate Student Management API built with MongoDB Atlas and Mongoose.

## Live Progress / Assignments Covered

1. **Vanilla JavaScript** — Add/Display/Search/Delete users, LocalStorage persistence, JSONPlaceholder API integration
2. **Tailwind CSS** — Restyled the UI with Tailwind utility classes
3. **React (Vite)** — Converted to a component-based React app with dark mode, delete confirmation, and a custom purple/indigo theme
4. **Node.js Backend** — Initially built with plain `http`, then upgraded to Express.js
5. **Express.js Backend** — Full REST API with validation, error handling, and logging middleware
6. **Frontend + Backend Integration** — React app connected to the Express API (GET/POST/PUT/DELETE), Toast notifications for success/error states
7. **Postman API Testing** — All endpoints tested, documented in a full test report (see `Postman_API_Testing_Report.docx`)
8. **MongoDB Student Management API** — A separate REST API (`student-api/`) using MongoDB Atlas and Mongoose — see its own README for details

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** In-memory (dashboard backend) / MongoDB Atlas + Mongoose (`student-api`)
- **Testing:** Postman
- **Tools:** Notepad++, Command Prompt, Git/GitHub

## Project Structure
user-management-dashboard/
├── src/ # React frontend
│ ├── components/ # Header, UserTable, AddUserForm, SearchBar, etc.
│ └── App.jsx # Main app, connects to Express API
├── backend/ # Express.js backend (Users API)
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ └── server.js
├── student-api/ # MongoDB Student Management API (separate project)
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── public/
├── index.html
└── package.json

## Users API (backend/)

REST API for managing users, with in-memory data storage.

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/status | API health check |
| GET | /api/users | Get all users (supports `?search=` and `?course=`) |
| GET | /api/users/:id | Get a user by ID |
| POST | /api/users | Create a new user |
| PUT | /api/users/:id | Update a user |
| DELETE | /api/users/:id | Delete a user |

## Student Management API (student-api/)

A separate REST API using MongoDB Atlas and Mongoose. See [`student-api/README.md`](./student-api/README.md) for full details on schema, endpoints, and setup.

## Running the Project Locally

**Frontend:**
cd user-management-dashboard
npm install
npm run dev

Runs at `http://localhost:5173`

**Users Backend (Express):**

cd user-management-dashboard/backend
npm install
npm run dev

Runs at `http://localhost:5000`

**Student API (MongoDB):**

cd user-management-dashboard/student-api
npm install
npm run dev
Runs at `http://localhost:5001` (requires a `.env` file with your own MongoDB connection string)

All three can run simultaneously in separate terminal windows.

## Testing

- Users API fully tested in Postman — see `Postman_API_Testing_Report.docx` for the complete test report, including status code coverage (200, 201, 400, 404) and screenshots.
- Student API fully tested in Postman — CRUD operations, query filters (semester, email, active status, age), sorting, and error handling (400, 404).

## Notes

- `.env` files are excluded from version control via `.gitignore` and must be created locally to run the backends.
- The Users API uses in-memory storage, so data resets whenever the backend server restarts.
- The Student API uses MongoDB Atlas (cloud database), so data persists across restarts.