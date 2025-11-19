'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  once?: boolean;
}

const FadeIn = ({ children, direction, duration = 0.6, once = true }: FadeInProps) => {
  const [seen, setSeen] = useState(false);

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={seen ? 'visible' : 'hidden'}
      variants={variants}
      onViewportEnter={() => setSeen(true)}
      onViewportLeave={() => {
        if (!once) setSeen(false);
      }}
      viewport={{
        once,
        margin: '0px 0px -100px 0px',
        amount: 0.3,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
