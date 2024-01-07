const mongoose = require('mongoose');

const shiftRequestSchema = new mongoose.Schema({
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  acceptorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  organisationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organisation',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted','Approved', 'Rejected', 'Expired'],
    default: 'Pending',
  },
  officeHeadApproval: {
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
    },
    reason: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('ShiftRequest', shiftRequestSchema);
