const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const sendMail = require('../sendgrid-mail');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
dotenv.config();
router.post(
  '/',
  [
    check('name', 'Please enter name').not().isEmpty(),
    check('username', 'Please enter username').not().isEmpty(),
    check('email', 'Please enter email').isEmail(),
    check('password', 'Please enter password of min 5 letters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, email, password, mobileNo, walletAddr } = req.body;
    try {
      let userEmail = await User.findOne({ email });
      let userName = await User.findOne({ username });
      let userMobileNo = await User.findOne({ mobileNo });
      if (userEmail) {
        return res.status(400).json({ msg: 'email already in use!' });
      }
      if (userName) {
        return res.status(400).json({ msg: 'username already in use!' });
      }
      if (userMobileNo) {
        return res.status(400).json({ msg: 'MobileNo already in use!' });
      }
      user = new User({
        name,
        username,
        email,
        password,
        mobileNo,
        walletAddr,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      const payload = {
        name,
        username,
        email,
        password: user.password,
        mobileNo,
        walletAddr,
      };
      const token = jwt.sign(payload, process.env.JWTSECRET, {
        expiresIn: 43200,
      });

      const mailCont = {
        email,
        token,
      };
      sendMail(mailCont);
      res.json({ message: 'Mail sent successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
