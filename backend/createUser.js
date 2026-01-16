require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/database');

const createTestUser = async () => {
  await connectDB();

  const hashedPassword = await bcrypt.hash('admin@123', 10);

  const user = new User({
    email: 'admin@gmail.com',
    password: hashedPassword,
    role: 'admin',
  });

  await user.save();
  console.log('Test admin user created');

  const studentUser = new User({
    email: 'student@gmail.com',
    password: await bcrypt.hash('student@123', 10),
    role: 'student',
    studentId: new mongoose.Types.ObjectId(), // dummy
  });

  await studentUser.save();
  console.log('Test student user created');

  process.exit();
};

createTestUser();