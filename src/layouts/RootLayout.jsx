import React from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='bg-white dark:bg-black'>
      <Header/>
      <main className='flex flex-col justify-center items-center min-h-screen mt-20'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};

export default RootLayout;
