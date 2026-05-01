const express = require('express');
const router = express.Router();
const { getResume, uploadResume, deleteResume, downloadResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');
const { uploadPDF } = require('../middleware/uploadMiddleware');

// Public — anyone can fetch resume metadata (URL, filename, updatedAt)
router.get('/', getResume);

// Public — forces browser to download the PDF via backend proxy
router.get('/download', downloadResume);

// Admin only — upload new resume (replaces the existing one)
router.post('/', protect, uploadPDF.single('resume'), uploadResume);

// Admin only — delete resume
router.delete('/', protect, deleteResume);

module.exports = router;
