import React from 'react';
import { 
  Box, 
  useTheme 
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ProgressChart = ({ progress, labs }) => {
  const theme = useTheme();
  
  // Process data for chart
  const processChartData = () => {
    // Group by lab title
    const labMap = labs.reduce((acc, lab) => {
      acc[lab._id] = lab.title;
      return acc;
    }, {});
    
    // Count statuses by lab
    const statusCounts = progress.reduce((acc, p) => {
      const labId = p.labSession;
      const labTitle = labMap[labId] || 'Unknown Lab';
      
      if (!acc[labTitle]) {
        acc[labTitle] = {
          name: labTitle,
          completed: 0,
          'in-progress': 0,
          'not-started': 0
        };
      }
      
      acc[labTitle][p.status]++;
      return acc;
    }, {});
    
    return Object.values(statusCounts);
  };
  
  const chartData = processChartData();
  
  return (
    <Box height={300} mt={2}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" stackId="a" fill={theme.palette.success.main} />
          <Bar dataKey="in-progress" stackId="a" fill={theme.palette.warning.main} />
          <Bar dataKey="not-started" stackId="a" fill={theme.palette.grey[400]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ProgressChart;