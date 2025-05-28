const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -verificationToken -verificationTokenExpires');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error getting profile' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { heightFeet, heightInches, weight, dob, gender, state } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only allowed fields
    if (heightFeet !== undefined) user.heightFeet = heightFeet;
    if (heightInches !== undefined) user.heightInches = heightInches;
    if (weight !== undefined) user.weight = weight;
    if (dob !== undefined) user.dob = dob;
    if (gender !== undefined) user.gender = gender;
    if (state !== undefined) user.state = state;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
}; 