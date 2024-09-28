import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1.2 }}
        transition={{
          type: "spring",
          stiffness: 360,
          damping: 40,
          delay: 0.5,
        }}
      >
        <Link 
          to={'/'}
          className='font-bold text-2xl dark:bg-black/60 dark:text-foreground bg-background/80 text-black/70 leading-[1.35] rounded-sm text-center align-middle shadow-inner size-9 inline-block'
        >
          gs.
        </Link>
      </motion.div>
    </>
  );
};

export default Logo;
