const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');
const { getAllUsers, getAllCourses } = require('../controllers/adminController');
const { updateUserRole } = require('../controllers/adminController');
const { deleteUser, deleteCourse } = require('../controllers/adminController');
const { getPlatformStats } = require('../controllers/adminController');
const { getTopStudents, getTopCourses } = require('../controllers/adminController');

const router = express.Router();

// Admin-only routes
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/courses', protect, adminOnly, getAllCourses);
router.put('/user/role', protect, adminOnly, updateUserRole);
router.delete('/user/:id', protect, adminOnly, deleteUser);
router.delete('/course/:id', protect, adminOnly, deleteCourse);
router.get('/stats', protect, adminOnly, getPlatformStats);
router.get('/top-students', protect, adminOnly, getTopStudents);
router.get('/top-courses', protect, adminOnly, getTopCourses);

module.exports = router;