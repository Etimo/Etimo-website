'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface StaggeredImagesProps {
  children: React.ReactNode[];
}

const StaggeredImages = ({ children }: StaggeredImagesProps) => {
  const [seen, setSeen] = useState<Record<number, boolean>>({});

  return (
    <>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={seen[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: index * 0.08 }}
          onViewportEnter={() => setSeen((s) => (s[index] ? s : { ...s, [index]: true }))}
          viewport={{ once: true, amount: 0.05 }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
};

export default StaggeredImages;
