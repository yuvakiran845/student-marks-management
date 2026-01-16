const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    unique: true,
  },
  mid1: {
    type: Number,
    min: 0,
    max: 100,
  },
  mid2: {
    type: Number,
    min: 0,
    max: 100,
  },
  internal: {
    type: Number,
    min: 0,
    max: 100,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Marks', marksSchema);