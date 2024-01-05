const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const OfficeHead = require('./officeHeadSchema')

const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^\d{6}$/.test(value.toString());
      },
      message: 'ID must be a 6-digit number',
    },
  },
  key: {
    type: String,
    required: [true, 'Organisation key is required'],
    validate: {
      validator: (value) => validator.isStrongPassword(value, {
        minLength: 8,
        minUppercase: 1,
        minLowercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      }),
      message: 'Invalid organisation key. It should be a strong password.',
    },
  },
  allowedRoles: {
    type: [{
      type: String,
      validate: {
        validator: (value) => value.trim().length > 0,
        message: 'Allowed role cannot be empty',
      },
    }],
    default: [],
    validate: {
      validator: (value) => value.length > 0,
      message: 'At least one allowed role is required',
    },
  },
  officeHeadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OfficeHead',
  },
}, { timestamps: true });


organisationSchema.statics.createOrganisation = async function (orgData) {
  try {
    const {name,id,key,allowedRoles,officeHeadId} = orgData;

    if(!name){
      throw { message: "Organisation name can't be empty."}
    }
    if (!validator.isStrongPassword(key,{ minLength: 8 })) {
      throw { message: 'Invalid organization key. It should be a strong password.' }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedKey = await bcrypt.hash(key,salt);

    const organisation = new this({
      name,
      id,
      key: hashedKey,
      allowedRoles,
      officeHeadId
    });
    await organisation.validate(); 
    const savedOrganisation = await organisation.save();

    const orgId = savedOrganisation._id;

    await OfficeHead.findByIdAndUpdate(orgData.officeHeadId, { organisationId: orgId });
    
    return savedOrganisation;
  } catch (error) {
    throw error;
  }
};


module.exports = mongoose.model('Organisation', organisationSchema);
