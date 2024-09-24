import React from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
      <Header/>
      <main className='flex flex-col justify-center items-center min-h-screen'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};

export default RootLayout;
