const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student',
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  cart: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Course'
  }],completedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]  
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);