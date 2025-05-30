import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, TextField, Button, MenuItem, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TableChartIcon from '@mui/icons-material/TableChart';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

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

function ProfileSection() {
  const { user } = useAuth();
  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', background: 'linear-gradient(135deg, #2196f3 60%, #43e97b 100%)', borderRadius: 4, boxShadow: '0 8px 40px 0 rgba(33,150,243,0.18)', p: 4, color: '#fff', position: 'relative', mt: 2 }}>
      <Typography variant="h5" fontWeight={700} align="center" sx={{ mb: 2, color: '#fff' }}>
        My Profile
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ color: '#b2f5ea' }}>First Name</Typography>
        <Typography variant="body1" fontWeight={600}>{user?.firstName || ''}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ color: '#b2f5ea' }}>Last Name</Typography>
        <Typography variant="body1" fontWeight={600}>{user?.lastName || ''}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ color: '#b2f5ea' }}>Email</Typography>
        <Typography variant="body1" fontWeight={600}>{user?.email || ''}</Typography>
      </Box>
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
                  <Button variant="outlined" sx={{ color: '#43e97b', borderColor: '#43e97b', fontWeight: 700 }} disabled>Download PDF</Button>
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
    if (lastUser && lastUser.firstName) {
      setFirstName(lastUser.firstName);
      setUser(lastUser);
    }
  }, []);

  let mainContent;
  if (selected === 'Profile') {
    mainContent = <ProfileSection />;
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