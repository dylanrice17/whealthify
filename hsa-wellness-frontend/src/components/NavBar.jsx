import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const updateLogin = () => setLoggedIn(!!localStorage.getItem('whealthify_last_user'));
    updateLogin();
    window.addEventListener('storage', updateLogin);
    window.addEventListener('whealthify-auth', updateLogin);
    return () => {
      window.removeEventListener('storage', updateLogin);
      window.removeEventListener('whealthify-auth', updateLogin);
    };
  }, []);

  // Also update login state on every route change
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('whealthify_last_user'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('whealthify_last_user');
    setLoggedIn(false);
    window.dispatchEvent(new Event('whealthify-auth'));
    navigate('/');
  };

  // DEV ONLY: Clear localStorage on first load to ensure no user is logged in
  if (process.env.NODE_ENV === 'development') {
    localStorage.removeItem('whealthify_last_user');
  }

  return (
    <AppBar position="static" sx={{ background: 'rgba(16, 24, 40, 0.95)', boxShadow: 'none', mb: 4 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={700} sx={{ mr: 3 }}>
            Whealthify
          </Typography>
          {menuItems.map((item) => (
            <Button key={item.label} color="inherit" sx={{ mx: 0.5, fontWeight: 600 }} href={item.path}>
              {item.label}
            </Button>
          ))}
        </Box>
        <Box>
          {loggedIn ? (
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