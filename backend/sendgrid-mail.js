const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SG_SENDGRID_API_KEY.toString());
sgMail.setSubstitutionWrappers('{{', '}}');
const sendMail = async (mailCont) => {
  const msg = {
    to: mailCont.email,
    from: 'karankangude17@gmail.com',
    text: 'Blocktrade',
    subject: 'Account Activation',
    html: '<p></p>',
    templateId: 'be8c31a3-5a95-4bcb-8917-d9f5290f46fb',
    substitutions: {
      token: mailCont.token,
    },
  };
  console.log('Sending mail');
  await sgMail.send(msg);
  console.log('Mail sent');
};

module.exports = sendMail;
