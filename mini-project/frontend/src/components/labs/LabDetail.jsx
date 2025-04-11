import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  AttachFile as AttachFileIcon,
  Comment as CommentIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import labService from '../../services/labService';
import progressService from '../../services/progressService';
import MilestoneTracker from './MilestoneTracker';
import { formatDate } from '../../utils/formatDate';

const LabDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lab, setLab] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const labData = await labService.getLabById(id);
        setLab(labData);
        
        // Get progress for this lab
        const progressData = await progressService.getProgressByLabId(id);
        setProgress(progressData);
        
        // Get comments
        const commentsData = await labService.getComments(id);
        setComments(commentsData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching lab data:', err);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    
    try {
      const newComment = await labService.addComment(id, comment);
      setComments([...comments, newComment]);
      setComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };
  
  const handleStatusUpdate = async (newStatus) => {
    try {
      const updatedProgress = await progressService.updateProgress(progress._id, {
        status: newStatus
      });
      setProgress(updatedProgress);
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };
  
  const handleDeleteLab = async () => {
    try {
      await labService.deleteLab(id);
      navigate('/labs');
    } catch (err) {
      console.error('Error deleting lab:', err);
    }
  };
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }
  
  if (!lab) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5">Lab not found</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/labs')}
          sx={{ mt: 2 }}
        >
          Back to Labs
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">{lab.title}</Typography>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<EditIcon />}
            onClick={() => navigate(`/labs/edit/${id}`)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button 
            variant="outlined" 
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteDialog(true)}
          >
            Delete
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Lab Details
            </Typography>
            <Typography variant="body1" paragraph>
              {lab.description}
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Course Code</Typography>
                <Typography variant="body1">{lab.courseCode}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Instructor</Typography>
                <Typography variant="body1">{lab.instructor.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Start Date</Typography>
                <Typography variant="body1">{formatDate(lab.startDate)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">End Date</Typography>
                <Typography variant="body1">{formatDate(lab.endDate)}</Typography>
              </Grid>
            </Grid>
            
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Resources
              </Typography>
              {lab.resources.length > 0 ? (
                <List dense>
                  {lab.resources.map((resource, index) => (
                    <ListItem key={index}>
                      <ListItemText 
                        primary={resource.title} 
                        secondary={resource.fileType}
                      />
                      <Button 
                        size="small" 
                        startIcon={<AttachFileIcon />}
                        href={resource.fileUrl}
                        target="_blank"
                      >
                        Download
                      </Button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No resources available
                </Typography>
              )}
            </Box>
          </Paper>
          
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Comments & Discussion
            </Typography>
            
            <List>
              {comments.length > 0 ? (
                comments.map((c, index) => (
                  <React.Fragment key={c._id || index}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="subtitle2">
                              {c.user.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {formatDate(c.createdAt)}
                            </Typography>
                          </Box>
                        }
                        secondary={c.text}
                      />
                    </ListItem>
                    {index < comments.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No comments yet
                </Typography>
              )}
            </List>
            
            <Box mt={2} display="flex">
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button 
                variant="contained" 
                color="primary"
                sx={{ ml: 1 }}
                onClick={handleAddComment}
              >
                Post
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Progress Tracking
            </Typography>
            
            {progress ? (
              <>
                <Box display="flex" justifyContent="center" mb={2}>
                  <Chip 
                    label={progress.status.toUpperCase()}
                    color={
                      progress.status === 'completed' 
                        ? 'success' 
                        : progress.status === 'in-progress' 
                          ? 'warning' 
                          : 'default'
                    }
                    sx={{ px: 2 }}
                  />
                </Box>
                
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => handleStatusUpdate('in-progress')}
                    disabled={progress.status === 'in-progress'}
                  >
                    Mark In Progress
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleStatusUpdate('completed')}
                    disabled={progress.status === 'completed'}
                  >
                    Mark Completed
                  </Button>
                </Box>
                
                <Box mt={3}>
                  <Typography variant="subtitle1" gutterBottom>
                    Milestones
                  </Typography>
                  <MilestoneTracker 
                    milestones={progress.milestones} 
                    progressId={progress._id}
                    onUpdate={(updatedProgress) => setProgress(updatedProgress)}
                  />
                </Box>
              </>
            ) : (
              <Box textAlign="center" py={2}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  No progress tracked yet
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AssignmentIcon />}
                  onClick={async () => {
                    try {
                      const newProgress = await progressService.createProgress({
                        labSession: id,
                        status: 'not-started',
                        milestones: []
                      });
                      setProgress(newProgress);
                    } catch (err) {
                      console.error('Error starting progress tracking:', err);
                    }
                  }}
                >
                  Start Tracking
                </Button>
              </Box>
            )}
          </Paper>
          
          {progress && progress.status === 'completed' && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Submission & Feedback
              </Typography>
              
              {progress.submissionUrl ? (
                <>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2">Submission</Typography>
                    <Button 
                      size="small" 
                      startIcon={<AttachFileIcon />}
                      href={progress.submissionUrl}
                      target="_blank"
                    >
                      View
                    </Button>
                  </Box>
                  
                  {progress.feedback && (
                    <Box mt={2}>
                      <Typography variant="subtitle2">Feedback</Typography>
                      <Paper variant="outlined" sx={{ p: 2, mt: 1, backgroundColor: '#f5f5f5' }}>
                        <Typography variant="body2">{progress.feedback}</Typography>
                      </Paper>
                    </Box>
                  )}
                  
                  {progress.grade && (
                    <Box mt={2}>
                      <Typography variant="subtitle2">Grade</Typography>
                      <Typography variant="h4" color="primary">{progress.grade}</Typography>
                    </Box>
                  )}
                </>
              ) : (
                <Box textAlign="center" py={2}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Upload your lab report
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AttachFileIcon />}
                  >
                    Upload Submission
                  </Button>
                </Box>
              )}
            </Paper>
          )}
        </Grid>
      </Grid>
      
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
      >
        <DialogTitle>Delete Lab</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this lab? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteLab} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LabDetail;