const express = require('express');
const { register, login, getMe, forgotPassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

const router = express.Router();

router.post('/register', upload.array('documents', 5), register);
router.post('/login', login);
router.get('/me', protect, getMe);

if (forgotPassword) {
  router.post('/forgot-password', forgotPassword);
}

module.exports = router;
