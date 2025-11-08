import express from 'express';
import { body } from 'express-validator';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all posts
// @access  Private
router.get('/', protect, getAllPosts);

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private
router.post(
  '/',
  [protect, body('content').trim().notEmpty().withMessage('Post content is required')],
  createPost
);

// @route   GET /api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', protect, getPostById);

// @route   PUT /api/posts/:id
// @desc    Update post
// @access  Private
router.put(
  '/:id',
  [protect, body('content').trim().notEmpty().withMessage('Post content is required')],
  updatePost
);

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', protect, deletePost);

// @route   PUT /api/posts/:id/like
// @desc    Like a post
// @access  Private
router.put('/:id/like', protect, likePost);

// @route   PUT /api/posts/:id/unlike
// @desc    Unlike a post
// @access  Private
router.put('/:id/unlike', protect, unlikePost);

// @route   POST /api/posts/:id/comments
// @desc    Add a comment to a post
// @access  Private
router.post(
  '/:id/comments',
  [protect, body('text').trim().notEmpty().withMessage('Comment text is required')],
  addComment
);

// @route   DELETE /api/posts/:id/comments/:commentId
// @desc    Delete a comment
// @access  Private
router.delete('/:id/comments/:commentId', protect, deleteComment);

export default router;
