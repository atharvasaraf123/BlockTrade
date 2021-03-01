const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

dotenv.config();

router.post('/', async (req, res) => {
  const { token } = req.headers;
  console.log(req.headers);
  const {
    companyName,
    companyAddress,
    companyEmail,
    companyTelNo,
    city,
    country,
  } = req.body;
  const companyInfo = {
    companyName,
    companyAddress,
    companyEmail,
    companyTelNo,
    city,
    country,
  };
  const decoded = jwt.verify(token, process.env.JWTSECRET);
  if (decoded) {
    const { user } = decoded;
    try {
      const response = await User.findByIdAndUpdate(user.id, companyInfo);
      res.status(200).json('Company Info saved successfully');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
});

module.exports = router;
