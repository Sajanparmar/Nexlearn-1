const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getInstructorCourses,
  getEnrolledStudents,
  getInstructorAnalytics
} = require('../controllers/instructorController');

const router = express.Router();

router.get('/courses', protect, getInstructorCourses);
router.get('/course/:id/students', protect, getEnrolledStudents);
router.get('/analytics', protect, getInstructorAnalytics);

module.exports = router;
