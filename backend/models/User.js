const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    default: '',
  },
  kycVerifiedThrough: {
    type: String,
    default: '',
  },
  kycStatus: {
    type: Boolean,
    default: false,
  },
  companyName: {
    type: String,
    default: '',
  },
  companyEmail: {
    type: String,
    default: '',
  },
  companyAddress: {
    type: String,
    default: '',
  },
  companyTelNo: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  walletAddr: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', UserSchema);
