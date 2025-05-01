const express = require('express');
const {
  becomeInstructor,
  getProfile,
  getMyCourses,
  addToCart,
  removeFromCart,
  getCart
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const {
  markCourseComplete,
  getCompletedCourses
} = require('../controllers/userController');

const { checkoutCart } = require('../controllers/userController');

router.post('/cart/checkout', protect, checkoutCart);

router.post('/progress/complete', protect, markCourseComplete);
router.get('/progress/completed', protect, getCompletedCourses);

// Become instructor
router.post('/become-instructor', protect, becomeInstructor);

// Get user profile
router.get('/profile', protect, getProfile);

// Get instructor or student courses
router.get('/my-courses', protect, getMyCourses);

// Add course to cart
router.post('/cart/add', protect, addToCart);

// Remove course from cart
router.post('/cart/remove', protect, removeFromCart);

// Get all cart items
router.get('/cart', protect, getCart);

module.exports = router;
