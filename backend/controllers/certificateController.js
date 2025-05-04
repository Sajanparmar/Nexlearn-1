const PDFDocument = require('pdfkit');
const User = require('../models/User');
const Course = require('../models/Course');

exports.downloadCertificate = async (req, res) => {
  const { courseId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'User or Course not found' });
    }

    if (!user.completedCourses.includes(courseId)) {
      return res.status(403).json({ message: 'Course not completed' });
    }

    // Create PDF
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${course.title}_certificate.pdf`);

    doc.pipe(res);

    doc.fontSize(22).text('Certificate of Completion', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`This certifies that`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text(`${user.name}`, { align: 'center', underline: true });
    doc.moveDown();
    doc.fontSize(16).text(`has successfully completed the course`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text(`${course.title}`, { align: 'center', underline: true });
    doc.moveDown(2);
    doc.fontSize(14).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Instructor: ${course.instructor}`, { align: 'center' });

    doc.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
