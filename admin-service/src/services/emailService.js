const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

const sendEmail = async (to, subject, text, from = 'your-email@gmail.com') => {
  const mailOptions = {
    from,
    to,
    subject,
    text
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };