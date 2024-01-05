const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const officeHeadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email address'],
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isStrongPassword(value, {
        minLength: 8,
        minUppercase: 1,
        minLowercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      }),
      message: 'Invalid password',
    },
  },
  officerName: {
    type: String,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: (value) => validator.isDate(value),
      message: 'Invalid date format for dateOfBirth',
    },
  },
  yearOfJoin: {
    type: Number,
    validate: {
      validator: (value) => validator.isInt(value.toString(), { min: 1900, max: new Date().getFullYear() }),
      message: 'Invalid yearOfJoin',
    },
  },
  jobTitle: {
    type: String,
    default: 'officehead', 
    trim: true,
  },
  organisationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organisation'
  },
}, { timestamps: true });


officeHeadSchema.statics.signup = async function (officeHeadData) {
  try {
    const { email, password, username, officerName, dateOfBirth, yearOfJoin } = officeHeadData;

    if (!email || !password || !username || !officerName || !dateOfBirth || !yearOfJoin) {
      throw { message: 'All required fields must be provided' };
    }

    if (!validator.isEmail(email)) {
      throw { message: 'Invalid email address' };
    }

    if (!validator.isStrongPassword(password)) {
      throw { message: 'Invalid password' };
    }

    if (!validator.isAlphanumeric(username)) {
      throw { message: 'Invalid username' };
    }

    const existingOfficeHead = await this.findOne({ email });
    if (existingOfficeHead) {
      throw { message: 'Email address is already in use' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newOfficeHead = new this({
      email,
      username,
      password: hashedPassword,
      officerName,
      dateOfBirth,
      yearOfJoin,
    });

    await newOfficeHead.save();

    return newOfficeHead;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('OfficeHead', officeHeadSchema);
