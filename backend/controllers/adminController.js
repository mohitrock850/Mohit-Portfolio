const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (admin only)
// @route   GET /api/admin/messages
// @access  Private
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// @desc    Mark message as read
// @route   PUT /api/admin/messages/:id/read
// @access  Private
exports.markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) {
      const error = new Error('Message not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(message);
  } catch (error) {
    next(error);
  }
};