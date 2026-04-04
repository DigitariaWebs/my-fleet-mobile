import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

export default function Splash() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="h-screen w-full flex items-center justify-center relative" style={{ background: '#050404' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Ambient glow */}
        <div 
          className="absolute inset-0 blur-[80px] -z-10"
          style={{ 
            background: 'radial-gradient(circle, rgba(74, 25, 66, 0.3) 0%, transparent 70%)',
            width: '200px',
            height: '200px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-[32px] font-bold tracking-tight" style={{ color: '#EAEAEA' }}>
            <span style={{ color: '#4A1942' }}>M</span>yFleet
          </h1>
        </div>
      </motion.div>
      
      {/* Loading bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[200px] h-[2px] bg-[rgba(234,234,234,0.1)] overflow-hidden rounded-full">
        <motion.div
          className="h-full"
          style={{ background: '#4A1942' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
