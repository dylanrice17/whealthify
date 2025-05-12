import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TableChartIcon from '@mui/icons-material/TableChart';
import DescriptionIcon from '@mui/icons-material/Description';

const sidebarItems = [
  {
    label: 'Profile',
    icon: <AccountCircleIcon sx={{ color: '#43e97b' }} />,
  },
  {
    label: 'My Health Assessments',
    icon: <TableChartIcon sx={{ color: '#2196f3' }} />,
  },
  {
    label: 'My Letters of Medical Necessity',
    icon: <DescriptionIcon sx={{ color: '#43e97b' }} />,
  },
];

export default function Dashboard() {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const lastUser = JSON.parse(localStorage.getItem('whealthify_last_user') || 'null');
    if (lastUser && lastUser.name) {
      setFirstName(lastUser.name.split(' ')[0]);
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'radial-gradient(circle at 50% 0%, #1e293b 60%, #0f172a 100%)' }}>
      {/* Sidebar */}
      <Box sx={{ width: 250, background: 'rgba(16, 24, 40, 0.98)', color: '#fff', py: 4, px: 2, display: 'flex', flexDirection: 'column', minHeight: '100vh', boxShadow: '2px 0 16px 0 rgba(33,150,243,0.10)' }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 4, textAlign: 'center', letterSpacing: 1, color: '#43e97b' }}>
          Dashboard
        </Typography>
        <Divider sx={{ mb: 2, background: 'rgba(255,255,255,0.08)' }} />
        <List>
          {sidebarItems.map((item, idx) => (
            <ListItem button key={item.label} sx={{ borderRadius: 2, mb: 1, '&:hover': { background: 'rgba(67,233,123,0.08)' } }}>
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, color: '#fff' }} />
            </ListItem>
          ))}
        </List>
      </Box>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: { xs: 2, md: 6 }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Typography variant="h3" fontWeight={700} sx={{ color: '#fff', mb: 4, mt: 2, textShadow: '0 4px 24px #2196f3' }}>
          {firstName ? `Welcome to Whealthify, ${firstName}!` : 'Welcome to Whealthify!'}
        </Typography>
        {/* Placeholder for dashboard widgets or info */}
        <Box sx={{ width: '100%', maxWidth: 800, mt: 4, p: 4, borderRadius: 4, background: 'rgba(33,150,243,0.10)', color: '#fff', textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={500}>
            Select an option from the sidebar to get started.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
} 