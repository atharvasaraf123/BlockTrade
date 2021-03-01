const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
dotenv.config();
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.body.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    check('username', 'Please enter username').exists(),
    check('password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
      let user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ msg: 'Enter valid username' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Enter valid password' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWTSECRET,
        {
          expiresIn: 10000000000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
