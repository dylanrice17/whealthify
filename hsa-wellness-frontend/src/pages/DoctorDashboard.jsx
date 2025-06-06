import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Drawer, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getAllAssessmentsForDoctor, updateAssessment } from '../services/AssessmentService';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState(getAllAssessmentsForDoctor());
  const [selected, setSelected] = useState(null);

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

  const handleView = (assessment) => setSelected(assessment);
  const handleBack = () => setSelected(null);
  const handleAccept = () => {
    // Generate LMN
    const letter = `Letter of Medical Necessity\n\nPatient: ${selected.name}\nDate: ${selected.dateSubmitted}\n\nBased on the health assessment, it is medically necessary for this patient to pursue the following treatment: ${selected.answers.treatment}.\n\nRelevant details:\n- Diagnoses: ${selected.answers.diagnoses?.join(', ') || 'N/A'}\n- Symptoms: ${selected.answers.symptoms?.join(', ') || 'N/A'}\n- Exercise: ${selected.answers.exercise}\n- Interest: ${selected.answers.interest}\n\nThis letter is provided for HSA/FSA reimbursement purposes.\n\nSigned,\nWhealthify Medical Team`;
    updateAssessment(selected.id, { status: 'Signed', letter });
    setAssessments(getAllAssessmentsForDoctor());
    setSelected({ ...selected, status: 'Signed', letter });
  };
  const handleReject = () => {
    updateAssessment(selected.id, { status: 'Rejected' });
    setAssessments(getAllAssessmentsForDoctor());
    setSelected({ ...selected, status: 'Rejected' });
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
        {selected ? (
          <Box sx={{ maxWidth: 600, mx: 'auto', background: 'linear-gradient(135deg, #2196f3 60%, #43e97b 100%)', borderRadius: 4, p: 4, color: '#fff' }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Assessment Details</Typography>
            <Typography>Name: {selected.name}</Typography>
            <Typography>Date: {selected.dateSubmitted}</Typography>
            <Typography>Status: {selected.status}</Typography>
            <Typography sx={{ mt: 2, fontWeight: 600 }}>Answers:</Typography>
            <Box sx={{ background: 'rgba(0,0,0,0.10)', borderRadius: 4, p: 2, mb: 2 }}>
              <Typography><b>Height:</b> {selected.answers.heightFeet} ft {selected.answers.heightInches} in</Typography>
              <Typography><b>Weight:</b> {selected.answers.weight} lbs</Typography>
              <Typography><b>Diagnoses:</b> {selected.answers.diagnoses && selected.answers.diagnoses.length > 0 ? selected.answers.diagnoses.join(', ') : 'N/A'}</Typography>
              <Typography><b>Symptoms:</b> {selected.answers.symptoms && selected.answers.symptoms.length > 0 ? selected.answers.symptoms.join(', ') : 'N/A'}</Typography>
              <Typography><b>Exercise Frequency:</b> {selected.answers.exercise}</Typography>
              <Typography><b>Interest in Health Improvement:</b> {selected.answers.interest}</Typography>
              <Typography><b>Preferred Treatment:</b> {selected.answers.treatment}</Typography>
            </Box>
            {selected.status === 'Signed' && selected.letter && (
              <Box sx={{ mt: 3, p: 2, background: 'rgba(67,233,123,0.10)', borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={700} sx={{ color: '#43e97b' }}>Letter of Medical Necessity</Typography>
                <Typography sx={{ whiteSpace: 'pre-line', mt: 1 }}>{selected.letter}</Typography>
              </Box>
            )}
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button variant="outlined" onClick={handleBack}>Back</Button>
              {selected.status === 'Pending' && <Button variant="contained" color="success" onClick={handleAccept}>Accept</Button>}
              {selected.status === 'Pending' && <Button variant="contained" color="error" onClick={handleReject}>Reject</Button>}
            </Box>
          </Box>
        ) : (
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
                {assessments.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.answers?.state || ''}</TableCell>
                    <TableCell>{row.dateSubmitted}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <Button size="small" variant="contained" color="primary" onClick={() => handleView(row)}>View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default DoctorDashboard; 