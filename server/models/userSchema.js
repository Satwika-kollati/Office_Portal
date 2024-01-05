const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Organisation = require ('./orgSchema')

const userSchema = new mongoose.Schema({
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
        trim: true,
    },
    organisationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organisation',
        required: true,
    }
}, { timestamps: true });


userSchema.statics.login = async function (email, password) {
    try {
        if(!email || !password){
            throw Error('All fileds are mandatory')
        }
    
        const user = await this.findOne({email})
        if(!user){
           throw Error('No user with the given Email Id') 
        }

        const match = await bcrypt.compareSync(password,user.password)

        if(!match){
            throw Error('Incorrect password')
        }

        return user
    } catch (error) {
        throw error;
    }
};

userSchema.statics.signup = async function (userData) {
    try {
        const { email, password, username, officerName, dateOfBirth, yearOfJoin, jobTitle,OrgID, OrgKey } = userData;

        if (!email || !password || !username || !officerName || !jobTitle || !dateOfBirth || !yearOfJoin) {
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

        const existingOrganisation = await Organisation.findOne({ id: OrgID });
        if (!existingOrganisation) {
            throw { message: 'Invalid organization ID' };
        }
        
        const matchOrgKey = await bcrypt.compare(OrgKey, existingOrganisation.key);
        if (!matchOrgKey) {
            throw { message: 'Invalid organization key' };
        }
        const organisationId = existingOrganisation._id;

        const allowedJobTitles = existingOrganisation.allowedRoles.map(role => role.toLowerCase());
        const normalizedJobTitle = jobTitle.toLowerCase();

        if (!allowedJobTitles.includes(normalizedJobTitle)) {
            throw { message: 'Job title is not allowed in the organization' };
        }
 
        const existingUser = await this.findOne({ email });
        if (existingUser) {
            throw { message: 'Email address is already in use' };
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new this({
            email,
            username,
            password: hashedPassword,
            officerName,
            dateOfBirth,
            yearOfJoin,
            jobTitle,
            organisationId
        });

        await newUser.save();

        return newUser;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('User', userSchema);

/*"email": "sai@gmail.com",
    "username": "Satwika",
    "officerName": "satwika",
    "dateOfBirth": "2004-05-13T00:00:00.000Z",
    "yearOfJoin": 2015,
    "jobTitle": "employee"
*/