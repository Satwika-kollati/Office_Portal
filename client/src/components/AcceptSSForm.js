import React from 'react';

const AcceptShiftSwapForm = ({ onAccept }) => {
  return (
    <div className="accept-shift-swap-form">
      <p>Do you want to accept this shift swap request?</p>
      <button onClick={onAccept}>Accept</button>
    </div>
  );
};

export default AcceptShiftSwapForm;
