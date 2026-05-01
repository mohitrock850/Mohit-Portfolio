const Project = require('../models/Project');
const { uploadToCloudinary } = require('../utils/cloudinary');

// @desc    Get all projects (with optional filtering)
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';

    const projects = await Project.find(filter).sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project (admin only)
// @route   POST /api/projects
// @access  Private/Admin
exports.createProject = async (req, res, next) => {
  try {
    const projectData = req.body;

    // Handle image upload if file is provided
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer, 'portfolio-projects');
        projectData.image = result.secure_url;
      } catch (uploadErr) {
        console.error('[createProject] Cloudinary upload failed:', uploadErr.message || uploadErr);
        const err = new Error(`Image upload failed: ${uploadErr.message || 'Cloudinary error'}`);
        err.statusCode = 500;
        return next(err);
      }
    }

    // Parse stack if sent as a string (e.g., comma-separated from form)
    if (typeof projectData.stack === 'string') {
      projectData.stack = projectData.stack.split(',').map(s => s.trim());
    }

    // Parse featured if it comes as string from FormData
    if (typeof projectData.featured === 'string') {
      projectData.featured = projectData.featured === 'true';
    }

    const project = await Project.create(projectData);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// @desc    Update project (admin only)
// @route   PUT /api/projects/:id
// @access  Private/Admin
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      throw error;
    }

    const updates = req.body;

    // Handle new image upload
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer, 'portfolio-projects');
        updates.image = result.secure_url;
      } catch (uploadErr) {
        console.error('[updateProject] Cloudinary upload failed:', uploadErr.message || uploadErr);
        const err = new Error(`Image upload failed: ${uploadErr.message || 'Cloudinary error'}`);
        err.statusCode = 500;
        return next(err);
      }
    }

    // Parse stack if string
    if (typeof updates.stack === 'string') {
      updates.stack = updates.stack.split(',').map(s => s.trim());
    }

    // Parse featured if it comes as string from FormData
    if (typeof updates.featured === 'string') {
      updates.featured = updates.featured === 'true';
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project (admin only)
// @route   DELETE /api/projects/:id
// @access  Private/Admin
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      throw error;
    }
    // Optional: delete image from Cloudinary using project.image public_id
    // We'll skip that for simplicity here.

    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } catch (error) {
    next(error);
  }
};