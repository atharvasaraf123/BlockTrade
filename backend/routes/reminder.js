const express = require('express');
const router = express.Router();
const User = require('../models/User');
const dotenv = require('dotenv');
const sendReminderMail = require('../sendgrid-reminder-mail');
const auth = require('../middleware/auth');
const Trade = require('../models/trade');
const trade = require('../models/trade');
dotenv.config();
router.post('/', auth, async (req, res) => {
  try {
    const { tradeId } = req.body;
    const tradeRes = await Trade.findOne({ TradeId: tradeId });
    console.log(tradeRes);
    const { email, username } = await User.findOne({
      username: tradeRes.importerUserName,
    });
    console.log(email + username);
    if (!tradeRes) {
      return res.status(401).json({ message: 'Trade Id is invalid' });
    }
    const { TradeId, amount } = tradeRes;
    const mailCont = {
      email,
      username,
      amount,
      TradeId,
    };
    console.log(mailCont);
    sendReminderMail({ mailCont });
    const rep = await Trade.findByIdAndUpdate(tradeRes._id, { rf: true });
    return res.status(200).json({ message: 'Reminder Mail sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
