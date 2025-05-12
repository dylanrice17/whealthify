import React, { useRef, useEffect, useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Avatar, Divider, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const gradientBox = {
  background: 'linear-gradient(135deg, #2196f3 60%, #43e97b 100%)',
  borderRadius: '24px',
  boxShadow: '0 4px 32px 0 rgba(33,150,243,0.2)',
  p: 4,
  mb: 6,
  color: '#fff',
  maxWidth: 600,
  mx: 'auto',
  textAlign: 'center',
};

function ParallaxStepCard({ icon, title, description, gradient }) {
  const ref = useRef();
  const [scale, setScale] = useState(1);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const cardCenter = rect.top + rect.height / 2;
      const windowCenter = windowHeight / 2;
      const distance = Math.abs(cardCenter - windowCenter);
      const maxDistance = windowHeight / 2 + rect.height / 2;
      // Scale: 1.12 at center, 1 at farthest
      const newScale = 1 + 0.12 * (1 - Math.min(distance / maxDistance, 1));
      setScale(newScale);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <Card
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        background: gradient,
        borderRadius: '24px',
        boxShadow: hovered
          ? '0 0 32px 8px rgba(67,233,123,0.25), 0 8px 40px 0 rgba(33,150,243,0.18)'
          : '0 8px 40px 0 rgba(33,150,243,0.18)',
        color: '#fff',
        mb: 4,
        maxWidth: 700,
        mx: 'auto',
        transform: `scale(${scale})`,
        transition: 'transform 0.35s cubic-bezier(.23,1.01,.32,1), box-shadow 0.4s',
        cursor: 'pointer',
      }}
    >
      <CardContent>
        <Box sx={{ fontSize: 48, mb: 1 }}>{icon}</Box>
        <Typography variant="h5" fontWeight={700} gutterBottom>{title}</Typography>
        <Typography variant="body1">{description}</Typography>
      </CardContent>
    </Card>
  );
}

const testimonials = [
  {
    name: 'Alex R.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: '"I saved over $300 this year by using my HSA for my gym membership. The process was so easy!"',
    bg: 'rgba(33, 150, 243, 0.15)'
  },
  {
    name: 'Maria S.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: '"I never knew I could use my FSA for fitness. This site made it possible and super quick."',
    bg: 'rgba(67, 233, 123, 0.15)'
  },
  {
    name: 'James T.',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    text: '"The medical letter was accepted by my gym and insurance with no issues. Highly recommend!"',
    bg: 'rgba(33, 150, 243, 0.15)'
  }
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(circle at 50% 0%, #1e293b 60%, #0f172a 100%)', py: 8 }}>
      <Box sx={gradientBox}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Healthy Living, Tax Free
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Unlock your health potential and save money. Use your HSA/FSA funds to pay for your gym membership with a doctor-approved medical necessity letter.
        </Typography>
        <Button variant="contained" size="large" sx={{ background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', color: '#fff', fontWeight: 700 }} onClick={() => navigate('/login')}>
          Get Started
        </Button>
      </Box>

      <Box sx={{ mt: 8 }}>
        <ParallaxStepCard
          icon={<FitnessCenterIcon fontSize="inherit" />}
          title="Step 1: Health Assessment"
          description="Complete a quick, secure health assessment to get started."
          gradient="linear-gradient(135deg, #2196f3 60%, #38f9d7 100%)"
        />
        <ParallaxStepCard
          icon={<CheckCircleIcon fontSize="inherit" />}
          title="Step 2: Doctor Letter"
          description="Instantly generate a medical necessity letter for your gym membership."
          gradient="linear-gradient(135deg, #43e97b 60%, #38f9d7 100%)"
        />
        <ParallaxStepCard
          icon={<CreditCardIcon fontSize="inherit" />}
          title="Step 3: Use HSA/FSA"
          description="Submit your letter to your gym or insurance and pay with your HSA/FSA card."
          gradient="linear-gradient(135deg, #2196f3 60%, #43e97b 100%)"
        />
      </Box>

      <Divider sx={{ my: 6, background: 'rgba(255,255,255,0.08)' }} />

      <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center', mb: 6 }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#fff', mb: 1 }}>
          Why choose us?
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          Fast, secure, and designed for your health and financial freedom. No more paperwork, no more hassle—just healthy living, tax free.
        </Typography>
      </Box>

      <Typography variant="h4" fontWeight={700} align="center" sx={{ color: '#fff', mb: 4 }}>
        What Our Users Say
      </Typography>
      <Box sx={{ maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4, mb: 6 }}>
        {testimonials.map((t, i) => (
          <Card key={i} sx={{ background: t.bg, borderRadius: '20px', boxShadow: '0 2px 16px 0 rgba(33,150,243,0.10)', px: 3, py: 2 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar src={t.avatar} alt={t.name} sx={{ width: 64, height: 64, mb: 1.5 }} />
              <Typography variant="h6" fontWeight={700} sx={{ color: '#fff', mb: 1 }}>{t.name}</Typography>
              <Typography variant="body1" sx={{ color: '#fff', fontStyle: 'italic' }}>{t.text}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Notice Box */}
      <Box sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
        <Card sx={{ background: 'rgba(30,41,59,0.95)', borderLeft: '6px solid #ff9800', borderRadius: '16px', boxShadow: '0 2px 16px 0 rgba(255,168,0,0.10)', px: 3, py: 2, display: 'flex', alignItems: 'center' }}>
          <WarningAmberIcon sx={{ color: '#ff9800', fontSize: 32, mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#fff', display: 'inline' }}>Notice: </Typography>
            <Typography variant="body2" sx={{ color: '#fff', display: 'inline' }}>
              This application is in development and not yet HIPAA compliant. Do not enter real patient information.
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  );
} 