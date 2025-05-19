import React from 'react';
import { Container, Box, Typography, Button, Card, CardContent } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const stepCardStyle = (color) => ({
  background: 'rgba(16, 24, 40, 0.7)',
  borderRadius: '24px',
  boxShadow: `0 2px 16px 0 ${color}33`,
  border: `1.5px solid ${color}77`,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  marginBottom: '32px',
  padding: '32px',
});

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(circle at 50% 0%, #1e293b 60%, #0f172a 100%)', py: 8 }}>
      {/* HERO SECTION */}
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 10 }}>
        <Typography variant="h2" fontWeight={900} sx={{ color: '#22d3ee', mb: 2, textShadow: '0 0 16px #22d3ee, 0 0 32px #0ff', textAlign: 'center', fontSize: { xs: '2.5rem', md: '4.5rem' } }}>
          Healthy Living,<br />Tax Free
        </Typography>
        <Typography variant="h5" sx={{ color: '#c0fafe', mb: 5, fontWeight: 400, textAlign: 'center', maxWidth: 700 }}>
          Unlock your health potential and save money. Use your HSA/FSA funds to pay for your gym membership with a doctor-verified letter.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(90deg, #22d3ee 0%, #43e97b 100%)',
            color: '#0f172a',
            fontWeight: 700,
            fontSize: '1.25rem',
            px: 6,
            py: 2,
            borderRadius: '16px',
            boxShadow: '0 0 24px #22d3ee',
            mb: 4,
            '&:hover': {
              background: 'linear-gradient(90deg, #43e97b 0%, #22d3ee 100%)',
              color: '#0f172a',
            },
          }}
        >
          GET STARTED
        </Button>
      </Container>
      {/* STEPS SECTION */}
      <Container maxWidth="md">
        <Box>
          <Card sx={stepCardStyle('#22d3ee')}>
            <AddCircleOutlineIcon sx={{ fontSize: 48, color: '#22d3ee' }} />
            <CardContent>
              <Typography variant="h5" fontWeight={700} sx={{ color: '#22d3ee', mb: 1 }}>
                Step 1: Health Assessment
              </Typography>
              <Typography variant="body1" sx={{ color: '#c0fafe' }}>
                Complete a quick, secure health assessment to get started
              </Typography>
            </CardContent>
          </Card>
          <Card sx={stepCardStyle('#43e97b')}>
            <CheckCircleIcon sx={{ fontSize: 48, color: '#43e97b' }} />
            <CardContent>
              <Typography variant="h5" fontWeight={700} sx={{ color: '#43e97b', mb: 1 }}>
                Step 2: Doctor Letter
              </Typography>
              <Typography variant="body1" sx={{ color: '#c0fafe' }}>
                A doctor reviews your assessment and provides a Letter of Medical Necessity
              </Typography>
            </CardContent>
          </Card>
          <Card sx={stepCardStyle('#22d3ee')}>
            <CreditCardIcon sx={{ fontSize: 48, color: '#22d3ee' }} />
            <CardContent>
              <Typography variant="h5" fontWeight={700} sx={{ color: '#22d3ee', mb: 1 }}>
                Step 3: Use HSA/FSA
              </Typography>
              <Typography variant="body1" sx={{ color: '#c0fafe' }}>
                Submit your letter to your gym or insurance and pay with your HSA/FSA card.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
} 