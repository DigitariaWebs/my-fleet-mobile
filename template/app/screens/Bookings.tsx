import { useState } from 'react';
import { BottomNav } from '../components/BottomNav';
import { Calendar, MapPin, ChevronRight, Clock } from 'lucide-react';
import { bookings } from '../data/mockData';
import { useNavigate } from 'react-router';
import { useTheme } from '../context/ThemeContext';

const vehicleImages = [
  'https://images.unsplash.com/photo-1654159866733-09f0614c3b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1629086314381-8f4c852a3c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1771670305417-41ab8254689e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1506616995931-556bc0c90c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1648482845536-8882f465df95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1648571902986-fd8cd71256b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
];

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'history'>('active');
  const navigate = useNavigate();
  const { colors, theme } = useTheme();
  
  const tabs = [
    { key: 'active' as const, label: 'En cours' },
    { key: 'upcoming' as const, label: 'À venir' },
    { key: 'history' as const, label: 'Historique' }
  ];
  
  const statusStyles = {
    active: { bg: 'rgba(74, 25, 66, 0.3)', color: '#4A1942', border: 'rgba(74, 25, 66, 0.5)' },
    confirmed: { bg: 'rgba(46, 204, 113, 0.2)', color: '#2ECC71', border: 'rgba(46, 204, 113, 0.4)' },
    completed: { 
      bg: theme === 'dark' ? 'rgba(234, 234, 234, 0.15)' : 'rgba(0, 0, 0, 0.1)', 
      color: theme === 'dark' ? 'rgba(234, 234, 234, 0.6)' : 'rgba(0, 0, 0, 0.5)', 
      border: theme === 'dark' ? 'rgba(234, 234, 234, 0.2)' : 'rgba(0, 0, 0, 0.15)' 
    }
  };
  
  return (
    <div className="min-h-screen pb-[80px]" style={{ background: colors.background }}>
      <div className="px-5 py-8">
        <h1 className="text-[22px] font-bold mb-6" style={{ color: colors.text }}>
          Mes réservations
        </h1>
        
        {/* Tabs */}
        <div className="flex border-b mb-6" style={{ borderColor: colors.border }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 pb-3 text-[15px] font-medium relative"
              style={{ color: activeTab === tab.key ? colors.text : colors.textSecondary }}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full"
                  style={{ background: colors.primary }}
                />
              )}
            </button>
          ))}
        </div>
        
        {/* Booking Cards */}
        <div className="space-y-5">
          {bookings.map((booking, index) => {
            const statusStyle = statusStyles[booking.status as keyof typeof statusStyles] || statusStyles.completed;
            
            return (
              <button
                key={booking.id}
                onClick={() => navigate(`/tracking/${booking.id}`)}
                className="w-full rounded-2xl overflow-hidden border transition-all active:scale-[0.98]"
                style={{ 
                  background: theme === 'dark' 
                    ? 'linear-gradient(135deg, #2E1C2B 0%, rgba(46, 28, 43, 0.8) 100%)' 
                    : 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)',
                  borderColor: theme === 'dark' ? 'rgba(74, 25, 66, 0.3)' : 'rgba(0, 0, 0, 0.1)',
                  boxShadow: theme === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Image Section */}
                <div className="relative w-full h-[180px] overflow-hidden">
                  <img 
                    src={vehicleImages[index % vehicleImages.length]}
                    alt={booking.vehicleName}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      background: theme === 'dark' 
                        ? 'linear-gradient(180deg, transparent 0%, rgba(5, 4, 4, 0.7) 100%)'
                        : 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%)'
                    }}
                  />
                  {/* Status badge on image */}
                  <div 
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-[12px] font-semibold backdrop-blur-md border"
                    style={{
                      background: statusStyle.bg,
                      color: statusStyle.color,
                      borderColor: statusStyle.border
                    }}
                  >
                    {booking.status === 'active' && 'En cours'}
                    {booking.status === 'confirmed' && 'Confirmée'}
                    {booking.status === 'completed' && 'Terminée'}
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-[17px] font-bold mb-1 text-left" style={{ color: colors.text }}>
                        {booking.vehicleName}
                      </h3>
                      <p className="text-[13px] text-left flex items-center gap-1.5" style={{ color: colors.textSecondary }}>
                        <MapPin size={12} />
                        {booking.agencyName}
                      </p>
                    </div>
                    <ChevronRight size={20} style={{ color: colors.textSecondary }} />
                  </div>
                  
                  {/* Date */}
                  <div 
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg mb-4"
                    style={{ background: 'rgba(74, 25, 66, 0.15)' }}
                  >
                    <Calendar size={16} style={{ color: colors.primary }} />
                    <span className="text-[13px] font-medium" style={{ color: colors.text }}>
                      {booking.startDate} — {booking.endDate}
                    </span>
                  </div>
                  
                  {/* Footer - Price and Action */}
                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: colors.border }}>
                    <div>
                      <div className="text-[12px] mb-0.5" style={{ color: colors.textSecondary }}>
                        Total
                      </div>
                      <div className="text-[20px] font-bold" style={{ color: colors.text }}>
                        {booking.total} €
                      </div>
                    </div>
                    <div 
                      className="px-5 py-2.5 rounded-lg text-[13px] font-semibold"
                      style={{ background: colors.primary, color: '#EAEAEA' }}
                    >
                      Voir détails
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}