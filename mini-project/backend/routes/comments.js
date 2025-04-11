const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// @route   GET api/comments/:labId
// @desc    Get all comments for a lab
// @access  Private
router.get('/:labId', auth, commentController.getComments);

// @route   POST api/comments
// @desc    Create a comment
// @access  Private
router.post('/', [
  auth,
  check('labId', 'Lab ID is required').not().isEmpty(),
  check('text', 'Comment text is required').not().isEmpty()
], commentController.createComment);

// @route   PUT api/comments/:id
// @desc    Update a comment
// @access  Private
router.put('/:id', [
  auth,
  check('text', 'Comment text is required').not().isEmpty()
], commentController.updateComment);

// @route   DELETE api/comments/:id
// @desc    Delete a comment
// @access  Private
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;