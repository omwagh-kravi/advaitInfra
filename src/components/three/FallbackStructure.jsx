import { motion } from 'framer-motion';

export function FallbackStructure({ complete = false }) {
  const path = {
    initial: { pathLength: complete ? 1 : 0, opacity: complete ? 1 : 0 },
    animate: { pathLength: 1, opacity: 1 }
  };

  return (
    <motion.svg
      viewBox="0 0 760 420"
      className="h-full w-full"
      initial="initial"
      animate="animate"
      transition={{ duration: complete ? 0 : 2.2, ease: 'easeOut', staggerChildren: 0.12 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="steelGradient" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#8A9299" />
          <stop offset="48%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#1CA7E0" />
        </linearGradient>
      </defs>
      <rect x="58" y="338" width="646" height="10" fill="#1CA7E0" opacity="0.18" />
      {[110, 210, 310, 410, 510, 610].map((x) => (
        <g key={x}>
          <motion.path variants={path} d={`M${x} 340V148`} stroke="url(#steelGradient)" strokeWidth="7" strokeLinecap="round" />
          <motion.path variants={path} d={`M${x + 46} 340V148`} stroke="url(#steelGradient)" strokeWidth="7" strokeLinecap="round" opacity="0.75" />
          <motion.path variants={path} d={`M${x - 12} 148l35-50 35 50`} stroke="#1CA7E0" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      {[130, 180, 230, 280, 330].map((y) => (
        <motion.path key={y} variants={path} d={`M98 ${y}H662`} stroke="#8A9299" strokeWidth="3" opacity="0.55" />
      ))}
      <motion.path variants={path} d="M102 222 660 104M102 286 660 168" stroke="#1CA7E0" strokeWidth="2" opacity="0.55" />
    </motion.svg>
  );
}
