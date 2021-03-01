const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Dl = require('../models/kycDL');
const Pass = require('../models/kycPassport');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.post('/dl/put', async (req, res) => {
  const { cc, dl_no } = req.body;
  let dl = new Dl({ cc, dl_no });
  await dl.save();
  res.json({ msg: 'dl registered!' });
});
router.post('/passport/put', async (req, res) => {
  const { cc, passport_no } = req.body;
  let pass = new Pass({ cc, passport_no });
  await pass.save();
  res.json({ msg: 'passport registered!' });
});

router.post(
  '/dl',
  [
    check('dl_no', 'Driving license no is required').exists(),
    check('cc', 'Invalid Country code').isIn([
      'AU',
      'AG',
      'BG',
      'AS',
      'CO',
      'CA',
      'IN',
    ]),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { token } = req.headers;

      if (!token) {
        return res.status(400).json({ msg: 'Unauthorized access' });
      }

      const { cc, dl_no } = req.body;
      let dl = await Dl.findOne({ dl_no });
      if (!dl) {
        return res.status(400).json({ msg: 'Not valid DL' });
      }
      if (dl.userAssc) {
        return res.status(400).json({ msg: 'DL already in use!' });
      }
      const decoded = jwt.verify(token, process.env.JWTSECRET);
      const { user } = decoded;
      let user_ = await Dl.findByIdAndUpdate(dl.id, { userAssc: user.id });
      let user_1 = await User.findByIdAndUpdate(user.id, {
        kycVerifiedThrough: 'DL',
        kycStatus: true,
      });

      res.status(200).json({ msg: 'KYC done' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.post(
  '/passport',
  [
    check('passport_no', 'Driving license no is required').exists(),
    check('cc', 'Invalid Country code').isIn([
      'AU',
      'AG',
      'BG',
      'AS',
      'CO',
      'CA',
      'IN',
    ]),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { token } = req.headers;

      if (!token) {
        return res.status(400).json({ msg: 'Unauthorized access' });
      }

      const { cc, passport_no } = req.body;
      let pass = await Pass.findOne({ passport_no });
      if (!pass) {
        return res.status(400).json({ msg: 'Not valid Passport' });
      }
      if (pass.userAssc) {
        return res.status(400).json({ msg: 'Passport already in use!' });
      }
      const decoded = jwt.verify(token, process.env.JWTSECRET);
      const { user } = decoded;
      let user_ = await Pass.findByIdAndUpdate(pass.id, { userAssc: user.id });
      let user_1 = await User.findByIdAndUpdate(user.id, {
        kycVerifiedThrough: 'Passport',
        kycStatus: true,
      });

      res.status(200).json({ msg: 'KYC done' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
