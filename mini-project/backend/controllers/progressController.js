const Progress = require('../models/Progress');
const LabSession = require('../models/LabSession');

// @route   GET api/progress
// @desc    Get all progress entries for current user
// @access  Private
exports.getProgress = async (req, res, next) => {
  try {
    let query = {};
    
    // If user is a student, only show their progress
    if (req.user.role === 'student') {
      query.student = req.user.id;
    }
    // If user is an instructor, show progress for their labs
    else if (req.user.role === 'instructor') {
      const labs = await LabSession.find({ instructor: req.user.id }).select('_id');
      const labIds = labs.map(lab => lab._id);
      query.labSession = { $in: labIds };
    }
    
    const progress = await Progress.find(query)
      .populate('labSession', 'title courseCode')
      .populate('student', 'name email');
      
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

// @route   GET api/progress/:labId
// @desc    Get progress for a specific lab
// @access  Private
exports.getProgressByLabId = async (req, res, next) => {
    try {
      let query = { labSession: req.params.labId };
      
      // If user is a student, only show their progress
      if (req.user.role === 'student') {
        query.student = req.user.id;
      }
      
      // If user is instructor, validate they own this lab
      if (req.user.role === 'instructor') {
        const lab = await LabSession.findById(req.params.labId);
        if (!lab || lab.instructor.toString() !== req.user.id) {
          return res.status(403).json({ message: 'Not authorized' });
        }
      }
      
      let progress;
      
      if (req.user.role === 'student') {
        // For students, get their single progress record
        progress = await Progress.findOne(query)
          .populate('labSession', 'title courseCode')
          .populate('student', 'name email');
          
        if (!progress) {
          return res.status(404).json({ message: 'Progress record not found' });
        }
      } else {
        // For instructors and admins, get all progress records for this lab
        progress = await Progress.find(query)
          .populate('labSession', 'title courseCode')
          .populate('student', 'name email');
      }
      
      res.json(progress);
    } catch (err) {
      next(err);
    }
  };
  
  // @route   POST api/progress
  // @desc    Create a progress entry
  // @access  Private
  exports.createProgress = async (req, res, next) => {
    try {
      const { labSession, status, milestones } = req.body;
      
      // Check if lab exists
      const lab = await LabSession.findById(labSession);
      if (!lab) {
        return res.status(404).json({ message: 'Lab session not found' });
      }
      
      // Check if progress already exists for this lab and student
      const existingProgress = await Progress.findOne({
        labSession,
        student: req.user.id
      });
      
      if (existingProgress) {
        return res.status(400).json({ message: 'Progress record already exists for this lab' });
      }
      
      const progress = new Progress({
        labSession,
        student: req.user.id,
        status: status || 'not-started',
        milestones: milestones || []
      });
      
      await progress.save();
      
      // Populate references before sending response
      await progress.populate('labSession', 'title courseCode').execPopulate();
      await progress.populate('student', 'name email').execPopulate();
      
      res.status(201).json(progress);
    } catch (err) {
      next(err);
    }
  };
  
  // @route   PUT api/progress/:id
  // @desc    Update a progress entry
  // @access  Private
  exports.updateProgress = async (req, res, next) => {
    try {
      const progress = await Progress.findById(req.params.id);
      
      if (!progress) {
        return res.status(404).json({ message: 'Progress record not found' });
      }
      
      // Check if user is authorized
      if (progress.student.toString() !== req.user.id && 
          req.user.role !== 'admin' && 
          req.user.role !== 'instructor') {
        return res.status(403).json({ message: 'Not authorized' });
      }
      
      // If instructor, check if they own the lab
      if (req.user.role === 'instructor') {
        const lab = await LabSession.findById(progress.labSession);
        if (!lab || lab.instructor.toString() !== req.user.id) {
          return res.status(403).json({ message: 'Not authorized' });
        }
      }
      
      const { status, milestones, submissionUrl, feedback, grade } = req.body;
      
      if (status) progress.status = status;
      if (milestones) progress.milestones = milestones;
      if (submissionUrl) progress.submissionUrl = submissionUrl;
      
      // Only instructors and admins can add feedback and grades
      if ((req.user.role === 'instructor' || req.user.role === 'admin')) {
        if (feedback !== undefined) progress.feedback = feedback;
        if (grade !== undefined) progress.grade = grade;
      }
      
      progress.updatedAt = Date.now();
      
      await progress.save();
      
      // Populate references before sending response
      await progress.populate('labSession', 'title courseCode').execPopulate();
      await progress.populate('student', 'name email').execPopulate();
      
      res.json(progress);
    } catch (err) {
      next(err);
    }
  };
  
  // @route   DELETE api/progress/:id
  // @desc    Delete a progress entry
  // @access  Private (Admin only)
  exports.deleteProgress = async (req, res, next) => {
    try {
      // Only admins can delete progress records
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
      }
      
      const progress = await Progress.findById(req.params.id);
      
      if (!progress) {
        return res.status(404).json({ message: 'Progress record not found' });
      }
      
      await progress.remove();
      
      res.json({ message: 'Progress record removed' });
    } catch (err) {
      next(err);
    }
  };