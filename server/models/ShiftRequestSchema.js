const mongoose = require('mongoose');

const shiftRequestSchema = new mongoose.Schema({
  requester: {
    _id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    username:{
      type: String,
    },
    organizationId: String,
  },
  accepter: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  approvedBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OfficeHead'
  },
  date: { 
    type: Date, 
    required: true, 
    validate: [dateValidator, 'Date must be in the future'] 
  },
  time: { 
    type: String, 
    required: true 
  },
});

function dateValidator(value) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 
    return value >= currentDate;
}
  

const ShiftRequest = mongoose.model('ShiftRequest', shiftRequestSchema);

module.exports = ShiftRequest;
