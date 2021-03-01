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
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
