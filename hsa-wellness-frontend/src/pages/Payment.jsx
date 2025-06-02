import React from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 0%, #1e293b 60%, #0f172a 100%)' }}>
      <Box sx={{ width: 400, bgcolor: '#181c1f', borderRadius: 4, boxShadow: '0 8px 40px 0 rgba(0,0,0,0.45)', p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight={700} align="center" sx={{ mb: 2, color: '#fff' }}>
          Almost There!
        </Typography>
        <Typography align="center" sx={{ color: '#b0bfcf', mb: 2 }}>
          After checkout, a doctor will review your health assessment and provide your Letter of Medical Necessity within 24 hours. If the doctor determines you are ineligible, you'll be automatically refunded.
        </Typography>
        <Typography align="center" sx={{ color: '#43e97b', fontWeight: 700, fontSize: 24, mb: 3 }}>
          $50.00
        </Typography>
        <TextField label="Name on Card" variant="standard" fullWidth sx={{ mb: 2, input: { color: '#fff' }, label: { color: '#b0bfcf' } }} InputLabelProps={{ style: { color: '#b0bfcf' } }} InputProps={{ style: { color: '#fff' } }} />
        <TextField label="Card Number" variant="standard" fullWidth sx={{ mb: 2, input: { color: '#fff' }, label: { color: '#b0bfcf' } }} InputLabelProps={{ style: { color: '#b0bfcf' } }} InputProps={{ style: { color: '#fff' } }} />
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <TextField label="MM/YY" variant="standard" fullWidth InputLabelProps={{ style: { color: '#b0bfcf' } }} InputProps={{ style: { color: '#fff' } }} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="CVC" variant="standard" fullWidth InputLabelProps={{ style: { color: '#b0bfcf' } }} InputProps={{ style: { color: '#fff' } }} />
          </Grid>
        </Grid>
        <Button variant="contained" fullWidth sx={{ fontWeight: 700, background: 'linear-gradient(90deg, #43e97b 0%, #2196f3 100%)', color: '#fff', py: 1.2, fontSize: 16, boxShadow: '0 2px 12px 0 rgba(67,233,123,0.10)' }} onClick={() => navigate('/payment-success')}>
          Checkout
        </Button>
      </Box>
    </Box>
  );
} 