const https = require('https');
const Resume = require('../models/Resume');
const { uploadRawToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');


// @desc    Get current resume info (URL)
// @route   GET /api/resume
// @access  Public
exports.getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({});
    if (!resume) {
      return res.status(404).json({ success: false, message: 'No resume uploaded yet.' });
    }
    res.json({ success: true, url: resume.url, fileName: resume.fileName, updatedAt: resume.updatedAt });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload / replace resume (admin only)
// @route   POST /api/resume
// @access  Private/Admin
exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error('No PDF file provided.');
      err.statusCode = 400;
      return next(err);
    }

    // Upload to Cloudinary — overwrites the same public_id each time
    let result;
    try {
      result = await uploadRawToCloudinary(req.file.buffer, 'portfolio-resume', 'mohit_resume');
    } catch (uploadErr) {
      console.error('[uploadResume] Cloudinary upload failed:', uploadErr.message || uploadErr);
      const err = new Error(`Resume upload failed: ${uploadErr.message || 'Cloudinary error'}`);
      err.statusCode = 500;
      return next(err);
    }

    // Upsert — always keep only one resume document
    const resume = await Resume.findOneAndUpdate(
      {},
      {
        url: result.secure_url,
        publicId: result.public_id,
        fileName: req.file.originalname || 'resume.pdf',
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: 'Resume uploaded successfully.',
      url: resume.url,
      fileName: resume.fileName,
      updatedAt: resume.updatedAt,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete resume (admin only)
// @route   DELETE /api/resume
// @access  Private/Admin
exports.deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({});
    if (!resume) {
      return res.status(404).json({ success: false, message: 'No resume found.' });
    }

    // Remove from Cloudinary
    if (resume.publicId) {
      await deleteFromCloudinary(resume.publicId, 'raw');
    }

    await Resume.deleteOne({});
    res.json({ success: true, message: 'Resume deleted.' });
  } catch (error) {
    next(error);
  }
};

// @desc    Proxy-download resume as PDF (forces browser download)
// @route   GET /api/resume/download
// @access  Public
exports.downloadResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({});
    if (!resume) {
      return res.status(404).json({ success: false, message: 'No resume uploaded yet.' });
    }

    const fileName = resume.fileName
      ? resume.fileName.replace(/[^a-zA-Z0-9._-]/g, '_') // sanitise filename
      : 'resume.pdf';

    // Set headers before piping so the browser triggers a PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Cache-Control', 'no-cache');

    // Fetch from Cloudinary and pipe directly to the response
    https.get(resume.url, (cloudinaryStream) => {
      if (cloudinaryStream.statusCode !== 200) {
        return next(new Error(`Failed to fetch resume from Cloudinary (status ${cloudinaryStream.statusCode})`));
      }
      cloudinaryStream.pipe(res);
    }).on('error', (err) => {
      next(err);
    });
  } catch (error) {
    next(error);
  }
};

