const User = require('../models/User');
const Project = require('../models/Project');
const projectsData = require('../data/projects.json');

exports.seedDatabase = async (req, res, next) => {
  try {
    // Always sync admin credentials from environment variables
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await User.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      });
      console.log('Admin user created from env');
    } else {
      // Update password from env so deployed env vars always take effect
      adminExists.password = process.env.ADMIN_PASSWORD;
      await adminExists.save(); // triggers pre-save bcrypt hash in User model
      console.log('Admin password synced from env');
    }

    // Clear existing projects and re-seed
    await Project.deleteMany({});
    await Project.insertMany(projectsData);
    console.log('Projects re-seeded from projects.json');

    res.json({ message: 'Seed completed' });
  } catch (error) {
    next(error);
  }
};