const express = require('express')

const {
    login,
    signupUser,
    signupOH,
    createOrg,
    getOrgandOhIds
} = require ('../controllers/authController')
const router = express.Router()

router.post('/login',login)

router.post('/signup-user',signupUser)

router.post('/signup-oh',signupOH)

router.post('/create-org',createOrg)

router.post('/getOrgandOHIds',getOrgandOhIds)


module.exports = router