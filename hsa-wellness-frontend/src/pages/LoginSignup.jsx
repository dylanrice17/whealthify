import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Tabs, Tab, Typography, TextField, Button, Alert, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const stateOptions = [
  { value: '', label: 'Select State' },
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

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
  const [signupState, setSignupState] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        const user = {
          ...data.user,
          token: data.token
        };
        localStorage.setItem('whealthify_last_user', JSON.stringify(user));
        setLoggedInUser(user);
        setSuccess(`Welcome, ${user.firstName} ${user.lastName}!`);
        window.dispatchEvent(new Event('whealthify-auth'));
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
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
          state: signupState,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Account created! Please check your email to verify your account.');
        setTab(0);
        setSignupFirstName(''); setSignupLastName(''); setSignupEmail(''); setSignupPassword(''); setSignupState('');
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
              <TextField select label="State" variant="outlined" fullWidth required value={signupState} onChange={e => setSignupState(e.target.value)} InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#43e97b' } } }}>
                {stateOptions.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
              </TextField>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: 700, background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)' }} type="submit">Sign Up</Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
} 