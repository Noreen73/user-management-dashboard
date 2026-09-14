# Student Management API

A REST API built with Node.js, Express.js, and MongoDB (Mongoose) to manage student records. Built as part of a MERN Stack backend learning assignment.

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas (cloud database)
- Mongoose (ODM)
- dotenv (environment variables)
- cors

## Project Structure
student-api/
├── controllers/
│ └── studentController.js # CRUD logic
├── models/
│ └── Student.js # Mongoose schema
├── routes/
│ └── studentRoutes.js # API routes
├── server.js # App entry point, MongoDB connection
├── .env # MongoDB connection string (not committed)
└── .gitignore

## Student Schema

| Field | Type | Notes |
|---|---|---|
| name | String | Required |
| email | String | Required, unique, validated format |
| age | Number | Required, minimum 1 |
| semester | Number | Required |
| department | String | Required |
| skills | [String] | Optional array, default empty |
| isActive | Boolean | Default true |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/students | Create a new student |
| GET | /api/students | Get all students |
| GET | /api/students/:id | Get a student by ID |
| PUT | /api/students/:id | Update a student |
| DELETE | /api/students/:id | Delete a student |

## Query Parameters (on GET /api/students)

| Param | Example | Description |
|---|---|---|
| semester | ?semester=4 | Filter by semester |
| email | ?email=ali@example.com | Find by exact email |
| active | ?active=true | Filter by active status |
| minAge | ?minAge=20 | Students with age greater than value |
| sort | ?sort=name | Sort results alphabetically by name |

## Setup & Running Locally

1. Clone the repository and navigate to the `student-api` folder.
2. Install dependencies:
npm install

3. Create a `.env` file in the `student-api` folder with:

PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string

4. Start the server:

npm run dev

5. Server runs at `http://localhost:5001`

## Validation & Error Handling

- `name`, `email`, `age`, `semester`, `department` are required fields.
- `email` must be a valid format and unique across students.
- Invalid or non-existing student IDs return `404 Not Found`.
- Validation failures (missing fields, duplicate email) return `400 Bad Request`.
- Unexpected server/database errors return `500 Internal Server Error`.

## Testing

All endpoints were tested using Postman, covering:
- Creating students (valid and invalid data)
- Fetching all students and filtering by semester, email, active status, and age
- Sorting students by name
- Updating student info and skills
- Deleting students, including already-deleted IDs
- Error cases: missing fields, duplicate email, invalid IDs
