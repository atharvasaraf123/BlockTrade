const PORT = process.env.PORT || 5000;
const express = require('express');
const connectDB = require('./db');
const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const app = express();

connectDB();

const conn = mongoose.createConnection(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once('open', () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });
});

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.json({ msg: 'Hello' });
});
app.use('/signup', require('./routes/users'));
app.use('/login', require('./routes/auth'));
app.use('/activate', require('./routes/emailVer'));
app.use('/kyc', require('./routes/kyc'));
app.use('/forgotpass', require('./routes/forgotPass'));
app.use('/resetpass', require('./routes/resetPass'));
app.use('/companyInfo', require('./routes/companyInfo'));
app.use('/tradeid', require('./routes/tradeId'));
app.use('/trade', require('./routes/trade'));
app.use('/reminder', require('./routes/reminder'));
app.use('/profile', require('./routes/profile'));

app.get('/profileimage/:filename', (req, res) => {
  // console.log('id', req.params.id)
  const file = gfs
    .find({
      filename: req.params.filename,
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'no files exist',
        });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
