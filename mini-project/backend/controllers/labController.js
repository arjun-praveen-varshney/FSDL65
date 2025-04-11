const LabSession = require('../models/LabSession');
const Progress = require('../models/Progress');

// @route   GET api/labs
// @desc    Get all lab sessions
// @access  Private
exports.getLabs = async (req, res, next) => {
  try {
    let query = {};
    
    // If user is a student, only show labs they're enrolled in
    if (req.user.role === 'student') {
      // TODO: Add enrollment filtering logic
    }
    // If user is an instructor, only show labs they created
    else if (req.user.role === 'instructor') {
      query.instructor = req.user.id;
    }
    
    const labs = await LabSession.find(query)
      .populate('instructor', 'name email')
      .sort({ startDate: -1 });
      
    res.json(labs);
  } catch (err) {
    next(err);
  }
};

// @route   GET api/labs/:id
// @desc    Get lab session by ID
// @access  Private
exports.getLabById = async (req, res, next) => {
  try {
    const lab = await LabSession.findById(req.params.id)
      .populate('instructor', 'name email');
      
    if (!lab) {
      return res.status(404).json({ message: 'Lab session not found' });
    }
    
    res.json(lab);
  } catch (err) {
    next(err);
  }
};

// @route   POST api/labs
// @desc    Create a lab session
// @access  Private (Instructors only)
exports.createLab = async (req, res, next) => {
  try {
    // Check if user is instructor
    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const { title, description, courseCode, startDate, endDate, resources } = req.body;
    
    const lab = new LabSession({
      title,
      description,
      courseCode,
      instructor: req.user.id,
      startDate,
      endDate,
      resources: resources || [],
      status: new Date() < new Date(startDate) ? 'upcoming' : 
              new Date() > new Date(endDate) ? 'completed' : 'active'
    });
    
    await lab.save();
    
    res.status(201).json(lab);
  } catch (err) {
    next(err);
  }
};

// @route   PUT api/labs/:id
// @desc    Update a lab session
// @access  Private (Instructors only)
exports.updateLab = async (req, res, next) => {
  try {
    const lab = await LabSession.findById(req.params.id);
    
    if (!lab) {
      return res.status(404).json({ message: 'Lab session not found' });
    }
    
    // Check if user is authorized
    if (lab.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const { title, description, courseCode, startDate, endDate, resources } = req.body;
    
    if (title) lab.title = title;
    if (description) lab.description = description;
    if (courseCode) lab.courseCode = courseCode;
    if (startDate) lab.startDate = startDate;
    if (endDate) lab.endDate = endDate;
    if (resources) lab.resources = resources;
    
    lab.status = new Date() < new Date(lab.startDate) ? 'upcoming' : 
                new Date() > new Date(lab.endDate) ? 'completed' : 'active';
    
    lab.updatedAt = Date.now();
    
    await lab.save();
    
    res.json(lab);
  } catch (err) {
    next(err);
  }
};

// @route   DELETE api/labs/:id
// @desc    Delete a lab session
// @access  Private (Instructors only)
exports.deleteLab = async (req, res, next) => {
  try {
    const lab = await LabSession.findById(req.params.id);
    
    if (!lab) {
      return res.status(404).json({ message: 'Lab session not found' });
    }
    
    // Check if user is authorized
    if (lab.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await lab.remove();
    
    // Remove all progress entries related to this lab
    await Progress.deleteMany({ labSession: req.params.id });
    
    res.json({ message: 'Lab session removed' });
  } catch (err) {
    next(err);
  }
};