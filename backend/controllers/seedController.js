const User = require('../models/User');
const Project = require('../models/Project');
const projectsData = require('../data/projects.json');

exports.seedDatabase = async (req, res, next) => {   // ← NOTE: req, res, next
  try {
    // Create admin user if not exists
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await User.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      });
      console.log('Admin user seeded');
    }

    // Clear existing projects and re-seed from projects.json to ensure database is always synced
    await Project.deleteMany({});
    await Project.insertMany(projectsData);
    console.log('Projects deleted and re-seeded successfully from projects.json');

    res.json({ message: 'Seed completed' });
  } catch (error) {
    next(error);   // ← Pass error to the error-handling middleware
  }
};