import { useNavigate } from 'react-router';
import { ArrowLeft, Phone, MessageCircle, Navigation } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState, useRef } from 'react';

// Simple animated map component using SVG and Canvas
function AnimatedMapView({ theme }: { theme: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [carPosition, setCarPosition] = useState(0);

  // Define route path points
  const routePoints = [
    { x: 50, y: 350 },
    { x: 100, y: 300 },
    { x: 150, y: 250 },
    { x: 200, y: 200 },
    { x: 250, y: 180 },
    { x: 300, y: 150 },
    { x: 350, y: 120 },
    { x: 380, y: 100 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background map-like pattern
      ctx.fillStyle = theme === 'dark' ? '#1a1a1a' : '#e5e5e5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid pattern
      ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw route line
      ctx.strokeStyle = '#4A1942';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      routePoints.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();

      // Draw start and end markers
      ctx.fillStyle = '#2ECC71';
      ctx.beginPath();
      ctx.arc(routePoints[0].x, routePoints[0].y, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#E74C3C';
      ctx.beginPath();
      ctx.arc(routePoints[routePoints.length - 1].x, routePoints[routePoints.length - 1].y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Calculate car position along route
      const progress = carPosition % 1;
      const segmentIndex = Math.floor(carPosition) % (routePoints.length - 1);
      const currentPoint = routePoints[segmentIndex];
      const nextPoint = routePoints[segmentIndex + 1] || routePoints[0];

      const carX = currentPoint.x + (nextPoint.x - currentPoint.x) * progress;
      const carY = currentPoint.y + (nextPoint.y - currentPoint.y) * progress;

      // Draw car
      ctx.fillStyle = '#4A1942';
      ctx.strokeStyle = '#EAEAEA';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(carX, carY, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw car emoji/icon
      ctx.fillStyle = '#EAEAEA';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🚗', carX, carY);
    };

    animate();
    
    const interval = setInterval(() => {
      setCarPosition((prev) => prev + 0.02);
      animate();
    }, 50);

    return () => clearInterval(interval);
  }, [carPosition, theme]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="w-full h-full object-cover"
      style={{ background: theme === 'dark' ? '#1a1a1a' : '#e5e5e5' }}
    />
  );
}

export default function Tracking() {
  const navigate = useNavigate();
  const { colors, theme } = useTheme();
  
  return (
    <div className="min-h-screen" style={{ background: colors.background }}>
      {/* Map Section with Custom Canvas */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <AnimatedMapView theme={theme} />
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-5 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: colors.surface }}
        >
          <ArrowLeft size={20} style={{ color: colors.text }} />
        </button>
        
        <button 
          onClick={() => navigate(`/tracking-map/1`)}
          className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
          style={{ background: colors.primary }}
        >
          <Navigation size={16} style={{ color: '#EAEAEA' }} />
          <span className="text-[13px] font-semibold" style={{ color: '#EAEAEA' }}>
            Plein écran
          </span>
        </button>
      </div>
      
      {/* Bottom Card */}
      <div 
        className="rounded-t-3xl -mt-6 relative z-20"
        style={{ background: colors.background }}
      >
        <div 
          className="w-10 h-1 rounded-full mx-auto mb-6 mt-3"
          style={{ background: colors.textSecondary }}
        />
        
        <div className="px-5 pb-6">
          {/* Status Timeline */}
          <div className="mb-6">
            <div className="space-y-4">
              {[
                { status: 'Réservation confirmée', time: '12 Juin, 09:00', completed: true },
                { status: 'Véhicule en préparation', time: '12 Juin, 09:30', completed: true },
                { status: 'En route vers vous', time: 'Arrivée estimée : 10:15', active: true },
                { status: 'Livré', time: '', pending: true }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className={`w-4 h-4 rounded-full ${item.active ? 'animate-pulse' : ''}`}
                    style={{ 
                      background: item.completed ? '#2ECC71' : item.active ? colors.primary : colors.border
                    }}
                  />
                  <div className="flex-1">
                    <div className="text-[14px] font-medium" style={{ color: colors.text }}>
                      {item.status}
                    </div>
                    {item.time && (
                      <div className="text-[12px]" style={{ color: colors.textSecondary }}>
                        {item.time}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* ETA */}
          <div className="text-center mb-6">
            <div className="text-[28px] font-bold" style={{ color: colors.text }}>
              15 min
            </div>
            <div className="text-[13px]" style={{ color: colors.textSecondary }}>
              Temps d'arrivée estimé
            </div>
          </div>
          
          {/* Driver Card */}
          <div 
            className="p-4 rounded-xl flex items-center justify-between"
            style={{ background: colors.surface }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-[16px] font-semibold"
                style={{ background: colors.primary, color: '#EAEAEA' }}
              >
                P
              </div>
              <div>
                <div className="text-[14px] font-semibold" style={{ color: colors.text }}>
                  Prestige Auto Nice
                </div>
                <div className="text-[12px]" style={{ color: colors.textSecondary }}>
                  Livraison en cours
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => navigate('/call/1')}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: colors.primary }}
              >
                <Phone size={18} style={{ color: '#EAEAEA' }} />
              </button>
              <button 
                onClick={() => navigate('/messagerie/1')}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: theme === 'dark' ? 'rgba(234, 234, 234, 0.1)' : 'rgba(0, 0, 0, 0.05)' }}
              >
                <MessageCircle size={18} style={{ color: colors.text }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
