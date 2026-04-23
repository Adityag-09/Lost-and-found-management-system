const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  searchItems,
} = require('../controllers/itemController');

// Public routes
router.get('/', getAllItems);
router.get('/search', searchItems);
router.get('/:id', getItemById);

// Protected routes
router.post('/', protect, createItem);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;
