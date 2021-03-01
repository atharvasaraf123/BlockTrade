const mongoose = require('mongoose');

const dlSchema = mongoose.Schema({
  cc: {
    type: String,
    required: true,
  },
  dl_no: {
    type: String,
    required: true,
    unique: true,
  },
  userAssc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null,
  },
});

module.exports = mongoose.model('dl', dlSchema);
