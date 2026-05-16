# Student Management System

A full-stack web application for managing student records built with Node.js, Express, MongoDB, and React.

## Project Structure

```
student-management-system/
│
├── frontend/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   ├── StudentList.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AddStudent.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│
├── backend/                  # Node.js Backend
│   ├── config/
│   │   ├── db.js
│   │
│   ├── controllers/
│   │   ├── studentController.js
│   │
│   ├── models/
│   │   ├── Student.js
│   │
│   ├── routes/
│   │   ├── studentRoutes.js
│   │
│   ├── server.js
│   ├── .env
│   ├── package.json
│
├── README.md
```

## Features

- **Add Students**: Add new student records with details (name, email, phone, course, year)
- **View Students**: Display all students in a table format
- **Delete Students**: Remove student records from the system
- **Responsive Design**: Mobile-friendly interface

## Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-management
NODE_ENV=development
```

4. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### API Endpoints

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/health` - Health check

## Frontend Setup

### Prerequisites
- Node.js (v14 or higher)

### Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Install additional dependencies:
```bash
npm install react-router-dom axios
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-management
NODE_ENV=development
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` in your browser to access the application.

## Technologies Used

### Frontend
- React 18+
- Vite (Build tool)
- React Router DOM
- Axios (HTTP client)
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)
- Dotenv (Environment configuration)
- CORS (Cross-Origin Resource Sharing)

## Project Features

### Frontend Components
1. **Navbar**: Navigation bar with links to Home and Add Student pages
2. **StudentList**: Displays all students in a table with delete functionality
3. **StudentForm**: Form to add new students
4. **Home Page**: Main page showing all students
5. **AddStudent Page**: Dedicated page for adding new students

### Backend Architecture
- **Controllers**: Business logic for student operations
- **Models**: MongoDB schema for student data
- **Routes**: API endpoints for CRUD operations
- **Config**: Database connection configuration
- **Middleware**: CORS, JSON parsing, error handling

## Student Data Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  course: String (required),
  year: Number (required, 1-4),
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The application includes comprehensive error handling:
- Input validation
- Database error handling
- HTTP error responses
- Client-side error messages

## Future Enhancements

- User authentication and authorization
- Edit student functionality
- Search and filter students
- Export student data to CSV/PDF
- Student dashboard with statistics
- Advanced search and sorting

## License

This project is open source and available under the MIT License.

## Author

Student Management System - Educational Project

## Support

For support, please create an issue in the repository.
