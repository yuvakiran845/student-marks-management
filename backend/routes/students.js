const express = require('express');
const Student = require('../models/Student');
const User = require('../models/User');
const Marks = require('../models/Marks');
const { auth, adminOnly } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Add student (admin only)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const { name, rollNumber, department, email, password } = req.body;

    const student = new Student({ name, rollNumber, department, email });
    await student.save();

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ email, password: hashedPassword, role: 'student', studentId: student._id });
    await user.save();

    res.status(201).send(student);
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).send({ error: 'Roll number or email already exists' });
    } else {
      res.status(500).send({ error: 'Server error' });
    }
  }
});

// Get all students (admin only)
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { rollNumber: { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const students = await Student.find(query).populate('marks');
    res.send(students);
  } catch (e) {
    res.status(500).send({ error: 'Server error' });
  }
});

// Get student by ID (admin or own student)
router.get('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }

    if (req.user.role !== 'admin' && req.user.studentId.toString() !== req.params.id) {
      return res.status(403).send({ error: 'Access denied' });
    }

    res.send(student);
  } catch (e) {
    res.status(500).send({ error: 'Server error' });
  }
});

// Update student (admin only)
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }
    res.send(student);
  } catch (e) {
    res.status(500).send({ error: 'Server error' });
  }
});

// Delete student (admin only)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }

    // Delete associated user and marks
    await User.findOneAndDelete({ studentId: req.params.id });
    await Marks.findOneAndDelete({ studentId: req.params.id });

    res.send(student);
  } catch (e) {
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;