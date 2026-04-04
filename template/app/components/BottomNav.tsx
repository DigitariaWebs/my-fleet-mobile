import { Home, Calendar, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { useTheme } from '../context/ThemeContext';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { colors, theme } = useTheme();
  
  const tabs = [
    { icon: Home, label: 'Accueil', path: '/home' },
    { icon: Calendar, label: 'Réservations', path: '/bookings' },
    { icon: User, label: 'Profil', path: '/profile' },
  ];
  
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto h-[64px] pb-[env(safe-area-inset-bottom)] flex items-center justify-around"
      style={{ 
        background: colors.surface, 
        borderTop: `1px solid ${colors.border}`,
        boxShadow: theme === 'light' ? '0 -2px 10px rgba(0, 0, 0, 0.05)' : 'none'
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path;
        
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center justify-center gap-1 min-w-[60px] relative"
          >
            {isActive && (
              <div className="absolute -top-2 w-1 h-1 rounded-full" style={{ background: colors.primary }} />
            )}
            <Icon 
              size={24} 
              strokeWidth={1.5}
              style={{ color: isActive ? colors.text : colors.textSecondary }} 
            />
            <span 
              className="text-[10px] font-medium"
              style={{ color: isActive ? colors.text : colors.textSecondary }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}