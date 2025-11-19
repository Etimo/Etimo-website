'use client';

import { motion } from 'framer-motion';

interface HoverEffectProps {
  children: React.ReactNode;
  underlineSpacing?: number;
  scale?: number;
}

const HoverEffect = ({ children, underlineSpacing = 12, scale = 1.05 }: HoverEffectProps) => {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{ display: 'inline-block', position: 'relative' }}
      variants={{
        rest: { scale: 1 },
        hover: { scale: scale },
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}

      <motion.span
        variants={{
          rest: { width: '100%', backgroundColor: 'currentColor', opacity: 0.2 },
          hover: { width: '100%', backgroundColor: 'currentColor', opacity: 0.2 },
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          height: 2,
          left: 0,
          bottom: -underlineSpacing,
        }}
      />

      <motion.span
        variants={{
          rest: { width: 0, backgroundColor: 'var(--color-cyan)' },
          hover: { width: '100%', backgroundColor: 'var(--color-cyan)' },
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          height: 2,
          left: 0,
          bottom: -underlineSpacing,
        }}
      />
    </motion.div>
  );
};

export default HoverEffect;
