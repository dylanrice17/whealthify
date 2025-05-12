import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'For Enterprise', path: '/enterprise' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export default function NavBar() {
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
          <Button color="inherit" sx={{ fontWeight: 600, mr: 1 }}>Login</Button>
          <Button color="inherit" sx={{ fontWeight: 600, border: '1px solid #fff', borderRadius: 2 }}>Enterprise Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 