const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');
const sendResetMail = require('../passReset');

router.post(
  '/',
  [check('email', 'Please enter email').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ msg: 'User not present' });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, process.env.JWTSECRET, {
        expiresIn: 3600,
      });

      sendResetMail({ email: user.email, token });
      res.status(200).json({ msg: 'Reset mail sent' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
