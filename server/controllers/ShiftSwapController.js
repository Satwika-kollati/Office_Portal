const ShiftRequest = require('../models/ShiftRequestSchema'); 
const User = require('../models/userSchema')

const getShiftRequests = async (req, res) => {
  try {
    const organizationId = req.params.organizationId;
    const shiftRequests = await ShiftRequest.find({
      'requester.organizationId': organizationId,
    }).populate('requester accepter approvedBy');

    res.status(200).json(shiftRequests);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const requestShiftSwap = async (req, res) => {
  try {
    const { requesterId, date, time } = req.body;
    const organizationId = req.params.organizationId;
    const user = await User.findById(requesterId)

    const newShiftRequest = new ShiftRequest({
      requester: { _id: requesterId, organizationId,username: user.username },
      date,
      time,
    });

    await newShiftRequest.save();
    res.status(201).json(newShiftRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const acceptShiftSwap = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const accepterId = req.params.accepterId;

    const shiftRequest = await ShiftRequest.findById(requestId);
    if (!shiftRequest) {
      return res.status(404).send('Shift request not found');
    }

    if (shiftRequest.accepter) {
      return res.status(400).send('Shift request already accepted');
    }

    shiftRequest.accepter = accepterId;
    await shiftRequest.save();

    res.status(200).json(shiftRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const submitToOfficeHead = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const officeHeadId = req.params.officeHeadId;

    const shiftRequest = await ShiftRequest.findById(requestId);
    if (!shiftRequest) {
      return res.status(404).send('Shift request not found');
    }

    shiftRequest.approvedBy = officeHeadId;
    await shiftRequest.save();

    res.status(200).json(shiftRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { getShiftRequests,acceptShiftSwap,requestShiftSwap,submitToOfficeHead}
