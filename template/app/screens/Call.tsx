import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Phone, PhoneOff, Mic, MicOff, Volume2 } from 'lucide-react';

export default function Call() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleEndCall = () => {
    navigate(-1);
  };
  
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-between px-5 py-12"
      style={{ background: 'linear-gradient(180deg, #050404 0%, #1a0a16 100%)' }}
    >
      {/* Top Section */}
      <div className="w-full pt-12">
        <div className="text-center">
          <div className="text-[13px] mb-2" style={{ color: 'rgba(234, 234, 234, 0.5)' }}>
            Appel en cours
          </div>
          <div className="text-[18px] font-semibold mb-8" style={{ color: '#EAEAEA' }}>
            {formatDuration(callDuration)}
          </div>
        </div>
      </div>
      
      {/* Center - Agency Info */}
      <div className="flex flex-col items-center">
        <div 
          className="w-28 h-28 rounded-full flex items-center justify-center mb-6 relative"
          style={{ background: 'linear-gradient(135deg, #4A1942 0%, #7A2968 100%)' }}
        >
          <span className="text-[42px] font-bold" style={{ color: '#EAEAEA' }}>
            P
          </span>
          {/* Pulse animation rings */}
          <div 
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: '#4A1942' }}
          />
          <div 
            className="absolute inset-[-8px] rounded-full animate-pulse opacity-10"
            style={{ background: '#4A1942' }}
          />
        </div>
        
        <h2 className="text-[22px] font-bold mb-2" style={{ color: '#EAEAEA' }}>
          Prestige Auto Nice
        </h2>
        <p className="text-[14px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
          +33 4 93 88 00 00
        </p>
      </div>
      
      {/* Bottom - Controls */}
      <div className="w-full pb-12">
        <div className="flex justify-center gap-6 mb-8">
          {/* Speaker */}
          <button 
            className="flex flex-col items-center gap-2"
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(234, 234, 234, 0.1)' }}
            >
              <Volume2 size={24} style={{ color: '#EAEAEA' }} />
            </div>
            <span className="text-[12px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
              Haut-parleur
            </span>
          </button>
          
          {/* Mute */}
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="flex flex-col items-center gap-2"
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: isMuted ? '#4A1942' : 'rgba(234, 234, 234, 0.1)' }}
            >
              {isMuted ? (
                <MicOff size={24} style={{ color: '#EAEAEA' }} />
              ) : (
                <Mic size={24} style={{ color: '#EAEAEA' }} />
              )}
            </div>
            <span className="text-[12px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
              {isMuted ? 'Muet' : 'Micro'}
            </span>
          </button>
        </div>
        
        {/* End Call Button */}
        <div className="flex justify-center">
          <button 
            onClick={handleEndCall}
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: '#E74C3C' }}
          >
            <PhoneOff size={28} style={{ color: '#EAEAEA' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
