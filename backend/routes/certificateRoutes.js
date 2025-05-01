const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { downloadCertificate } = require('../controllers/certificateController');

const router = express.Router();

router.get('/:courseId', protect, downloadCertificate);

module.exports = router;
