const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    detailedDescription: {
      type: String,
    },
    stack: [String],
    githubUrl: String,
    demoUrl: String,
    image: {
      type: String, // Cloudinary URL
      default: '',
    },
    category: {
      type: String,
      enum: ['AI & Agents', 'Full-Stack', 'Data Science', 'Automation', 'Machine Learning'],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);