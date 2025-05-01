const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, price } = req.body;

    const course = new Course({
      title,
      price,
      instructor: req.user.name  // you get this from JWT middleware
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Enroll a student in a course
exports.enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can enroll in courses' });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: 'Invalid course ID format' });
      }
      const objectIdCourseId = new mongoose.Types.ObjectId(courseId);      

    // Check if already enrolled
    const isAlreadyEnrolled = user.enrolledCourses.some(enrolledId =>
      enrolledId.toString() === objectIdCourseId.toString()
    );

    if (isAlreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(objectIdCourseId);
    await user.save();

    const course = await Course.findById(courseId);
    if (course) {
      course.enrolledStudents += 1;
      await course.save();
    }

    res.status(200).json({ message: 'Enrolled successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Add a review to a course
exports.addReview = async (req, res) => {
    const { rating, comment } = req.body;
  
    try {
      const course = await Course.findById(req.params.id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
  
      const alreadyReviewed = course.reviews.find(
        r => r.student.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Course already reviewed' });
      }
  
      const review = {
        student: req.user._id,
        rating: Number(rating),
        comment
      };
  
      course.reviews.push(review);
      await course.save();
  
      res.status(201).json({ message: 'Review added' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
