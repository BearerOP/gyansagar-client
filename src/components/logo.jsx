import React from 'react'
import * as motion from "framer-motion/client"
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
          delay:.5
        }
    }
      >
        <Link to={'/'} className='font-bold text-2xl dark:bg-white/80 dark:text-background bg-foreground/80 text-background leading-[1.35] rounded-sm text-center align-middle shadow-inner size-9 inline-block	
    '>
        gs.
          
        </Link>
      </motion.div>
      
    </>
  )
}

export default Logo;
