require('dotenv').config();

module.exports = {
  mongodbUri: process.env.MONGODB_URI || 'mongodb+srv://dylanrice1995:xpOgiDm89uPfxPW1@whealthify.chbwilf.mongodb.net/?retryWrites=true&w=majority&appName=Whealthify',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_here',
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  emailFrom: process.env.EMAIL_FROM,
  port: process.env.PORT || 5000
}; 