'use client';
import React from 'react';

const ForgotPass: React.FC = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('Hey');
    console.log(event);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
      <h6 className="text-xl mb-4 text-gray-700">Enter Email :</h6>
      <input
        type="email"
        className="p-3 text-base border border-gray-300 rounded mb-4 w-full max-w-md"
        placeholder="Email"
      />
      <button
        className="p-3 text-base text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
};

export default ForgotPass;