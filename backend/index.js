const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dylanrice1995:xpOgiDm89uPfxPW1@whealthify.chbwilf.mongodb.net/?retryWrites=true&w=majority&appName=Whealthify')
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// You can add your Express app and routes below this line 