const Comment = require('../models/Comment');
const LabSession = require('../models/LabSession');

// @route   GET api/comments/:labId
// @desc    Get all comments for a lab
// @access  Private
exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ labSession: req.params.labId })
      .populate('user', 'name')
      .sort({ createdAt: 1 });
      
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

// @route   POST api/comments
// @desc    Create a comment
// @access  Private
exports.createComment = async (req, res, next) => {
  try {
    const { labId, text } = req.body;
    
    // Check if lab exists
    const lab = await LabSession.findById(labId);
    if (!lab) {
      return res.status(404).json({ message: 'Lab session not found' });
    }
    
    const comment = new Comment({
      labSession: labId,
      user: req.user.id,
      text
    });
    
    await comment.save();
    
    // Populate user reference before sending response
    await comment.populate('user', 'name').execPopulate();
    
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

// @route   PUT api/comments/:id
// @desc    Update a comment
// @access  Private
exports.updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    // Check if user is authorized
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    comment.text = req.body.text;
    
    await comment.save();
    
    // Populate user reference before sending response
    await comment.populate('user', 'name').execPopulate();
    
    res.json(comment);
  } catch (err) {
    next(err);
  }
};

// @route   DELETE api/comments/:id
// @desc    Delete a comment
// @access  Private
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    // Check if user is authorized
    if (comment.user.toString() !== req.user.id && 
        req.user.role !== 'admin' && 
        req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await comment.remove();
    
    res.json({ message: 'Comment removed' });
  } catch (err) {
    next(err);
  }
};