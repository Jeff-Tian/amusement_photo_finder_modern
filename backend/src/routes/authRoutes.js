const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getCurrentUser, 
  updateUser, 
  refreshToken 
} = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

// 认证相关路由
router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getCurrentUser);
router.put('/me', authMiddleware, updateUser);
router.post('/refresh', authMiddleware, refreshToken);

module.exports = router;