import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // On mount, move latest assessment to user's completedAssessments
    const assessment = JSON.parse(localStorage.getItem('whealthify_latest_assessment') || 'null');
    if (!assessment) return;
    const lastUser = JSON.parse(localStorage.getItem('whealthify_last_user') || 'null');
    if (!lastUser) return;
    const users = JSON.parse(localStorage.getItem('whealthify_users') || '[]');
    const idx = users.findIndex(u => u.email === lastUser.email);
    if (idx !== -1) {
      const user = users[idx];
      user.completedAssessments = user.completedAssessments || [];
      user.completedAssessments.push(assessment);
      users[idx] = user;
      localStorage.setItem('whealthify_users', JSON.stringify(users));
      localStorage.setItem('whealthify_last_user', JSON.stringify(user));
    }
    localStorage.removeItem('whealthify_latest_assessment');
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 0%, #1e293b 60%, #0f172a 100%)' }}>
      <Box sx={{ width: 500, bgcolor: '#181c1f', borderRadius: 4, boxShadow: '0 8px 40px 0 rgba(0,0,0,0.45)', p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(67,233,123,0.08)', border: '2px solid #43e97b', borderRadius: 2, p: 2 }}>
            <CheckCircleIcon sx={{ color: '#43e97b', mr: 1 }} />
            <Typography sx={{ color: '#fff', fontWeight: 500 }}>
              Payment successful! Thank you.
            </Typography>
          </Box>
        </Box>
        <Typography align="center" sx={{ color: '#43e97b', fontWeight: 700, fontSize: 28, mb: 2 }}>
          Your Letter of Medical Necessity will be<br />
          reviewed by our doctor and will appear in<br />
          your Dashboard within 24 hours.
        </Typography>
        <Typography align="center" sx={{ color: '#b0bfcf', mb: 4 }}>
          You will receive a notification in your dashboard when your letter is ready.
        </Typography>
        <Button onClick={() => navigate('/dashboard')} variant="contained" sx={{ fontWeight: 700, fontSize: 18, bgcolor: '#333', color: '#fff', borderRadius: 2, px: 4, py: 1.2, boxShadow: '0 2px 12px 0 rgba(67,233,123,0.10)', '&:hover': { bgcolor: '#222' } }}>
          Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
} 