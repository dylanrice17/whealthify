import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TableChartIcon from '@mui/icons-material/TableChart';
import DescriptionIcon from '@mui/icons-material/Description';

const cardStyles = [
  {
    background: 'linear-gradient(135deg, #2196f3 60%, #43e97b 100%)',
    icon: <AssignmentIcon sx={{ fontSize: 48, mb: 1 }} />,
    title: 'Begin Health Assessment',
    desc: 'Start a new health assessment to generate your letter.'
  },
  {
    background: 'linear-gradient(135deg, #43e97b 60%, #2196f3 100%)',
    icon: <TableChartIcon sx={{ fontSize: 48, mb: 1 }} />,
    title: 'My Health Assessments',
    desc: 'View your completed health assessments.'
  },
  {
    background: 'linear-gradient(135deg, #2196f3 60%, #43e97b 100%)',
    icon: <DescriptionIcon sx={{ fontSize: 48, mb: 1 }} />,
    title: 'My Letters of Medical Necessity',
    desc: 'Access your generated letters for HSA/FSA use.'
  }
];

export default function Dashboard() {
  return (
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(circle at 50% 0%, #1e293b 60%, #0f172a 100%)', py: 8 }}>
      <Typography variant="h2" fontWeight={700} align="center" sx={{ color: '#fff', mb: 6, textShadow: '0 4px 24px #2196f3' }}>
        Dashboard
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={5} lg={4}>
          <Card sx={{ backgroundImage: cardStyles[0].background, borderRadius: 4, boxShadow: '0 8px 40px 0 rgba(33,150,243,0.18)', color: '#fff', p: 2, cursor: 'pointer', textAlign: 'center' }}>
            <CardContent>
              {cardStyles[0].icon}
              <Typography variant="h5" fontWeight={700} gutterBottom>{cardStyles[0].title}</Typography>
              <Typography variant="body1">{cardStyles[0].desc}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Card sx={{ backgroundImage: cardStyles[1].background, borderRadius: 4, boxShadow: '0 8px 40px 0 rgba(33,150,243,0.18)', color: '#fff', p: 2, cursor: 'pointer', textAlign: 'center' }}>
            <CardContent>
              {cardStyles[1].icon}
              <Typography variant="h5" fontWeight={700} gutterBottom>{cardStyles[1].title}</Typography>
              <Typography variant="body1">{cardStyles[1].desc}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={10} lg={8} sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Card sx={{ backgroundImage: cardStyles[2].background, borderRadius: 4, boxShadow: '0 8px 40px 0 rgba(33,150,243,0.18)', color: '#fff', p: 2, cursor: 'pointer', textAlign: 'center', minWidth: 350, maxWidth: 500 }}>
            <CardContent>
              {cardStyles[2].icon}
              <Typography variant="h5" fontWeight={700} gutterBottom>{cardStyles[2].title}</Typography>
              <Typography variant="body1">{cardStyles[2].desc}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 