const express = require('express');
const router = express.Router();
const Trade = require('../models/trade');
const auth = require('../middleware/auth');
const User = require('../models/User');
var crypto = require('crypto');
const { Timestamp } = require('mongodb');

router.get('/', auth, async (req, res) => {
  try {
    const userId = await User.findById(req.body.user.id);
    console.log(userId);
    const trade = await Trade.find({
      $or: [
        { exporterUserName: userId.username },
        { importerUserName: userId.username },
      ],
    });
    console.log(trade);
    return res.status(200).json({ trades: trade });
  } catch (e) {
    res.status(400).send({ e });
  }
});

router.post('/username', auth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    return res.status(200).json({ user });
  } catch (e) {}
});

router.post('/', auth, async (req, res) => {
  try {
    const {
      user,
      expUser,
      impUser,
      inco,
      creditPeriod,
      amount,
      paymentType,
      invoiceDate,
    } = req.body;
    console.log(new Date().getTime());
    var a = expUser + impUser + new Date().getTime();
    const tradeId = crypto.createHash('sha256').update(a).digest('base64');
    console.log(tradeId);
    const trade1 = new Trade({
      incoterms: inco,
      creditPeriod,
      paymentType,
      amount,
      invoiceDate,
      TradeId: tradeId,
      exporterUserName: expUser,
      importerUserName: impUser,
      tradeStatus: 'DU',
    });
    await trade1.save();
    res.status(200).send({ trade1 });
  } catch (e) {
    res.status(400).send({ e });
  }
});
router.post('/update', auth, async (req, res) => {
  try {
    const { tradeId, tradeStatus } = req.body;
    const trade = await Trade.update(
      { TradeId: tradeId },
      { tradeStatus: tradeStatus }
    );
    res.status(200).send({ trade });
  } catch (e) {
    res.status(400).send({ e });
  }
});
router.post('/delete', auth, async (req, res) => {
  try {
    const { tradeId } = req.body;
    const trade = await Trade.remove({ TradeId: tradeId });
    res.status(200).json({ msg: 'Trade deleted successfully' });
  } catch (e) {
    res.status(400).send({ e });
  }
});
module.exports = router;
