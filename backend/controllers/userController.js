const User = require('../models/User');
const Course = require('../models/Course');

// Become instructor
exports.becomeInstructor = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = 'instructor';
    await user.save();

    res.json({ message: 'You are now an instructor!', role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get logged-in user profile
exports.getProfile = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
};

// Get user's created or enrolled courses
exports.getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('enrolledCourses');

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role === 'instructor') {
      const courses = await Course.find({ instructor: user.name });
      return res.json(courses);
    }

    res.json(user.enrolledCourses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add course to cart
exports.addToCart = async (req, res) => {
  const { courseId } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role !== 'student') return res.status(403).json({ message: 'Only students can use the cart' });

    const alreadyInCart = user.cart.includes(courseId);
    if (alreadyInCart) return res.status(400).json({ message: 'Course already in cart' });

    user.cart.push(courseId);
    await user.save();

    res.status(200).json({ message: 'Course added to cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove course from cart
exports.removeFromCart = async (req, res) => {
  const { courseId } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = user.cart.filter(id => id.toString() !== courseId);
    await user.save();

    res.status(200).json({ message: 'Course removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View cart
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark course as completed
exports.markCourseComplete = async (req, res) => {
  const { courseId } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Not enrolled in this course' });
    }

    if (user.completedCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Course already marked as completed' });
    }

    user.completedCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: 'Course marked as completed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View completed courses
exports.getCompletedCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('completedCourses');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.completedCourses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Checkout cart: enroll in all cart courses
exports.checkoutCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const newEnrollments = [];

    for (const courseId of user.cart) {
      const alreadyEnrolled = user.enrolledCourses.includes(courseId);
      if (!alreadyEnrolled) {
        user.enrolledCourses.push(courseId);
        newEnrollments.push(courseId);

        // Update course's enrolledStudents count
        const course = await Course.findById(courseId);
        if (course) {
          course.enrolledStudents += 1;
          await course.save();
        }
      }
    }

    user.cart = []; // clear cart
    await user.save();

    res.status(200).json({
      message: 'Checkout successful',
      enrolledCourses: newEnrollments
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
