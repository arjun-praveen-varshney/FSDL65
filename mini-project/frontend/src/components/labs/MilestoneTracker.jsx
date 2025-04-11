import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import progressService from '../../services/progressService';
import { formatDate } from '../../utils/formatDate';

const MilestoneTracker = ({ milestones = [], progressId, onUpdate }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState({
    id: null,
    title: '',
    description: ''
  });

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditMode(false);
    setCurrentMilestone({ id: null, title: '', description: '' });
  };

  const handleAddMilestone = async () => {
    if (!currentMilestone.title.trim()) return;

    try {
      let updatedProgress;
      
      if (editMode) {
        // Update existing milestone
        const updatedMilestones = milestones.map(m => 
          m.id === currentMilestone.id ? { ...m, title: currentMilestone.title, description: currentMilestone.description } : m
        );
        
        updatedProgress = await progressService.updateProgress(progressId, {
          milestones: updatedMilestones
        });
      } else {
        // Add new milestone
        const newMilestone = {
          id: Date.now().toString(),
          title: currentMilestone.title,
          description: currentMilestone.description,
          status: 'pending',
          completedAt: null
        };
        
        updatedProgress = await progressService.updateProgress(progressId, {
          milestones: [...milestones, newMilestone]
        });
      }
      
      onUpdate(updatedProgress);
      handleDialogClose();
    } catch (err) {
      console.error('Error updating milestones:', err);
    }
  };

  const handleToggleMilestone = async (milestoneId) => {
    try {
      const updatedMilestones = milestones.map(m => {
        if (m.id === milestoneId) {
          const isCompleted = m.status === 'completed';
          return {
            ...m,
            status: isCompleted ? 'pending' : 'completed',
            completedAt: isCompleted ? null : new Date()
          };
        }
        return m;
      });
      
      const updatedProgress = await progressService.updateProgress(progressId, {
        milestones: updatedMilestones
      });
      
      onUpdate(updatedProgress);
    } catch (err) {
      console.error('Error updating milestone status:', err);
    }
  };

  const handleEditMilestone = (milestone) => {
    setCurrentMilestone({
      id: milestone.id,
      title: milestone.title,
      description: milestone.description
    });
    setEditMode(true);
    setDialogOpen(true);
  };

  const handleDeleteMilestone = async (milestoneId) => {
    try {
      const updatedMilestones = milestones.filter(m => m.id !== milestoneId);
      
      const updatedProgress = await progressService.updateProgress(progressId, {
        milestones: updatedMilestones
      });
      
      onUpdate(updatedProgress);
    } catch (err) {
      console.error('Error deleting milestone:', err);
    }
  };

  return (
    <>
      {milestones.length > 0 ? (
        <List dense>
          {milestones.map((milestone) => (
            <ListItem key={milestone.id}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={milestone.status === 'completed'}
                  onChange={() => handleToggleMilestone(milestone.id)}
                />
              </ListItemIcon>
              <ListItemText
                primary={milestone.title}
                secondary={
                  <>
                    {milestone.description && (
                      <Typography variant="body2" component="span" display="block">
                        {milestone.description}
                      </Typography>
                    )}
                    {milestone.completedAt && (
                      <Typography variant="caption" color="textSecondary">
                        Completed: {formatDate(milestone.completedAt)}
                      </Typography>
                    )}
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton 
                  edge="end" 
                  size="small"
                  onClick={() => handleEditMilestone(milestone)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  edge="end" 
                  size="small"
                  onClick={() => handleDeleteMilestone(milestone.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="textSecondary" align="center" sx={{ my: 2 }}>
          No milestones added yet
        </Typography>
      )}
      
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Add Milestone
        </Button>
      </Box>
      
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{editMode ? 'Edit Milestone' : 'Add New Milestone'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={currentMilestone.title}
            onChange={(e) => setCurrentMilestone({ ...currentMilestone, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description (optional)"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={currentMilestone.description}
            onChange={(e) => setCurrentMilestone({ ...currentMilestone, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddMilestone} color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MilestoneTracker;