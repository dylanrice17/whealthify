import React, { useRef, useEffect, useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Avatar, Divider, Alert, Grid } from '@mui/material';
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

function ParallaxStepCard({ icon, title, description, gradient, small }) {
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
        borderRadius: '20px',
        boxShadow: hovered
          ? '0 0 24px 4px rgba(67,233,123,0.18), 0 4px 20px 0 rgba(33,150,243,0.12)'
          : '0 4px 20px 0 rgba(33,150,243,0.12)',
        color: '#fff',
        mb: 2,
        maxWidth: small ? 260 : 700,
        minWidth: small ? 200 : undefined,
        mx: 'auto',
        transform: `scale(${scale})`,
        transition: 'transform 0.35s cubic-bezier(.23,1.01,.32,1), box-shadow 0.4s',
        cursor: 'pointer',
        p: small ? 1 : 2,
      }}
    >
      <CardContent sx={{ p: small ? 1 : 2 }}>
        <Box sx={{ fontSize: small ? 32 : 48, mb: 1 }}>{icon}</Box>
        <Typography variant={small ? 'subtitle1' : 'h5'} fontWeight={700} gutterBottom>{title}</Typography>
        <Typography variant={small ? 'body2' : 'body1'}>{description}</Typography>
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

  const videoUrls = [
    "https://storage.googleapis.com/whealthify_videos/3125907-uhd_3840_2160_25fps.mp4",
    "https://storage.googleapis.com/whealthify_videos/4325585-uhd_4096_2160_25fps.mp4",
    "https://storage.googleapis.com/whealthify_videos/7521693-hd_1920_1080_25fps.mp4"
  ];
  const [videoSrc, setVideoSrc] = useState(videoUrls[0]);
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      let videoIndex = 0;
      if (scrollProgress < 1 / 3) {
        videoIndex = 0;
      } else if (scrollProgress < 2 / 3) {
        videoIndex = 1;
      } else {
        videoIndex = 2;
      }
      setVideoSrc(videoUrls[videoIndex]);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Fixed background video for the whole page */}
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
          transition: 'opacity 0.5s',
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay for darkening the video */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%)', zIndex: 1, pointerEvents: 'none' }} />
      <Box sx={{ position: 'relative', zIndex: 2, minHeight: '100vh', py: 8 }}>
        {/* Hero Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: '#fff', px: 4, mb: 6 }}>
          <Typography variant="h2" fontWeight={900} gutterBottom>
            Healthy Living, Tax Free
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, maxWidth: 800 }}>
            Unlock your health potential and save money. Use your HSA/FSA funds to pay for your gym membership with a doctor-approved medical necessity letter.
          </Typography>
          <Button variant="contained" size="large" sx={{ background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', color: '#fff', fontWeight: 700, fontSize: 20, px: 5, py: 1.5, boxShadow: '0 2px 12px 0 rgba(67,233,123,0.10)' }} href="/login">
            Get Started
          </Button>
        </Box>

        <Box sx={{ mt: 0 }}>
          <Grid container spacing={4} sx={{ maxWidth: 900, mx: 'auto', mb: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Grid item xs={12} sm={4} md={4} key="step1" display="flex" justifyContent="center" ref={step1Ref} sx={{ mx: 1 }}>
              <ParallaxStepCard
                icon={<FitnessCenterIcon fontSize="inherit" />}
                title="Step 1: Health Assessment"
                description="Complete a quick, secure health assessment to get started."
                gradient="linear-gradient(135deg, #2196f3 60%, #38f9d7 100%)"
                small
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} key="step2" display="flex" justifyContent="center" ref={step2Ref} sx={{ mx: 1 }}>
              <ParallaxStepCard
                icon={<CheckCircleIcon fontSize="inherit" />}
                title="Step 2: Doctor Letter"
                description="Receive a letter of medical necessity from a doctor within 24 hours."
                gradient="linear-gradient(135deg, #43e97b 60%, #38f9d7 100%)"
                small
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} key="step3" display="flex" justifyContent="center" ref={step3Ref} sx={{ mx: 1 }}>
              <ParallaxStepCard
                icon={<CreditCardIcon fontSize="inherit" />}
                title="Step 3: Use HSA/FSA"
                description="Submit your letter to your gym or insurance and pay with your HSA/FSA card."
                gradient="linear-gradient(135deg, #2196f3 60%, #43e97b 100%)"
                small
              />
            </Grid>
          </Grid>
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
    </>
  );
} 