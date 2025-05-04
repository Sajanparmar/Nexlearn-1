const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  enrollInCourse
} = require('../controllers/courseController');
const { addReview } = require('../controllers/courseController');

const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected routes
router.post('/', protect, createCourse);
router.post('/:id/enroll', protect, enrollInCourse);
router.post('/:id/reviews', protect, addReview);

module.exports = router;