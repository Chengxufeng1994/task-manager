const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY =
  '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';

sgMail.setApiKey(SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email, // Change to your recipient
    from: 'bennycheng@ns-guard.com', // Change to your verified sender
    subject: 'Thanks for joining in',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('[Email sent]');
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendCancelEmail = (email, name) => {
  const msg = {
    to: email, // Change to your recipient
    from: 'bennycheng@ns-guard.com', // Change to your verified sender
    subject: 'Sorry to see you go!',
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('[Email sent]');
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
