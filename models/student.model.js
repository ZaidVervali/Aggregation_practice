const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  studentName: {
    type: String,
    required: true
  },
  bookId: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'] // Ensures only 'Male' or 'Female' can be used
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
