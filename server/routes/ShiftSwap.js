const express = require('express');
const router = express.Router();
const {
    getShiftRequests,
    requestShiftSwap,
    acceptShiftSwap,
    submitToOfficeHead   
} = require('../controllers/ShiftSwapController');
const requireAuth = require('../middleware/authMiddleware');

//middleware
router.use(requireAuth);

router.get('/shiftRequests/:organizationId', getShiftRequests);

router.post('/requestShiftSwap/:organizationId', requestShiftSwap);

router.put('/acceptShiftSwap/:requestId/:accepterId', acceptShiftSwap);

router.put('/submitToOfficeHead/:requestId/:officeHeadId', submitToOfficeHead);

module.exports = router;
