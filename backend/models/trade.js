const mongoose = require('mongoose');

const TradeSchema = mongoose.Schema({
  TradeId: {
    type: String,
    required: true,
  },
  exporterUserName: {
    type: String,
    required: true,
  },
  importerUserName: {
    type: String,
    required: true,
  },
  invoiceDate: {
    type: String,
    required: true,
  },
  incoterms: {
    type: String,
    default: '',
  },
  paymentType: {
    type: String,
    default: '',
  },
  creditPeriod: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    default: 0,
  },
  tradeStatus: {
    type: String,
    default: '',
  },
  rf: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('trade', TradeSchema);
