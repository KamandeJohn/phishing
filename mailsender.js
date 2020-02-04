const sgMail = require('@sendgrid/mail');

sgMail.setApiKey("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");

const msg = {
  to: 'kamaajohn2015@gmail.com',
  from: 'info.kamandejohn@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);