import React from 'react';

const SubmitToOfficeHeadForm = ({ onSubmitToOfficeHead }) => {
  return (
    <div className="submit-to-office-head-form">
      <p>Do you want to submit this shift swap request to the office head?</p>
      <button onClick={onSubmitToOfficeHead}>Submit to Office Head</button>
    </div>
  );
};

export default SubmitToOfficeHeadForm;
