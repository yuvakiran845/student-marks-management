# Student Internal Marks Management System

A premium, production-ready web application for managing student internal marks with role-based access control.

## Features

### Admin Features
- Secure login
- Add, edit, delete students
- Insert and manage MID-1, MID-2, and Internal marks
- Search students by name, roll number, or department
- View comprehensive dashboard with statistics

### Student Features
- Secure login
- View personal marks in a clean, card-based layout
- Read-only access to own data

## Tech Stack

### Frontend
- React 18 + Vite
- JavaScript (ES6+)
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Context API for state management

### Backend
- Node.js + Express.js
- MongoDB Atlas
- Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

## Project Structure

```
student-marks-management/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── context/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── backend/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    ├── server.js
    ├── .env
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5001
   ```

4. Seed the database with test users:
   ```bash
   node seed.js
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Test Login Credentials

After running the seed script, you can use these credentials to test the application:

### Admin Account
- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Role:** Administrator

### Student Account
- **Email:** `student@example.com`
- **Password:** `student123`
- **Role:** Student

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Students (Admin Only)
- `POST /api/students` - Add new student
- `GET /api/students` - Get all students (with search)
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Marks
- `GET /api/marks/:studentId` - Get marks for a student
- `POST /api/marks` - Insert/update marks (Admin only)
- `PUT /api/marks/:id` - Update marks (Admin only)
- `DELETE /api/marks/:id` - Delete marks (Admin only)

## Database Schema

### User
- email (String, unique)
- password (String, hashed)
- role (String: 'admin' or 'student')
- studentId (ObjectId, ref to Student)

### Student
- name (String)
- rollNumber (String, unique)
- department (String)
- email (String, unique)

### Marks
- studentId (ObjectId, ref to Student, unique)
- mid1 (Number, 0-100)
- mid2 (Number, 0-100)
- internal (Number, 0-100)

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Protected routes
- CORS enabled
- Input validation

## UI/UX Features

- Modern glassmorphism login page
- Responsive design for all devices
- Clean, professional dashboard layouts
- Smooth animations and transitions
- Toast notifications for user feedback
- Loading states and error handling

## Deployment

### Backend Deployment
- Deploy to services like Heroku, Railway, or Vercel
- Ensure environment variables are set
- Use production MongoDB URI

### Frontend Deployment
- Build the project: `npm run build`
- Deploy to Netlify, Vercel, or any static hosting service
- Update API base URL in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.