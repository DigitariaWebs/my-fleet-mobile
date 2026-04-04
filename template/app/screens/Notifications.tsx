import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { notifications } from '../data/mockData';
import { Calendar, Truck, Gift, Shield, Star } from 'lucide-react';

const iconMap = {
  booking: Calendar,
  delivery: Truck,
  loyalty: Gift,
  kyc: Shield,
  review: Star
};

const colorMap = {
  booking: 'rgba(46, 204, 113, 0.15)',
  delivery: 'rgba(74, 25, 66, 0.2)',
  loyalty: 'rgba(241, 196, 15, 0.15)',
  kyc: 'rgba(243, 156, 18, 0.15)',
  review: 'rgba(234, 234, 234, 0.1)'
};

export default function Notifications() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen" style={{ background: '#050404' }}>
      <div className="px-5 py-8">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} style={{ color: '#EAEAEA' }} />
          </button>
          <h1 className="text-[22px] font-bold" style={{ color: '#EAEAEA' }}>
            Notifications
          </h1>
        </div>
        
        <div className="space-y-2">
          {notifications.map((notif) => {
            const Icon = iconMap[notif.type as keyof typeof iconMap];
            const bgColor = colorMap[notif.type as keyof typeof colorMap];
            
            return (
              <button
                key={notif.id}
                className="w-full p-4 rounded-xl flex items-center gap-3"
                style={{ background: notif.read ? '#050404' : '#2E1C2B' }}
              >
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: bgColor }}
                >
                  <Icon size={18} style={{ color: '#EAEAEA' }} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[14px] leading-relaxed" style={{ color: '#EAEAEA' }}>
                    {notif.title}
                  </p>
                  <p className="text-[11px] mt-1" style={{ color: 'rgba(234, 234, 234, 0.4)' }}>
                    Il y a {notif.time}
                  </p>
                </div>
                {!notif.read && (
                  <div 
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: '#4A1942' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
