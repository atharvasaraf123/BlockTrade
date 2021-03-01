const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    let res1 = await User.find({ kycStatus: true });
    // res1.toArray(function (err, result) {
    //   if (err) throw err;
    //   console.log(result);
    // });
    let arr = [];
    res1.forEach((doc) => {
      arr.push({
        _id: doc.id,
        username: doc.username,
      });
    });
    console.log(arr);
    return res.status(200).json({ users: arr });
  } catch (e) {
    res.status(400).send({ e });
  }
});

module.exports = router;
