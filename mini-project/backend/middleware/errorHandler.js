module.exports = function(err, req, res, next) {
    console.error(err.stack);
    
    // Check for MongoDB validation errors
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ message: validationErrors.join(', ') });
    }
    
    // Check for MongoDB duplicate key errors
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate record found' });
    }
    
    // Generic error response
    res.status(500).json({ message: 'Server error' });
  };