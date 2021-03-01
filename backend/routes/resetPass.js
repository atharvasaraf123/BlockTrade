const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator/check');
const sendResetMail = require('../passReset');

router.post(
  '/',
  [check('password', 'Please enter new password').isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      var { password, token } = req.body;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const decoded = jwt.verify(token, process.env.JWTSECRET);
      if (decoded) {
        const { user } = decoded;
        var user_ = await User.findByIdAndUpdate(user.id, { password });
        if (!user_) {
          return res.status(400).json({ msg: 'User not present' });
        }
        res.status(200).json({ msg: 'Reset Successful!!' });
      } else {
        return res.status(400).json({ msg: 'Expired or invalid token' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
