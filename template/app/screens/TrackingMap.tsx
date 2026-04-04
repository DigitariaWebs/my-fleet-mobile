import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Navigation, Maximize2 } from 'lucide-react';

export default function TrackingMap() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [carPosition, setCarPosition] = useState(0);
  
  // Animate car position
  useEffect(() => {
    const interval = setInterval(() => {
      setCarPosition((prev) => (prev + 0.5) % 100);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Generate road path
  const roadPath = "M 50 10 Q 30 30 50 50 T 50 90";
  
  // Calculate car position on path
  const getCarPosition = () => {
    const progress = carPosition / 100;
    // Simulate path following
    const x = 50 + Math.sin(progress * Math.PI * 2) * 20;
    const y = 10 + progress * 80;
    return { x, y };
  };
  
  const { x: carX, y: carY } = getCarPosition();
  
  return (
    <div className="min-h-screen relative" style={{ background: '#050404' }}>
      {/* Map Container */}
      <div className="absolute inset-0" style={{ background: '#1a1a1a' }}>
        {/* Grid pattern for map effect */}
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path 
                d="M 10 0 L 0 0 0 10" 
                fill="none" 
                stroke="rgba(234, 234, 234, 0.03)" 
                strokeWidth="0.1"
              />
            </pattern>
            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgba(74, 25, 66, 0.3)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'rgba(74, 25, 66, 0.1)', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Grid background */}
          <rect width="100" height="100" fill="url(#grid)" />
          
          {/* Road */}
          <path
            d={roadPath}
            fill="none"
            stroke="url(#roadGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* Road dashed line */}
          <path
            d={roadPath}
            fill="none"
            stroke="rgba(234, 234, 234, 0.1)"
            strokeWidth="0.3"
            strokeDasharray="2 2"
          />
          
          {/* Destination marker */}
          <g transform="translate(50, 90)">
            <circle r="1.5" fill="#2ECC71" opacity="0.3" />
            <circle r="0.8" fill="#2ECC71" className="animate-pulse" />
          </g>
          
          {/* Start marker */}
          <g transform="translate(50, 10)">
            <circle r="1" fill="rgba(234, 234, 234, 0.3)" />
            <circle r="0.5" fill="rgba(234, 234, 234, 0.6)" />
          </g>
          
          {/* Car icon */}
          <g transform={`translate(${carX}, ${carY})`}>
            {/* Car shadow */}
            <ellipse 
              cx="0" 
              cy="0.3" 
              rx="1.5" 
              ry="0.5" 
              fill="rgba(0, 0, 0, 0.3)" 
            />
            {/* Car body */}
            <g transform="translate(-1.5, -1.5)">
              <rect 
                x="0.3" 
                y="0.5" 
                width="2.4" 
                height="1.8" 
                rx="0.3"
                fill="#4A1942"
              />
              <rect 
                x="0.5" 
                y="0.8" 
                width="2" 
                height="0.8" 
                rx="0.2"
                fill="rgba(234, 234, 234, 0.2)"
              />
              {/* Wheels */}
              <circle cx="0.7" cy="2.3" r="0.25" fill="#1a1a1a" />
              <circle cx="2.3" cy="2.3" r="0.25" fill="#1a1a1a" />
            </g>
            {/* Location pulse */}
            <circle r="2" fill="#4A1942" opacity="0.2" className="animate-ping" />
          </g>
        </svg>
        
        {/* Decorative buildings/landmarks */}
        <div className="absolute top-20 left-8 w-12 h-12 rounded-lg opacity-20" style={{ background: '#2E1C2B' }} />
        <div className="absolute top-40 right-12 w-16 h-16 rounded-lg opacity-15" style={{ background: '#2E1C2B' }} />
        <div className="absolute bottom-32 left-16 w-10 h-10 rounded-lg opacity-20" style={{ background: '#2E1C2B' }} />
      </div>
      
      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
          style={{ background: 'rgba(46, 28, 43, 0.9)' }}
        >
          <ArrowLeft size={20} style={{ color: '#EAEAEA' }} />
        </button>
        
        <button 
          className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
          style={{ background: 'rgba(46, 28, 43, 0.9)' }}
        >
          <Maximize2 size={20} style={{ color: '#EAEAEA' }} />
        </button>
      </div>
      
      {/* Bottom Info Card */}
      <div className="absolute bottom-0 left-0 right-0">
        <div 
          className="rounded-t-3xl p-5 backdrop-blur-xl"
          style={{ background: 'rgba(5, 4, 4, 0.95)' }}
        >
          <div 
            className="w-10 h-1 rounded-full mx-auto mb-4"
            style={{ background: 'rgba(234, 234, 234, 0.2)' }}
          />
          
          {/* ETA */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[24px] font-bold" style={{ color: '#EAEAEA' }}>
                15 min
              </div>
              <div className="text-[13px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
                Arrivée estimée
              </div>
            </div>
            <div className="text-right">
              <div className="text-[18px] font-semibold" style={{ color: '#EAEAEA' }}>
                3.2 km
              </div>
              <div className="text-[13px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
                Distance restante
              </div>
            </div>
          </div>
          
          {/* Route Info */}
          <div 
            className="p-4 rounded-xl flex items-center gap-3"
            style={{ background: '#2E1C2B' }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(74, 25, 66, 0.5)' }}
            >
              <Navigation size={20} style={{ color: '#EAEAEA' }} />
            </div>
            <div className="flex-1">
              <div className="text-[14px] font-medium" style={{ color: '#EAEAEA' }}>
                Prestige Auto Nice
              </div>
              <div className="text-[12px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
                En route vers votre position
              </div>
            </div>
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#2ECC71' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
