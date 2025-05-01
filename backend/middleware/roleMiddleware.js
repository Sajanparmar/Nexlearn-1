// middleware/roleMiddleware.js

exports.instructorOnly = (req, res, next) => {
    if (!req.user || req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Access denied. Instructors only.' });
    }
    next();
  };
  