const multer = require('multer');
const path = require('path');

// Store in memory for Cloudinary upload
const storage = multer.memoryStorage();

// ── Image filter (for project thumbnails) ─────────────────────────────────
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'), false);
  }
};

// ── PDF filter (for resume uploads) ──────────────────────────────────────
const pdfFileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase() === '.pdf';
  const mimetype = file.mimetype === 'application/pdf';
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed for resume upload'), false);
  }
};

// Image uploader — 5 MB limit
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: imageFileFilter,
});

// PDF uploader — 10 MB limit
const uploadPDF = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: pdfFileFilter,
});

module.exports = { upload, uploadPDF };