const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const ShiftRequest = require('../models/ShiftRequestSchema');
const OfficeHead = require('../models/officeHeadSchema');

  const getShiftSwap = async (req, res) => {
    try {
      const { _id, type } = req.user;

      
      if (type === 'user') {
        const user = await User.findById(_id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const organisationId = user.organisationId;

        const myRequests = await ShiftRequest.find({ requesterId: _id });
        const otherRequests = await ShiftRequest.find({ requesterId: { $ne: _id }, organisationId });

        const myPendingRequests = myRequests.filter(request => request.status === 'Pending');
        const myAcceptedRequests = myRequests.filter(request => request.status === 'Accepted' && !request.pendingApproval);
        const myPendingApprovalRequests = myRequests.filter(request => request.status === 'Accepted' && request.pendingApproval);
        const myApprovedRequests = myRequests.filter(request => request.status === 'Approved');
        const myRejectedRequests = myRequests.filter(request => request.status === 'Rejected');

        const otherPendingRequests = otherRequests.filter(request => request.status === 'Pending');

        res.json({
          myRequests: {
            pending: myPendingRequests,
            accepted: myAcceptedRequests,
            pendingApproval: myPendingApprovalRequests,
            approved : myApprovedRequests,
            rejected: myRejectedRequests
          },
          otherRequests: {
            pending: otherPendingRequests,
          },
        });
      } else if (type === 'officeHead') {
        const user = await OfficeHead.findById(_id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const organisationId = user.organisationId;

        const officeHeadRequests = await ShiftRequest.find({ organisationId });

        const pendingApprovalRequests = officeHeadRequests.filter(request => request.status === 'PendingApproval');

        res.json({
          pendingApproval: pendingApprovalRequests,
        });
      } else {
        res.status(401).json({ error: 'Invalid user type' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const  submitShiftSwap= async (req, res) => {
    try {
      const { _id, type } = req.user;
      const { startDate, endDate } = req.body;

      if (type === 'user') {
        const user = await User.findById(_id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const organisationId = user.organisationId;

        const newRequest = new ShiftRequest({
          requesterId: _id,
          startDate,
          endDate,
          organisationId,
        });

        await newRequest.save();

        res.json({ message: 'Shift request submitted successfully' });
      } else {
        res.status(401).json({ error: 'Invalid user type' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const  acceptShiftSwap= async (req, res) => {
    try {
      const { _id, type } = req.user;
      const { requestId } = req.body;

      if (type === 'user') {
        const user = await User.findById(_id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const organisationId = user.organisationId;

        const shiftRequest = await ShiftRequest.findById(requestId);

        if (!shiftRequest) {
          return res.status(404).json({ error: 'Shift request not found' });
        }

        if (shiftRequest.status === 'Pending' && !shiftRequest.acceptorId) {
          shiftRequest.acceptorId = _id;
          shiftRequest.status = 'Accepted';

          await shiftRequest.save();

          res.json({ message: 'Shift request accepted successfully' });
        } else {
          res.status(400).json({ error: 'Invalid shift request status or acceptor' });
        }
      } else {
        res.status(401).json({ error: 'Invalid user type' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const  sendToOfficeHead= async (req, res) => {
    try {
      const { _id, type } = req.user;
      const { requestId } = req.body;

      if (type === 'user') {
        const user = await User.findById(_id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const organisationId = user.organisationId;

        const shiftRequest = await ShiftRequest.findById(requestId);

        if (!shiftRequest) {
          return res.status(404).json({ error: 'Shift request not found' });
        }

        if (shiftRequest.status === 'Accepted' && shiftRequest.requesterId.toString() === _id.toString() && !shiftRequest.pendingApproval) {
          shiftRequest.status = 'PendingApproval';

          await shiftRequest.save();

          res.json({ message: 'Shift request sent to office head for approval' });
        } else {
          res.status(400).json({ error: 'Invalid shift request status or requester' });
        }
      } else {
        res.status(401).json({ error: 'Invalid user type' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const  officeHeadApproval= async (req, res) => {
    try {
      const { _id, type } = req.user;
      const { requestId, action, reason } = req.body;

      if (type === 'officeHead') {
        const officeHead = await OfficeHead.findById(_id);
        if (!officeHead) {
          return res.status(404).json({ error: 'Office head not found' });
        }
        const organisationId = officeHead.organisationId;

        const shiftRequest = await ShiftRequest.findById(requestId);

        if (!shiftRequest) {
          return res.status(404).json({ error: 'Shift request not found' });
        }

        if (shiftRequest.organisationId.toString() === organisationId.toString() && shiftRequest.status === 'PendingApproval') {
          if (action === 'accept') {
            shiftRequest.status = 'Accepted';
            shiftRequest.officeHeadApproval = {
              status: 'Approved',
            };
          } else if (action === 'reject') {
            shiftRequest.status = 'Rejected';
            shiftRequest.officeHeadApproval = {
              status: 'Rejected',
              reason,
            };
          } else {
            return res.status(400).json({ error: 'Invalid action' });
          }

          await shiftRequest.save();

          res.json({ message: 'Shift request approved/rejected successfully' });
        } else {
          res.status(400).json({ error: 'Invalid shift request status or organisation' });
        }
      } else {
        res.status(401).json({ error: 'Invalid user type' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


module.exports = {getShiftSwap,submitShiftSwap,acceptShiftSwap,sendToOfficeHead,officeHeadApproval}
