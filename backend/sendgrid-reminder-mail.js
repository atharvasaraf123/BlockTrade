const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SG_SENDGRID_API_KEY.toString());
sgMail.setSubstitutionWrappers('{{', '}}');
const sendReminderMail = async ({ mailCont }) => {
  const msg = {
    to: mailCont.email,
    from: 'karankangude17@gmail.com',
    text: 'Blocktrade',
    subject: 'Payment Reminder',
    html: `<h3>We kindly remind you about your payment to be done </h3>
           <p>Trade Id: <b>${mailCont.TradeId}</b></p>
           <p>Username: <b>${mailCont.username}</b></p>
           <p>Amount : <b>${mailCont.amount}</b></p>`,
    templateId: '386125ad-3200-4e32-b661-e95117039658',
    substitutions: {
      token: mailCont.token,
    },
  };
  console.log('Sending  reminder mail');
  await sgMail.send(msg);
  console.log('Mail sent');
};

module.exports = sendReminderMail;
