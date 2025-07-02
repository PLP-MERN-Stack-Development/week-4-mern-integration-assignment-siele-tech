// categories.js - Categories routes

const express = require('express');
const { body } = require('express-validator');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', getCategories);

// @route   GET /api/categories/:id
// @desc    Get single category
// @access  Public
router.get('/:id', getCategory);

// @route   POST /api/categories
// @desc    Create new category
// @access  Private (Admin only)
router.post(
  '/',
  protect,
  authorize('admin'),
  [
    body('name')
      .notEmpty()
      .withMessage('Category name is required')
      .isLength({ max: 50 })
      .withMessage('Category name cannot be more than 50 characters'),
    body('description')
      .optional()
      .isLength({ max: 200 })
      .withMessage('Description cannot be more than 200 characters'),
    body('color')
      .optional()
      .matches(/^#[0-9A-F]{6}$/i)
      .withMessage('Color must be a valid hex color code')
  ],
  validate,
  createCategory
);

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private (Admin only)
router.put(
  '/:id',
  protect,
  authorize('admin'),
  [
    body('name')
      .optional()
      .notEmpty()
      .withMessage('Category name cannot be empty')
      .isLength({ max: 50 })
      .withMessage('Category name cannot be more than 50 characters'),
    body('description')
      .optional()
      .isLength({ max: 200 })
      .withMessage('Description cannot be more than 200 characters'),
    body('color')
      .optional()
      .matches(/^#[0-9A-F]{6}$/i)
      .withMessage('Color must be a valid hex color code'),
    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive must be a boolean')
  ],
  validate,
  updateCategory
);

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), deleteCategory);

module.exports = router; 