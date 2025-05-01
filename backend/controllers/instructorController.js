const Course = require('../models/Course');
const User = require('../models/User');

// Get all courses created by the instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    if (req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const courses = await Course.find({ instructor: req.user.name });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get students enrolled in a specific course
exports.getEnrolledStudents = async (req, res) => {
  try {
    const courseId = req.params.id;

    if (req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const students = await User.find({
      enrolledCourses: courseId
    }).select('name email');

    res.json({
      courseId,
      totalEnrolled: students.length,
      students
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInstructorAnalytics = async (req, res) => {
  try {
    if (req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const courses = await Course.find({ instructor: req.user.name });

    const totalStudents = courses.reduce((sum, course) => sum + course.enrolledStudents, 0);
    const totalRevenue = courses.reduce((sum, course) => sum + (course.enrolledStudents * course.price), 0);

    const breakdown = courses.map(course => ({
      title: course.title,
      price: course.price,
      enrolled: course.enrolledStudents,
      revenue: course.enrolledStudents * course.price
    }));

    res.json({
      instructor: req.user.name,
      totalCourses: courses.length,
      totalStudents,
      totalRevenue,
      breakdown
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
console.log('Get instructor courses request received');
console.log('Get enrolled students request received');
console.log('Get instructor analytics request received');