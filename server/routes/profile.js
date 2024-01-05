const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    deleteProfile
} = require('../controllers/profileContoller');
const requireAuth = require('../middleware/authMiddleware');

//middleware
router.use(requireAuth);

router.get('/',getProfile);

router.put('/update',updateProfile);

router.delete('/delete',deleteProfile);

module.exports = router;
