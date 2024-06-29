// src/app/page.tsx

import React from 'react';
import Home from './components/home/Home';
import Link from "next/link";

const HomePage = () => {
  return (
    <div className='min-h-screen overflow-hidden'>
    <Home />
    </div>
  );
};

export default HomePage;
