const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const OfficeHead = require('../models/officeHeadSchema')

const authMiddleware = async (req, res, next) => {
  try {
    const {authorization} = req.headers 
    if (!authorization) {
        res.status(401).json({error:'Authorization Token Required'})
    }
    const token = authorization.split(' ')[1]
  
    const {_id}= jwt.verify(token, process.env.SECRET);

    let user = await User.findOne({ _id }).select('_id');
    if (!user) {
      const OH = await OfficeHead.findOne({ _id }).select('_id');

      if (!OH) {
        res.status(401).json({ error: 'Authentication failed' });
        return;
      }
      req.user = {
        _id: OH._id,
        type: 'officeHead',
      };
    } else {
      req.user = {
        _id: user._id,
        type: 'user',
      };
    }
    next()
    
  } catch (error) {
    console.log(error.message)
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
