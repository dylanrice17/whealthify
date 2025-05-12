import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, TextField, Button, MenuItem, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TableChartIcon from '@mui/icons-material/TableChart';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';

const sidebarItems = [
  {
    label: 'Profile',
    icon: <AccountCircleIcon sx={{ color: '#43e97b' }} />,
  },
  {
    label: 'My Health Assessments',
    icon: <TableChartIcon sx={{ color: '#2196f3' }} />,
  },
  {
    label: 'My Letters of Medical Necessity',
    icon: <DescriptionIcon sx={{ color: '#43e97b' }} />,
  },
];

function getCurrentUser() {
  const lastUser = JSON.parse(localStorage.getItem('whealthify_last_user') || 'null');
  return lastUser;
}
function updateCurrentUserProfile(profile) {
  const users = JSON.parse(localStorage.getItem('whealthify_users') || '[]');
  const lastUser = JSON.parse(localStorage.getItem('whealthify_last_user') || 'null');
  if (!lastUser) return;
  const idx = users.findIndex(u => u.email === lastUser.email);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...profile };
    localStorage.setItem('whealthify_users', JSON.stringify(users));
    localStorage.setItem('whealthify_last_user', JSON.stringify(users[idx]));
  }
}

const genderOptions = [
  { value: '', label: 'Select Gender' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

function ProfileForm({ user }) {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    heightFeet: user?.heightFeet || '',
    heightInches: user?.heightInches || '',
    weight: user?.weight || '',
    dob: user?.dob || '',
    gender: user?.gender || '',
  });
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    setForm(f => ({ ...f, name: user?.name || '', email: user?.email || '' }));
  }, [user]);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateCurrentUserProfile(form);
    setSuccess('Profile updated!');
    setEditMode(false);
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', background: 'linear-gradient(135deg, #2196f3 60%, #43e97b 100%)', borderRadius: 4, boxShadow: '0 8px 40px 0 rgba(33,150,243,0.18)', p: 4, color: '#fff', position: 'relative' }}>
      <Typography variant="h5" fontWeight={700} align="center" sx={{ mb: 2, color: '#fff' }}>
        My Profile
      </Typography>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <TextField label="Name" name="name" value={form.name} fullWidth margin="normal" InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' }, readOnly: true }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#43e97b' } } }} />
          <TextField label="Email" name="email" value={form.email} fullWidth margin="normal" InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' }, readOnly: true }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#43e97b' } } }} />
          <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
            <Grid item xs={6}>
              <TextField label="Height (feet)" name="heightFeet" value={form.heightFeet} onChange={handleChange} fullWidth type="number" InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#43e97b' } } }} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Height (inches)" name="heightInches" value={form.heightInches} onChange={handleChange} fullWidth type="number" InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#43e97b' } } }} />
            </Grid>
          </Grid>
          <TextField label="Weight (lbs)" name="weight" value={form.weight} onChange={handleChange} fullWidth margin="normal" type="number" InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#43e97b' } } }} />
          <TextField label="Date of Birth" name="dob" value={form.dob} onChange={handleChange} fullWidth margin="normal" type="date" InputLabelProps={{ style: { color: '#fff' }, shrink: true }} InputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#43e97b' } } }} />
          <TextField select label="Gender" name="gender" value={form.gender} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#43e97b' } } }}>
            {genderOptions.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
          </TextField>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: 700, background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)' }} type="submit">Save</Button>
          {success && <Typography align="center" sx={{ mt: 2, color: '#fff', fontWeight: 600 }}>{success}</Typography>}
        </form>
      ) : (
        <Box>
          <Button onClick={() => setEditMode(true)} sx={{ position: 'absolute', top: 16, right: 16, color: '#fff', minWidth: 0, p: 1 }}><EditIcon /></Button>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#b2f5ea' }}>Name</Typography>
            <Typography variant="body1" fontWeight={600}>{form.name}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#b2f5ea' }}>Email</Typography>
            <Typography variant="body1" fontWeight={600}>{form.email}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#b2f5ea' }}>Height</Typography>
            <Typography variant="body1" fontWeight={600}>{form.heightFeet} ft {form.heightInches} in</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#b2f5ea' }}>Weight</Typography>
            <Typography variant="body1" fontWeight={600}>{form.weight} lbs</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#b2f5ea' }}>Date of Birth</Typography>
            <Typography variant="body1" fontWeight={600}>{form.dob}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#b2f5ea' }}>Gender</Typography>
            <Typography variant="body1" fontWeight={600}>{form.gender ? (form.gender.charAt(0).toUpperCase() + form.gender.slice(1)) : ''}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default function Dashboard() {
  const [firstName, setFirstName] = useState('');
  const [selected, setSelected] = useState('Profile');
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const lastUser = getCurrentUser();
    if (lastUser && lastUser.name) {
      setFirstName(lastUser.name.split(' ')[0]);
      setUser(lastUser);
    }
  }, []);

  let mainContent;
  if (selected === 'Profile') {
    mainContent = <ProfileForm user={user} />;
  } else {
    mainContent = (
      <Box sx={{ width: '100%', maxWidth: 800, mt: 4, p: 4, borderRadius: 4, background: 'rgba(33,150,243,0.10)', color: '#fff', textAlign: 'center' }}>
        <Typography variant="h6" fontWeight={500}>
          Select an option from the sidebar to get started.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'radial-gradient(circle at 50% 0%, #1e293b 60%, #0f172a 100%)' }}>
      {/* Sidebar */}
      <Box sx={{ width: 250, background: 'rgba(16, 24, 40, 0.98)', color: '#fff', py: 4, px: 2, display: 'flex', flexDirection: 'column', minHeight: '100vh', boxShadow: '2px 0 16px 0 rgba(33,150,243,0.10)' }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 4, textAlign: 'center', letterSpacing: 1, color: '#43e97b' }}>
          Dashboard
        </Typography>
        <Divider sx={{ mb: 2, background: 'rgba(255,255,255,0.08)' }} />
        <List>
          {sidebarItems.map((item, idx) => (
            <ListItem button key={item.label} selected={selected === item.label} onClick={() => setSelected(item.label)} sx={{ borderRadius: 2, mb: 1, '&:hover': { background: 'rgba(67,233,123,0.08)' }, background: selected === item.label ? 'rgba(67,233,123,0.12)' : 'none' }}>
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, color: '#fff' }} />
            </ListItem>
          ))}
        </List>
      </Box>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: { xs: 2, md: 6 }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Typography variant="h3" fontWeight={700} sx={{ color: '#fff', mb: 4, mt: 2, textShadow: '0 4px 24px #2196f3' }}>
          {firstName ? `Welcome to Whealthify, ${firstName}!` : 'Welcome to Whealthify!'}
        </Typography>
        {mainContent}
      </Box>
    </Box>
  );
} 