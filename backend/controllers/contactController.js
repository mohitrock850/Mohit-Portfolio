const Message = require('../models/Message');
const { sendContactNotification } = require('../utils/emailService');

// @desc    Handle contact form submission
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation (more detailed can be added)
    if (!name || !email || !subject || !message) {
      const error = new Error('All fields are required');
      error.statusCode = 400;
      throw error;
    }

    const newMessage = await Message.create({ name, email, subject, message });

    // Send email notification (do not block response on email failure)
    try {
      await sendContactNotification({ name, email, subject, message });
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr);
      // We still want to save the message, so we don't return an error.
    }

    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    next(error);
  }
};