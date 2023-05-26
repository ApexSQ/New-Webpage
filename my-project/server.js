const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const express = require('express');
const app = express();
const port = 3000;

// Set up your API endpoints and other server logic here

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.post('/send-email', (req, res) => {
    const { firstName, lastName, email, phone, address, creditCard, expiry, securityCode } = req.body;
  
    // Rest of your email sending logic using SendGrid
  
    res.send('Email sent successfully');
  });