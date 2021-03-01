const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
router.post('/', async (req, res) => {
  const { token } = req.body;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWTSECRET);
      if (decoded) {
        const {
          name,
          username,
          email,
          password,
          mobileNo,
          walletAddr,
        } = decoded;
        var user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
          name,
          username,
          email,
          password,
          mobileNo,
          walletAddr,
        });

        await user.save();

        res.status(200).json({ msg: 'Signup successful' });
      } else {
        return res.status(400).json({ msg: 'Expired or invalid token' });
      }
    } catch (err) {
      return res.status(401).json({ msg: 'Invalid signature or token' });
    }
  } else {
    return res.status(400).json({ msg: 'No token present' });
  }
});

module.exports = router;
