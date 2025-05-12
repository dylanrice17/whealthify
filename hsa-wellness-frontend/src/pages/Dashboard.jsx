import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, TextField, Button, MenuItem, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TableChartIcon from '@mui/icons-material/TableChart';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

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
  const [editMode, setEditMode] = useState(false);

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

function HealthAssessment({ user }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    heightFeet: user?.heightFeet || '',
    heightInches: user?.heightInches || '',
    weight: user?.weight || '',
    diagnoses: [],
    symptoms: [],
    exercise: '',
    interest: '',
  });
  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      heightFeet: user?.heightFeet || '',
      heightInches: user?.heightInches || '',
      weight: user?.weight || '',
    }));
    // Load completed assessments from user
    if (user && user.completedAssessments) {
      setCompleted(user.completedAssessments);
    } else {
      setCompleted([]);
    }
  }, [user]);

  const diagnosisOptions = [
    'Obesity',
    'Hypertension',
    'Depression',
    'Anxiety',
    'Diabetes',
    'None',
  ];
  const symptomOptions = [
    'Low mood',
    'Fatigue',
    'High blood pressure',
    'Trouble sleeping',
    'None',
  ];
  const exerciseOptions = [
    '0 days',
    '1-2 days',
    '3-4 days',
    '5+ days',
  ];

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleCheck = (name, value) => {
    setForm(f => {
      const arr = f[name];
      if (arr.includes(value)) {
        return { ...f, [name]: arr.filter(v => v !== value) };
      } else {
        return { ...f, [name]: value === 'None' ? ['None'] : arr.filter(v => v !== 'None').concat(value) };
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Calculate BMI
    const h = Number(form.heightFeet) * 12 + Number(form.heightInches);
    const w = Number(form.weight);
    const bmi = h > 0 ? (w / (h * h)) * 703 : 0;
    // Determine possible qualifying conditions
    const qualifying = [];
    if (form.diagnoses.includes('Obesity') || bmi >= 30) qualifying.push('Obesity');
    if (form.diagnoses.includes('Hypertension') || form.symptoms.includes('High blood pressure')) qualifying.push('Hypertension');
    if (form.diagnoses.includes('Depression') || form.symptoms.includes('Low mood')) qualifying.push('Depression');
    if (form.diagnoses.includes('Anxiety')) qualifying.push('Anxiety');
    // Save latest assessment to localStorage
    const assessment = {
      date: new Date().toISOString(),
      bmi: bmi.toFixed(1),
      qualifying,
      form: { ...form },
    };
    localStorage.setItem('whealthify_latest_assessment', JSON.stringify(assessment));
    // Instead of showing result, navigate to payment
    navigate('/payment');
  };

  const handleDownloadPDF = (assessment, idx) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Health Assessment Summary', 14, 20);
    doc.setFontSize(12);
    doc.text(`Assessment #${idx + 1}`, 14, 32);
    doc.text(`Date: ${new Date(assessment.date).toLocaleString()}`, 14, 40);
    doc.text(`BMI: ${assessment.bmi}`, 14, 48);
    doc.text(`Qualifying Conditions: ${assessment.qualifying && assessment.qualifying.length > 0 ? assessment.qualifying.join(', ') : 'None'}`, 14, 56);
    doc.text('Answers:', 14, 66);
    let y = 74;
    Object.entries(assessment.form).forEach(([key, value]) => {
      let val = Array.isArray(value) ? value.join(', ') : value;
      doc.text(`${key}: ${val}`, 16, y);
      y += 8;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save(`health_assessment_${idx + 1}.pdf`);
  };

  if (result) {
    return (
      <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', background: 'linear-gradient(135deg, #2196f3 60%, #43e97b 100%)', borderRadius: 4, boxShadow: '0 8px 40px 0 rgba(33,150,243,0.18)', p: 4, color: '#fff', textAlign: 'center' }}>
        <CheckCircleIcon sx={{ fontSize: 48, color: '#43e97b', mb: 1 }} />
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Assessment Complete</Typography>
        <Typography sx={{ mb: 2 }}>Your calculated BMI: <b>{result.bmi}</b></Typography>
        {result.qualifying.length > 0 ? (
          <Typography sx={{ mb: 2 }}>
            <b>You may qualify for a letter of medical necessity for:</b><br />
            {result.qualifying.join(', ')}
          </Typography>
        ) : (
          <Typography sx={{ mb: 2 }}>No qualifying conditions detected based on your answers.</Typography>
        )}
        <Button variant="contained" sx={{ mt: 2, fontWeight: 700, background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)' }} onClick={() => setResult(null)}>Retake Assessment</Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mb: 4 }}>
        <Box sx={{ background: 'linear-gradient(135deg, #232526 60%, #43e97b 100%)', borderRadius: 4, boxShadow: '0 4px 24px 0 rgba(33,150,243,0.10)', p: 3, color: '#fff', mb: 2, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: '0 0 24px 4px #43e97b' } }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: '#43e97b' }}>
            My Completed Health Assessments
          </Typography>
          {completed.length === 0 ? (
            <Typography sx={{ color: '#b0bfcf' }}>
              No completed assessments yet.<br />
              Your completed health assessments will appear here as downloadable PDFs after you submit payment.
            </Typography>
          ) : (
            <Box>
              {completed.map((a, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(33,150,243,0.10)', borderRadius: 2, p: 2, mb: 1 }}>
                  <Box>
                    <Typography sx={{ color: '#fff', fontWeight: 600 }}>Assessment {i + 1}</Typography>
                    <Typography sx={{ color: '#b0bfcf', fontSize: 14 }}>Date: {new Date(a.date).toLocaleString()}</Typography>
                    <Typography sx={{ color: '#b0bfcf', fontSize: 14 }}>BMI: {a.bmi}</Typography>
                    <Typography sx={{ color: '#b0bfcf', fontSize: 14 }}>Qualifying: {a.qualifying && a.qualifying.length > 0 ? a.qualifying.join(', ') : 'None'}</Typography>
                  </Box>
                  <Button variant="outlined" sx={{ color: '#43e97b', borderColor: '#43e97b', fontWeight: 700 }} onClick={() => handleDownloadPDF(a, i)}>Download PDF</Button>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        {!showForm && (
          <Box onClick={() => setShowForm(true)} sx={{ cursor: 'pointer', background: 'linear-gradient(90deg, #2196f3 60%, #43e97b 100%)', borderRadius: 4, boxShadow: '0 2px 12px 0 rgba(33,150,243,0.10)', p: 3, color: '#fff', textAlign: 'center', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: '0 0 24px 4px #43e97b' }, fontWeight: 700, fontSize: 20 }}>
            + Begin New Health Assessment
          </Box>
        )}
      </Box>
      {showForm && (
        <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', background: 'linear-gradient(135deg, #2196f3 60%, #43e97b 100%)', borderRadius: 4, boxShadow: '0 8px 40px 0 rgba(33,150,243,0.18)', p: 4, color: '#fff' }}>
          <Typography variant="h5" fontWeight={700} align="center" sx={{ mb: 2, color: '#fff' }}>
            Health Assessment
          </Typography>
          <form onSubmit={handleSubmit}>
            <Typography sx={{ mb: 1, color: '#b2f5ea' }}>Height & Weight (from profile)</Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField label="Height (feet)" name="heightFeet" value={form.heightFeet} fullWidth InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' }, readOnly: true }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' } } }} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Height (inches)" name="heightInches" value={form.heightInches} fullWidth InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' }, readOnly: true }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' } } }} />
              </Grid>
            </Grid>
            <TextField label="Weight (lbs)" name="weight" value={form.weight} fullWidth margin="normal" InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' }, readOnly: true }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' } } }} />
            <Typography sx={{ mt: 2, mb: 1, color: '#b2f5ea' }}>Have you been diagnosed with any of the following?</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {diagnosisOptions.map(opt => (
                <Button key={opt} variant={form.diagnoses.includes(opt) ? 'contained' : 'outlined'} onClick={e => { e.preventDefault(); handleCheck('diagnoses', opt); }} sx={{ color: '#fff', borderColor: '#fff', background: form.diagnoses.includes(opt) ? 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)' : 'none', fontWeight: 600 }}>{opt}</Button>
              ))}
            </Box>
            <Typography sx={{ mt: 2, mb: 1, color: '#b2f5ea' }}>Do you experience any of the following?</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {symptomOptions.map(opt => (
                <Button key={opt} variant={form.symptoms.includes(opt) ? 'contained' : 'outlined'} onClick={e => { e.preventDefault(); handleCheck('symptoms', opt); }} sx={{ color: '#fff', borderColor: '#fff', background: form.symptoms.includes(opt) ? 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)' : 'none', fontWeight: 600 }}>{opt}</Button>
              ))}
            </Box>
            <Typography sx={{ mt: 2, mb: 1, color: '#b2f5ea', fontWeight: 600 }}>
              How often do you exercise per week?
            </Typography>
            <TextField select label="How often do you exercise per week?" name="exercise" value={form.exercise} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ style: { color: '#fff' } }} InputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' } } }}>
              {exerciseOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
            <Typography sx={{ mt: 3, mb: 1, color: '#b2f5ea', fontWeight: 600 }}>
              Are you interested in improving your physical or mental health through exercise?
            </Typography>
            <TextField select label="Are you interested in improving your physical or mental health through exercise?" name="interest" value={form.interest} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ style: { color: '#fff', whiteSpace: 'normal', lineHeight: 1.2 } }} InputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' } }, '& label': { whiteSpace: 'normal', lineHeight: 1.2 }, minHeight: 56 }}>
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 3, fontWeight: 700, background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)' }} type="submit">Submit Assessment</Button>
          </form>
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
  } else if (selected === 'My Health Assessments') {
    mainContent = <HealthAssessment user={user} />;
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