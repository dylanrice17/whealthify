import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Drawer, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getAllAssessmentsForDoctor, updateAssessment } from '../services/AssessmentService';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState(getAllAssessmentsForDoctor());
  const [selected, setSelected] = useState(null);
  const [signature, setSignature] = useState('');
  const [signatureApplied, setSignatureApplied] = useState(false);

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
    // Generate LMN (unsigned)
    const letter = `Letter of Medical Necessity\n\nPatient: ${selected.name}\nDate: ${selected.dateSubmitted}\n\nBased on the health assessment, it is medically necessary for this patient to pursue the following treatment: ${selected.answers.treatment}.\n\nRelevant details:\n- Diagnoses: ${selected.answers.diagnoses?.join(', ') || 'N/A'}\n- Symptoms: ${selected.answers.symptoms?.join(', ') || 'N/A'}\n- Exercise: ${selected.answers.exercise}\n- Interest: ${selected.answers.interest}\n\nThis letter is provided for HSA/FSA reimbursement purposes.\n\nSignature: ___________________________`;
    updateAssessment(selected.id, { status: 'Signed', letter, signature: '' });
    setAssessments(getAllAssessmentsForDoctor());
    setSelected({ ...selected, status: 'Signed', letter, signature: '' });
    setSignature('');
    setSignatureApplied(false);
  };
  const handleReject = () => {
    updateAssessment(selected.id, { status: 'Rejected' });
    setAssessments(getAllAssessmentsForDoctor());
    setSelected({ ...selected, status: 'Rejected' });
  };
  const handleApplySignature = async () => {
    if (!signature) return;
    // Header info
    const doctorName = signature;
    const credentials = 'MD';
    const company = 'Whealthify';
    const address = '100 Harbor Blvd\nWeehawken, NJ 07086';
    const today = new Date().toISOString().split('T')[0];
    // Patient info
    const patientName = selected.name;
    const diagnosis = selected.answers.diagnoses && selected.answers.diagnoses.length > 0 ? selected.answers.diagnoses.join(', ') : 'N/A';
    // Letter body
    const letterText = `To Whom It May Concern,\n\nI am writing on behalf of my patient, ${patientName}, who is under my medical care for the treatment of ${diagnosis}.\n\nAs part of their comprehensive treatment plan, I am prescribing a structured physical activity program to be conducted at a fitness facility. A gym membership is medically necessary for ${patientName} in order to support clinically recommended lifestyle changes, which include regular cardiovascular and strength-based exercise. These activities are essential to help reduce weight, improve metabolic health, and lower the risk of associated conditions such as hypertension, diabetes, and heart disease.\n\nThis recommendation is made solely for medical reasons, not for general wellness or cosmetic purposes. I recommend that ${patientName} maintain a gym membership for an initial period of 12 months, with continued participation to be reassessed based on clinical progress and future health evaluations.\n\nIf you require any further information regarding this recommendation, please do not hesitate to contact me.`;

    // Generate PDF with pdf-lib
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const { width } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 13;
    let y = 800;
    const maxWidth = 495; // 595 - 2*50 margin
    // Header
    page.drawText(`${doctorName} ${credentials}`, { x: 50, y, size: 15, font, color: rgb(0, 0, 0) });
    y -= 22;
    page.drawText(company, { x: 50, y, size: 13, font, color: rgb(0, 0, 0) });
    y -= 18;
    address.split('\n').forEach(line => { page.drawText(line, { x: 50, y, size: 13, font, color: rgb(0, 0, 0) }); y -= 18; });
    y -= 10;
    page.drawText(`Date: ${today}`, { x: 50, y, size: 13, font, color: rgb(0, 0, 0) });
    y -= 30;
    // Body (word wrap)
    const lines = letterText.split('\n');
    lines.forEach(line => {
      const wrapped = wrapText(line, font, fontSize, maxWidth);
      wrapped.forEach(wline => {
        page.drawText(wline, { x: 50, y, size: fontSize, font, color: rgb(0, 0, 0) });
        y -= 22;
      });
      y -= 6;
    });
    // Signature label
    y -= 30;
    page.drawText('Signature:', { x: 50, y, size: fontSize, font, color: rgb(0, 0, 0) });
    y -= 32;
    page.drawText(signature, { x: 120, y, size: 28, font, color: rgb(0, 0, 0), italic: true });
    // Save PDF as data URL
    const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });
    // Update assessment with PDF
    updateAssessment(selected.id, { letter: letterText, signature, pdf: pdfBytes });
    setAssessments(getAllAssessmentsForDoctor());
    setSelected({ ...selected, letter: letterText, signature, pdf: pdfBytes });
    setSignatureApplied(true);
  };

  // Helper: word wrap for pdf-lib
  function wrapText(text, font, fontSize, maxWidth) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';
    for (let word of words) {
      const testLine = currentLine ? currentLine + ' ' + word : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

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
                {(!selected.signature || !signatureApplied) && (
                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ mb: 1 }}>Type your name to sign:</Typography>
                    <input
                      type="text"
                      value={signature}
                      onChange={e => setSignature(e.target.value)}
                      style={{ padding: '8px', borderRadius: '4px', border: '1px solid #43e97b', width: '100%', marginBottom: '8px' }}
                      placeholder="Doctor's Name"
                    />
                    <Button variant="contained" color="success" onClick={handleApplySignature} disabled={!signature}>
                      Apply Signature
                    </Button>
                  </Box>
                )}
                {selected.signature && signatureApplied && (
                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontFamily: 'Pacifico, cursive', fontSize: 28, fontWeight: 400 }}>{selected.signature}</Typography>
                  </Box>
                )}
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