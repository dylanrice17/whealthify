import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Tabs, Tab, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const cardGradient = {
  background: 'linear-gradient(135deg, #2196f3 60%, #43e97b 100%)',
  borderRadius: 4,
  boxShadow: '0 8px 40px 0 rgba(33,150,243,0.18)',
  color: '#fff',
};

function getUsers() {
  return JSON.parse(localStorage.getItem('whealthify_users') || '[]');
}
function setUsers(users) {
  localStorage.setItem('whealthify_users', JSON.stringify(users));
}

export default function LoginSignup() {
  const [tab, setTab] = useState(0);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    const users = getUsers();
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    if (user) {
      localStorage.setItem('whealthify_last_user', JSON.stringify(user));
      setLoggedInUser(user);
      setSuccess(`Welcome, ${user.firstName} ${user.lastName}!`);
      window.dispatchEvent(new Event('whealthify-auth'));
    } else {
      setError('Invalid email or password.');
    }
  };

  // Handle Sign Up
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: signupFirstName,
          lastName: signupLastName,
          email: signupEmail,
          password: signupPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Account created! Please check your email to verify your account.');
        setTab(0);
        setSignupFirstName(''); setSignupLastName(''); setSignupEmail(''); setSignupPassword('');
      } else {
        setError(data.message || 'Signup failed.');
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  // Redirect to dashboard after login
  useEffect(() => {
    if (loggedInUser) {
      const timer = setTimeout(() => navigate('/dashboard'), 1200);
      return () => clearTimeout(timer);
    }
  }, [loggedInUser, navigate]);

  return (
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(circle at 50% 0%, #1e293b 60%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ minWidth: 350, maxWidth: 400, mx: 'auto', ...cardGradient }}>
        <CardContent>
          <Tabs value={tab} onChange={(_, v) => { setTab(v); setError(''); setSuccess(''); }} centered sx={{ mb: 3, '& .MuiTab-root': { color: '#fff' }, '& .Mui-selected': { color: '#fff', fontWeight: 700 } }}>
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          {loggedInUser ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" fontWeight={700} sx={{ color: '#fff' }}>Welcome, {loggedInUser.firstName} {loggedInUser.lastName}!</Typography>
              <Typography sx={{ color: '#fff', mt: 1 }}>You are now logged in.</Typography>
            </Box>
          ) : tab === 0 ? (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleLogin}>
              <Typography variant="h6" fontWeight={700} align="center" sx={{ color: '#fff' }}>Login to Whealthify</Typography>
              <TextField label="Email" type="email" variant="outlined" fullWidth required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#43e97b' } } }} />
              <TextField label="Password" type="password" variant="outlined" fullWidth required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#43e97b' } } }} />
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: 700, background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)' }} type="submit">Login</Button>
            </Box>
          ) : (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSignup}>
              <Typography variant="h6" fontWeight={700} align="center" sx={{ color: '#fff' }}>Sign Up for Whealthify</Typography>
              <TextField label="First Name" variant="outlined" fullWidth required value={signupFirstName} onChange={e => setSignupFirstName(e.target.value)} InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#43e97b' } } }} />
              <TextField label="Last Name" variant="outlined" fullWidth required value={signupLastName} onChange={e => setSignupLastName(e.target.value)} InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#43e97b' } } }} />
              <TextField label="Email" type="email" variant="outlined" fullWidth required value={signupEmail} onChange={e => setSignupEmail(e.target.value)} InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#43e97b' } } }} />
              <TextField label="Password" type="password" variant="outlined" fullWidth required value={signupPassword} onChange={e => setSignupPassword(e.target.value)} InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#43e97b' } } }} />
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: 700, background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)' }} type="submit">Sign Up</Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
} 