import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, TextField, Snackbar, Alert } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const benefits = [
  {
    icon: <GroupAddIcon sx={{ fontSize: 40, color: '#43e97b' }} />,
    title: 'Boost Employee Retention',
    desc: 'Show your team you care. Companies with wellness benefits see up to 40% higher retention rates.'
  },
  {
    icon: <BusinessCenterIcon sx={{ fontSize: 40, color: '#2196f3' }} />,
    title: 'Reduce HR Burden',
    desc: 'Automate compliance and documentation. No more paperwork or manual LMN processing.'
  },
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 40, color: '#43e97b' }} />,
    title: 'Effortless Compliance',
    desc: 'Instant, doctor-signed Letters of Medical Necessity for every employee—fully HSA/FSA compliant.'
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#2196f3' }} />,
    title: 'Wellness Engagement',
    desc: 'Drive participation in fitness and wellness programs with a seamless, digital experience.'
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 40, color: '#43e97b' }} />,
    title: 'Attract Top Talent',
    desc: 'Stand out in the job market with next-gen wellness benefits your competitors wish they had.'
  },
];

const logos = [
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
];

export default function Enterprise() {
  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [snackbar, setSnackbar] = useState(false);
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setSnackbar(true);
    setForm({ name: '', email: '', company: '' });
  };
  return (
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(circle at 60% 0%, #2196f3 60%, #43e97b 100%)', pb: 10 }}>
      {/* Hero Section */}
      <Box sx={{ pt: 10, pb: 8, textAlign: 'center', color: '#fff', position: 'relative' }}>
        <Typography variant="h2" fontWeight={900} sx={{ mb: 2, letterSpacing: 1, textShadow: '0 8px 40px #2196f3' }}>
          Whealthify for Enterprise
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, maxWidth: 700, mx: 'auto', color: '#e0f7fa', fontWeight: 500 }}>
          Unlock the future of employee wellness. Instantly deliver HSA/FSA-eligible fitness benefits and Letters of Medical Necessity—at scale, with zero paperwork.
        </Typography>
        <Button variant="contained" size="large" sx={{ fontWeight: 700, fontSize: 20, px: 6, py: 1.5, background: 'linear-gradient(90deg, #43e97b 0%, #2196f3 100%)', boxShadow: '0 2px 24px 0 rgba(33,150,243,0.18)' }} href="#demo">
          Request a Demo
        </Button>
        {/* Animated Gradient Circles */}
        <Box sx={{ position: 'absolute', top: -80, left: -120, width: 300, height: 300, background: 'radial-gradient(circle, #43e97b 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />
        <Box sx={{ position: 'absolute', bottom: -100, right: -100, width: 260, height: 260, background: 'radial-gradient(circle, #2196f3 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />
      </Box>
      {/* Logos/Trust Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, mb: 6, flexWrap: 'wrap', opacity: 0.85 }}>
        {logos.map((logo, i) => (
          <img key={i} src={logo} alt="logo" style={{ height: 38, filter: 'grayscale(1) brightness(1.2)' }} />
        ))}
      </Box>
      {/* Benefits Section */}
      <Grid container spacing={4} sx={{ maxWidth: 900, mx: 'auto', mb: 8, justifyContent: 'center' }}>
        {benefits.map((b, i) => (
          <Grid item xs={12} sm={6} md={6} key={b.title} display="flex" justifyContent="center">
            <Card sx={{ width: '100%', maxWidth: 370, background: 'rgba(255,255,255,0.10)', borderRadius: 5, boxShadow: '0 4px 32px 0 rgba(33,150,243,0.10)', backdropFilter: 'blur(8px)', p: 2, minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.04)', boxShadow: '0 8px 40px 0 rgba(67,233,123,0.18)' } }}>
              <CardContent sx={{ textAlign: 'center' }}>
                {b.icon}
                <Typography variant="h6" fontWeight={700} sx={{ mt: 2, mb: 1, color: '#fff' }}>{b.title}</Typography>
                <Typography sx={{ color: '#e0f7fa', fontWeight: 400 }}>{b.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Demo Request Form */}
      <Box id="demo" sx={{ maxWidth: 500, mx: 'auto', background: 'rgba(255,255,255,0.10)', borderRadius: 5, boxShadow: '0 4px 32px 0 rgba(33,150,243,0.10)', p: 5, textAlign: 'center', color: '#fff', mb: 8 }}>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 2, color: '#43e97b' }}>Request a Demo</Typography>
        <Typography sx={{ mb: 3, color: '#e0f7fa' }}>See how Whealthify can transform your company's wellness benefits. Fill out the form and our team will reach out within 24 hours.</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Your Name" name="name" value={form.name} onChange={handleChange} fullWidth required sx={{ mb: 2 }} InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} />
          <TextField label="Company Email" name="email" value={form.email} onChange={handleChange} fullWidth required sx={{ mb: 2 }} InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} />
          <TextField label="Company Name" name="company" value={form.company} onChange={handleChange} fullWidth required sx={{ mb: 3 }} InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} />
          <Button type="submit" variant="contained" size="large" sx={{ fontWeight: 700, background: 'linear-gradient(90deg, #43e97b 0%, #2196f3 100%)', color: '#fff', py: 1.2, fontSize: 18, boxShadow: '0 2px 12px 0 rgba(67,233,123,0.10)' }}>
            Request Demo
          </Button>
        </form>
        <Snackbar open={snackbar} autoHideDuration={4000} onClose={() => setSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={() => setSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            Thank you! Our team will reach out soon.
          </Alert>
        </Snackbar>
      </Box>
      {/* Footer/CTA */}
      <Box sx={{ textAlign: 'center', color: '#e0f7fa', fontWeight: 500, fontSize: 18, mt: 8 }}>
        <Typography variant="h6" sx={{ mb: 1, color: '#fff', fontWeight: 700 }}>Ready to revolutionize your company's wellness benefits?</Typography>
        <Button variant="contained" size="large" sx={{ fontWeight: 700, background: 'linear-gradient(90deg, #43e97b 0%, #2196f3 100%)', color: '#fff', py: 1.2, fontSize: 18, boxShadow: '0 2px 12px 0 rgba(67,233,123,0.10)' }} href="#demo">
          Get Started
        </Button>
      </Box>
    </Box>
  );
} 