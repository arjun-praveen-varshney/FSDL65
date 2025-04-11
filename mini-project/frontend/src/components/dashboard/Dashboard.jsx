import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  CircularProgress 
} from '@mui/material';
import ProgressChart from './ProgressChart';
import UpcomingLabs from './UpcomingLabs';
import labService from '../../services/labService';
import progressService from '../../services/progressService';

const Dashboard = () => {
  const [labs, setLabs] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLabs: 0,
    completedLabs: 0,
    inProgressLabs: 0,
    upcomingLabs: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [labsData, progressData] = await Promise.all([
          labService.getLabs(),
          progressService.getProgress()
        ]);
        setLabs(labsData);
        setProgress(progressData);
        
        // Calculate stats
        const completed = progressData.filter(p => p.status === 'completed').length;
        const inProgress = progressData.filter(p => p.status === 'in-progress').length;
        const upcoming = labsData.filter(lab => 
          !progressData.some(p => p.labSession.toString() === lab._id.toString())
        ).length;
        
        setStats({
          totalLabs: labsData.length,
          completedLabs: completed,
          inProgressLabs: inProgress,
          upcomingLabs: upcoming
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Overview */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#e3f2fd',
            }}
          >
            <Typography variant="h6">Total Labs</Typography>
            <Typography variant="h3">{stats.totalLabs}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#e8f5e9',
            }}
          >
            <Typography variant="h6">Completed</Typography>
            <Typography variant="h3">{stats.completedLabs}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#fff8e1',
            }}
          >
            <Typography variant="h6">In Progress</Typography>
            <Typography variant="h3">{stats.inProgressLabs}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#fce4ec',
            }}
          >
            <Typography variant="h6">Upcoming</Typography>
            <Typography variant="h3">{stats.upcomingLabs}</Typography>
          </Paper>
        </Grid>
        
        {/* Progress Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Your Progress
            </Typography>
            <ProgressChart progress={progress} labs={labs} />
          </Paper>
        </Grid>
        
        {/* Upcoming Labs */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Deadlines
            </Typography>
            <UpcomingLabs labs={labs} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;