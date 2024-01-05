import React from 'react';
import { useForm } from 'react-hook-form';

const ShiftSwapForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form className="shift-swap-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <label>
        Date:
        <input type="date" {...register('date', { required: true })} />
      </label>
      <label>
        Time:
        <input type="time" {...register('time', { required: true })} />
      </label>
      <button type="submit">Submit Swap Request</button>
    </form>
  );
};

export default ShiftSwapForm;
