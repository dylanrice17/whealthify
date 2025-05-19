import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Drawer, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const mockAssessments = [
  { id: 1, name: 'John Smith', state: 'CA', date: '2024-05-18', status: 'Pending' },
  { id: 2, name: 'Jane Doe', state: 'NY', date: '2024-05-17', status: 'Signed' },
  { id: 3, name: 'Alice Lee', state: 'TX', date: '2024-05-16', status: 'Pending' },
];

const DoctorDashboard = () => {
  const navigate = useNavigate();

  // Protect route: redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem('doctorToken')) {
      navigate('/doctor-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('doctorToken');
    navigate('/doctor-login');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#19202b' }}>
      {/* Sidebar */}
      <Drawer variant="permanent" sx={{ width: 220, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 220, boxSizing: 'border-box', background: '#111827', color: '#fff' } }}>
        <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>Doctor Panel</Typography>
        <List>
          <ListItem button selected>
            <ListItemText primary="Assessments" />
          </ListItem>
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" color="secondary" sx={{ m: 2 }} onClick={handleLogout}>
          Logout
        </Button>
      </Drawer>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>Submitted Assessments</Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 900 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Date Submitted</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockAssessments.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Button size="small" variant="contained" color="primary">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DoctorDashboard; 