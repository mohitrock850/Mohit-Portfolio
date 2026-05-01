const express = require('express');
const router = express.Router();
const { loginAdmin, getMessages, markAsRead } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/messages', protect, getMessages);
router.put('/messages/:id/read', protect, markAsRead);

// Optional seed route (use only once)
const { seedDatabase } = require('../controllers/seedController');
router.post('/seed', seedDatabase);

module.exports = router;