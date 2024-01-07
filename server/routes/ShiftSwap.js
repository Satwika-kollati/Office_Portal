const express = require('express');
const router = express.Router();
const {
    getShiftSwap,
    submitShiftSwap,
    acceptShiftSwap,
    sendToOfficeHead,
    officeHeadApproval 
} = require('../controllers/ShiftSwapController');
const requireAuth = require('../middleware/authMiddleware');

//middleware
router.use(requireAuth);

router.get('/getShiftSwap', getShiftSwap);

router.post('/submitShiftSwap',submitShiftSwap);

router.post('/acceptShiftSwap', acceptShiftSwap);

router.post('/sendToOfficeHead',sendToOfficeHead);

router.post('/officeHeadApproval', officeHeadApproval);

module.exports = router;
