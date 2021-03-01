const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

let gfs;

router.post(
  '/user-avatar',
  [auth, upload.single('img')],
  async (req, res, err) => {
    console.log(req.file);
    //console.log(req.body.user);
    const token = req.header('token');
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    await User.updateOne(
      { _id: decoded.user.id },
      { avatar: req.file.filename }
    );
    res.status(200).send(req.file);
  }
);

router.get('/', (req, res) => {
  const conn = mongoose.createConnection(process.env.MONGOURI);
  console.log(conn);
  console.log('Trying to connect');

  gfs = Grid(conn.db, mongoose.mongo);
  console.log(gfs);
  gfs.collection('uploads');
  console.log('Connection Successful');
  gfs.files.findOne({ filename: 'doctor.jpg' }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }

    // Check if image
    if (
      file.contentType === 'image/jpeg' ||
      file.contentType === 'image/png' ||
      file.contentType === 'image/jpg'
    ) {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image',
      });
    }
  });
  conn.once('open', () => {});
});
/*
router.post('/user-avatar', auth, async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    return res.send(`File has been uploaded.`);
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload image: ${error}`);
  }
});*/

router.post('/edit-profile', async (req, res) => {
  try {
    const { token } = req.headers;
    console.log(req.headers);
    const {
      name,
      mobileNo,
      companyName,
      companyAddress,
      companyEmail,
      companyTelNo,
      city,
      country,
    } = req.body;
    const userInfo = {
      name,
      mobileNo,
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
        const response = await User.findByIdAndUpdate(user.id, userInfo);
        res.status(200).json('User Info saved successfully');
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
