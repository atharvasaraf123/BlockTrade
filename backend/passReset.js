const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SG_SENDGRID_API_KEY.toString());
sgMail.setSubstitutionWrappers('{{', '}}');
const sendResetMail = async (mailCont) => {
  const msg = {
    to: mailCont.email,
    from: 'karankangude17@gmail.com',
    text: 'Blocktrade',
    subject: 'Reset Password',
    html: `<p>Click on link to reset your password. ${mailCont.token}</p>`,
  };
  console.log('Send mail');
  await sgMail.send(msg);
  console.log('Mail sent');
};

module.exports = sendResetMail;
