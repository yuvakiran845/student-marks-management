require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const marksRoutes = require('./routes/marks');

const app = express();
const PORT = process.env.PORT || 5002;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/marks', marksRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Student Marks Management API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});