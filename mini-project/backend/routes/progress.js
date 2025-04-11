const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// @route   GET api/progress
// @desc    Get all progress entries for current user
// @access  Private
router.get('/', auth, progressController.getProgress);

// @route   GET api/progress/:labId
// @desc    Get progress for a specific lab
// @access  Private
router.get('/:labId', auth, progressController.getProgressByLabId);

// @route   POST api/progress
// @desc    Create a progress entry
// @access  Private
router.post('/', [
  auth,
  check('labSession', 'Lab session ID is required').not().isEmpty()
], progressController.createProgress);

// @route   PUT api/progress/:id
// @desc    Update a progress entry
// @access  Private
router.put('/:id', auth, progressController.updateProgress);

// @route   DELETE api/progress/:id
// @desc    Delete a progress entry
// @access  Private (Admin only)
router.delete('/:id', auth, progressController.deleteProgress);

module.exports = router;