const express = require('express');
const router = express.Router();
const labController = require('../controllers/labController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// @route   GET api/labs
// @desc    Get all lab sessions
// @access  Private
router.get('/', auth, labController.getLabs);

// @route   GET api/labs/:id
// @desc    Get lab session by ID
// @access  Private
router.get('/:id', auth, labController.getLabById);

// @route   POST api/labs
// @desc    Create a lab session
// @access  Private (Instructors only)
router.post('/', [
  auth,
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('courseCode', 'Course code is required').not().isEmpty(),
  check('startDate', 'Start date is required').not().isEmpty(),
  check('endDate', 'End date is required').not().isEmpty()
], labController.createLab);

// @route   PUT api/labs/:id
// @desc    Update a lab session
// @access  Private (Instructors only)
router.put('/:id', auth, labController.updateLab);

// @route   DELETE api/labs/:id
// @desc    Delete a lab session
// @access  Private (Instructors only)
router.delete('/:id', auth, labController.deleteLab);

module.exports = router;