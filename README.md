# TaskBoard Project

TaskBoard is a task management system that enables users to create, view, update, and manage tasks with a priority calculation model. The project includes a React frontend (in TypeScript), Express.js backend, and MongoDB database, with caching and pagination support.

## Features

- **Task Creation**: Users can create tasks with a title and description.
- **Task Priority Calculation**: Priority is calculated based on description length, title length, and keywords.
- **Task Detail View**: Allows users to view and update tasks, with recalculated priority upon updates.
- **Pagination, Filtering, and Sorting**: Tasks can be paginated, filtered by priority, and sorted by date or priority.
- **Caching**: Implements caching to reduce database load and improve performance.

---

## Technologies

- **Frontend**: React (TypeScript), React Router, Redux Toolkit, Material UI, React Query
- **Backend**: Express.js, MongoDB, Mongoose, Node.js, Node-Cache
- **Other Libraries**: Axios, dotenv, Nodemon (for development)

---

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **MongoDB**: You can use MongoDB Atlas (cloud) or a local MongoDB instance.

### Installation

1. **Clone the repository**:
   git clone https://github.com/your-username/TaskBoard.git

2. **Backend Setup**:

   - Navigate to the backend directory:
     cd backend
   - Install dependencies:
     npm install
   - Create a `.env` file in the `backend` folder and add your MongoDB URI and server configuration:
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
   - Start the backend server:
     npm run dev

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     cd ../frontend
   - Install dependencies:
     npm install
   - Start the frontend development server (on port 3000):
     npm start

### Project Structure

TaskBoard/
├── backend/
│ ├── src/
│ │ ├── controllers/ # Controller logic
│ │ ├── models/ # MongoDB models
│ │ ├── routes/ # API routes
│ │ ├── services/ # Helper functions and calculations
│ │ ├── middleware/ # Middleware (e.g., error handling)
│ │ ├── utils/ # Utility functions
│ │ └── app.js # Entry point
│ ├── .env # Environment variables
│ ├── package.json # Backend dependencies and scripts
│ └── README.md
└── frontend/
├── src/
│ ├── components/ # Reusable components
│ ├── pages/ # Page components (Home, Create Task, Task Details)
│ ├── redux/ # Redux slices and store
│ ├── hooks/ # Custom hooks
│ └── App.tsx # Entry point
├── .env # Frontend environment variables
├── package.json # Frontend dependencies and scripts
└── README.md

---

## API Endpoints

### Base URL

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:5000/api`

### Endpoints

- **Create Task**: `POST /tasks`

  - **Body**: `{ "title": "string", "description": "string" }`
  - **Response**: Task object with calculated priority.

- **Get Task**: `GET /tasks/:id`

  - **Response**: Task object.

- **Update Task**: `PUT /tasks/:id`

  - **Body**: `{ "title": "string", "description": "string" }`
  - **Response**: Updated task object with recalculated priority.

- **Get Tasks**: `GET /tasks`
  - **Query Parameters**:
    - `page`: Page number (default: 1)
    - `limit`: Number of tasks per page (default: 10)
    - `priority`: Filter by priority level
    - `title`: Filter by title keyword
    - `sortBy`: Field to sort by (`createdAt`, `priority`)
    - `order`: Sort order (`asc` or `desc`)
  - **Response**: Paginated list of tasks with metadata.

---

## Frontend Usage

1. **Homepage**:

   - Displays all tasks with pagination, filtering, and sorting options.
   - Search for specific tasks by title or filter by priority.

2. **Create Task Page**:

   - Allows users to create a new task by entering a title and description.
   - Displays success notification with the new task’s ID upon creation.

3. **Task Detail View**:
   - Shows detailed information for a selected task, including the title, description, and calculated priority.
   - Allows users to update the task’s title and description, recalculating priority based on the updated description.

---

## Backend Priority Calculation

The priority of a task is calculated based on the following criteria:

- **Description Length**:
  - `< 10 characters`: +1
  - `10-20 characters`: +2
  - `> 20 characters`: +3
- **Title Length**:
  - `< 5 characters`: +0.5
  - `5-15 characters`: +1
  - `> 15 characters`: +1.5
- **Keyword Presence**:
  - **"urgent"**: +2
  - **"important"**: +1.5
  - **"low-priority"**: -1

The calculated score is then normalized to a range of 0 to 1, providing a priority value for each task.
