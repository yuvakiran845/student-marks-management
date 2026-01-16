const express = require('express');
const Marks = require('../models/Marks');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Get marks for a student
router.get('/:studentId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.studentId.toString() !== req.params.studentId) {
      return res.status(403).send({ error: 'Access denied' });
    }

    const marks = await Marks.findOne({ studentId: req.params.studentId });
    if (!marks) {
      return res.status(404).send({ error: 'Marks not found' });
    }
    res.send(marks);
  } catch (e) {
    res.status(500).send({ error: 'Server error' });
  }
});

// Insert or update marks (admin only)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const { studentId, mid1, mid2, internal } = req.body;

    let marks = await Marks.findOne({ studentId });
    if (marks) {
      marks.mid1 = mid1 !== undefined ? mid1 : marks.mid1;
      marks.mid2 = mid2 !== undefined ? mid2 : marks.mid2;
      marks.internal = internal !== undefined ? internal : marks.internal;
      await marks.save();
    } else {
      marks = new Marks({ studentId, mid1, mid2, internal });
      await marks.save();
    }

    res.send(marks);
  } catch (e) {
    res.status(500).send({ error: 'Server error' });
  }
});

// Update marks by ID (admin only)
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const marks = await Marks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!marks) {
      return res.status(404).send({ error: 'Marks not found' });
    }
    res.send(marks);
  } catch (e) {
    res.status(500).send({ error: 'Server error' });
  }
});

// Delete marks (admin only)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const marks = await Marks.findByIdAndDelete(req.params.id);
    if (!marks) {
      return res.status(404).send({ error: 'Marks not found' });
    }
    res.send(marks);
  } catch (e) {
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;