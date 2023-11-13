const nodemailer = require('nodemailer');
const env = require("../config/environment");

// Nodemailer configuration (replace with your own SMTP details)
const transporter = nodemailer.createTransport(env.smtp);

const sendPdfByEmail = async(req, res) => {
  const email = req.query.email
  console.log(email)
  const pdf = req.file;

  console.log("*************")

  if (!pdf) {
    return res.status(400).json({
        success: false,
        message:'No PDF file uploaded'
    });
  }

  const mailOptions = {
    from: env.email,
    to: email,
    subject: 'E-Prescription',
    text: 'Your Prescription',
    attachments: [
      {
        filename: 'generated.pdf',
        content: pdf.buffer
      }
    ]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(201).json({
        success: true,
        message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
};

module.exports = {
  sendPdfByEmail
};