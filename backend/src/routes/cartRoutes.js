const express = require('express');
const router = express.Router();
const { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart 
} = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');

// 购物车相关路由
router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart);
router.put('/items/:itemId', authMiddleware, updateCartItem);
router.delete('/items/:itemId', authMiddleware, removeFromCart);
router.delete('/', authMiddleware, clearCart);

module.exports = router;