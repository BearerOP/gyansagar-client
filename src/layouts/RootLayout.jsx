import Footer from '../components/footer';
import Header from '../components/header';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

const RootLayout = () => {
  return (
    <div className='bg-white dark:bg-black'>
      <Header/>
      <main className='flex flex-col min-h-screen '>
        <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
    </div>
  );
};

export default RootLayout;
