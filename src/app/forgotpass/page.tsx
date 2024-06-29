'use client'
import React from 'react'
import { Container, TextField, Button, Box, Typography } from '@mui/material';

const UsernameForm: React.FC = () => {
  const [username, setUsername] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Username submitted:', username);
    // Perform further actions such as form validation or API call here
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