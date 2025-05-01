const User = require('../models/User');
const Course = require('../models/Course');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user role (admin/instructor/student)
exports.updateUserRole = async (req, res) => {
    const { userId, role } = req.body;
  
    if (!['admin', 'instructor', 'student'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.role = role;
      await user.save();
  
      res.json({ message: `User role updated to ${role}` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Delete user
exports.deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};
  
// Delete course
exports.deleteCourse = async (req, res) => {
    try {
      await Course.findByIdAndDelete(req.params.id);
      res.json({ message: 'Course deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

exports.getPlatformStats = async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalCourses = await Course.countDocuments();
      const totalInstructors = await User.countDocuments({ role: 'instructor' });
  
      const allCourses = await Course.find();
      const totalEnrollments = allCourses.reduce((sum, course) => sum + course.enrolledStudents, 0);
      const totalRevenue = allCourses.reduce((sum, course) => sum + (course.enrolledStudents * course.price), 0);
  
      res.json({
        totalUsers,
        totalInstructors,
        totalCourses,
        totalEnrollments,
        totalRevenue
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

exports.getTopStudents = async (req, res) => {
    try {
      const students = await User.find({ role: 'student' })
        .sort({ enrolledCourses: -1 }) // sort by number of courses (array length)
        .limit(5)
        .select('name email enrolledCourses');
  
      const result = students.map(student => ({
        name: student.name,
        email: student.email,
        enrolledCount: student.enrolledCourses.length
      }));
  
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

exports.getTopCourses = async (req, res) => {
    try {
      const courses = await Course.find()
        .sort({ enrolledStudents: -1 })
        .limit(5)
        .select('title instructor enrolledStudents');
  
      res.json(courses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};
  
  
  
  