const mongoose = require('mongoose');

const passportSchema = mongoose.Schema({
  cc: {
    type: String,
    required: true,
  },
  passport_no: {
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

module.exports = mongoose.model('passport', passportSchema);
