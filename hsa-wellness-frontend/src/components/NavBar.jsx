import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'For Enterprise', path: '/enterprise' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ background: 'rgba(16, 24, 40, 0.95)', boxShadow: 'none', mb: 4 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={700} sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#43e97b' }}>W</span>
            <span style={{
              background: 'linear-gradient(90deg, #2196f3 0%, #38f9d7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block',
              fontSize: 'inherit',
              fontWeight: 'inherit',
            }}>Health</span>
            <span style={{
              background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block',
              fontSize: 'inherit',
              fontWeight: 'inherit',
            }}>ify</span>
          </Typography>
          {menuItems.map((item) => (
            <Button key={item.label} color="inherit" sx={{ mx: 0.5, fontWeight: 600 }} href={item.path}>
              {item.label}
            </Button>
          ))}
        </Box>
        <Box>
          {user ? (
            <Button color="inherit" sx={{ fontWeight: 600, mr: 1 }} onClick={handleLogout}>Logout</Button>
          ) : (
            <Button color="inherit" sx={{ fontWeight: 600, mr: 1 }} onClick={() => navigate('/login')}>Login</Button>
          )}
          <Button color="inherit" sx={{ fontWeight: 600, border: '1px solid #fff', borderRadius: 2 }}>Enterprise Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 