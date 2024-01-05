const User = require('../models/userSchema')
const OfficeHead = require('../models/officeHeadSchema')
const bcrypt = require('bcrypt')

const getProfile = async (req, res) => {
    try {
      let user;

        if (req.user.type === 'user') {
          user = await User.findById(req.user._id).select('-password');
          res.status(200).json(user);
        }
        else if (req.user.type === 'officeHead') {
          user = await OfficeHead.findById(req.user._id).select('-password');
          res.status(200).json(user);
        }
        else {
          res.status(404).json({ error: 'User type not supported' });
          return;
        }

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message })
    }
}

const updateProfile= async (req, res) => {
    try {
        const { email, username, officerName, dateOfBirth, yearOfJoin, jobTitle } = req.body;
    
        let user
        if (req.user.type === 'user') {
          user = await User.findById(req.user._id)
        }
        else if (req.user.type === 'officeHead') {
          user = await OfficeHead.findById(req.user._id)
        }
        console.log(user)
        if(!email || !username || !officerName || !dateOfBirth || !yearOfJoin || !jobTitle){
          throw Error('All the fields are Compulsory')
        }
        if (email && email !== user.email) {
          throw Error('Cannot update email')
        }

        if (username && username !== user.username) {
            const existingUser = await User.findOne({username})
            if (existingUser) {
              throw Error('Username is already in use')
            }
        }

        if (jobTitle && jobTitle !== user.jobTitle) {
          if (req.user.type === 'user') {
            throw Error('If you want to change your Job Title consult your Office Head')
          }
          else if (req.user.type === 'officeHead') {
            throw Error('Office Head cannot update their Job Title')
          }
        }
    
        const allowedUpdates = {
          username,
          officerName,
          dateOfBirth,
          yearOfJoin,
          jobTitle,
        };
    
        let updatedUser;
        if (req.user.type === 'user') {
          updatedUser = await User.findByIdAndUpdate(req.user._id, allowedUpdates, { new: true });
        }
        else if (req.user.type === 'officeHead') {
          updatedUser = await OfficeHead.findByIdAndUpdate(req.user._id, allowedUpdates, { new: true });
        }

        res.status(200).json(updatedUser);
        console.log(updatedUser)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteProfile= async (req, res) => {
    try {
      const { password } = req.body
      let user;

      if (req.user.type === 'user') {
        user = await User.findById(req.user._id)
      }
      else if(req.user.type === 'officeHead') {
        user = await OfficeHead.findById(req.user._id)
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if(!password){
        return res.status(400).json({ error: 'Password must be Entered' });
      }
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      
      await User.findByIdAndDelete(req.user._id);
      res.status(200).json({ message: 'User account deleted successfully' });      
    } 
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
}


module.exports = { getProfile, updateProfile, deleteProfile }
