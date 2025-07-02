// posts.js - Posts routes

const express = require('express');
const { body } = require('express-validator');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment
} = require('../controllers/postController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getPosts);

// @route   GET /api/posts/:id
// @desc    Get single post
// @access  Public
router.get('/:id', getPost);

// @route   POST /api/posts
// @desc    Create new post
// @access  Private
router.post(
  '/',
  protect,
  [
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 100 })
      .withMessage('Title cannot be more than 100 characters'),
    body('content')
      .notEmpty()
      .withMessage('Content is required'),
    body('category')
      .notEmpty()
      .withMessage('Category is required')
      .isMongoId()
      .withMessage('Invalid category ID'),
    body('excerpt')
      .optional()
      .isLength({ max: 200 })
      .withMessage('Excerpt cannot be more than 200 characters'),
    body('tags')
      .optional()
      .isString()
      .withMessage('Tags must be a comma-separated string'),
    body('isPublished')
      .optional()
      .isBoolean()
      .withMessage('isPublished must be a boolean')
  ],
  validate,
  createPost
);

// @route   PUT /api/posts/:id
// @desc    Update post
// @access  Private
router.put(
  '/:id',
  protect,
  [
    body('title')
      .optional()
      .notEmpty()
      .withMessage('Title cannot be empty')
      .isLength({ max: 100 })
      .withMessage('Title cannot be more than 100 characters'),
    body('content')
      .optional()
      .notEmpty()
      .withMessage('Content cannot be empty'),
    body('category')
      .optional()
      .isMongoId()
      .withMessage('Invalid category ID'),
    body('excerpt')
      .optional()
      .isLength({ max: 200 })
      .withMessage('Excerpt cannot be more than 200 characters'),
    body('tags')
      .optional()
      .isString()
      .withMessage('Tags must be a comma-separated string'),
    body('isPublished')
      .optional()
      .isBoolean()
      .withMessage('isPublished must be a boolean')
  ],
  validate,
  updatePost
);

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', protect, deletePost);

// @route   POST /api/posts/:id/comments
// @desc    Add comment to post
// @access  Private
router.post(
  '/:id/comments',
  protect,
  [
    body('content')
      .notEmpty()
      .withMessage('Comment content is required')
      .isLength({ max: 1000 })
      .withMessage('Comment cannot be more than 1000 characters')
  ],
  validate,
  addComment
);

module.exports = router; 