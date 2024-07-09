const Student = require('../models/student.model');

// Create a new student
const createStudent = async () => {
  try {
    const newStudent = new Student({
      id: 21,
      studentName: "New Student",
      bookId: 121,
      age: 24,
      gender: "Male"
    });
    await newStudent.save();
    console.log('Student created successfully');
  } catch (error) {
    console.error('Error creating student:', error);
  }
};

module.exports = {createStudent}
