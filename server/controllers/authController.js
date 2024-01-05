const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = require('../models/userSchema')
const OfficeHead = require('../models/officeHeadSchema')
const Organisation = require('../models/orgSchema')

const createToken = (_id) => {
    return jwt.sign({_id : _id},process.env.SECRET,{expiresIn : '24h'})
}

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
       if (!email || !password) {
        throw Error('All fields are mandatory');
       }

      const employee = await User.findOne({ email });
      if (employee) {
        const isPasswordCorrect = bcrypt.compareSync(password, employee.password);
        if (isPasswordCorrect) {
          const token = createToken(employee._id);
          res.status(200).json({userType:'employee',user_id:employee._id,username:employee.username,token});
          return;
        } else {
          res.status(404).json({ error: 'Incorrect password' });
          return;
        }
      }
  
      const officeHead = await OfficeHead.findOne({ email });
      if (officeHead) {
        const isPasswordCorrect = bcrypt.compareSync(password, officeHead.password);
        if (isPasswordCorrect) {
          const token = createToken(officeHead._id.toString());
          res.status(200).json({userType:'officeHead',user_id:officeHead._id,username:officeHead.username,token});
          return;
        } else {
          res.status(404).json({ error: 'Incorrect password' });
          return;
        }
      }
  
      res.status(404).json({ error: 'No user with that Email' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }  



//login user
/*
const loginUser = async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.login(email,password)
        const token = createToken(user._id)

        res.status(200).json({username: user.username,user_id: user._id,token})        
    }catch(error){
        res.status(400).json({error: error.message})
    }
}*/

//signup user
const signupUser = async (req,res) => {
    const userData = req.body   
    try{
        const user = await User.signup(userData)
        const token = createToken(user._id)

        res.status(200).json({userType:'employee',username:user.username,user_id: user._id,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const signupOH = async (req,res) => {
    const OHData = req.body
    try{
        const OH = await OfficeHead.signup(OHData)
        const token = createToken(OH._id)
        res.status(200).json({userType:'officeHead',username:OH.username,user_id: OH._id,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const createOrg = async (req,res) => {
    const OrgData = req.body
    try{
      const Org = await Organisation.createOrganisation(OrgData)
      res.status(200).json({OrgID :Org._id})
    }
    catch(error){
      res.status(400).json({error: error.message})
    }
}

const getOrgandOhIds = async (req, res) => {
  try {
    console.log('came')
    const userId = req.body.user_id; 
    console.log(userId)
    const user = await User.findById(userId)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { organisationId } = user;
    console.log(organisationId.toString())
    if (!organisationId) {
      return res.status(400).json({ error: 'User does not belong to any organization' });
    }

    const organisation = await Organisation.findById(organisationId.toString());

    if (!organisation) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const { officeHeadId } = organisation;

    return res.json({
      organisationId,
      officeHeadId: officeHeadId.toString(),
    });
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {login,signupUser,signupOH,createOrg,getOrgandOhIds}