const mongoose = require('mongoose');

// Only one document ever exists — always upserted
const resumeSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String, // Cloudinary public_id for future deletion
      default: '',
    },
    fileName: {
      type: String,
      default: 'resume.pdf',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);
