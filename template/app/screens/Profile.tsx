import { BottomNav } from '../components/BottomNav';
import { User, ChevronRight, CreditCard, FileText, Bell, Globe, Moon, Sun, LogOut, Gift, TrendingUp, TrendingDown } from 'lucide-react';
import { loyaltyTiers, loyaltyHistory } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export default function Profile() {
  const currentPoints = 2480;
  const currentTier = loyaltyTiers[1];
  const nextTier = loyaltyTiers[2];
  const { theme, toggleTheme, colors } = useTheme();
  
  return (
    <div className="min-h-screen pb-[80px]" style={{ background: colors.background }}>
      {/* Header */}
      <div 
        className="px-5 pt-12 pb-8 text-center rounded-b-3xl"
        style={{ background: colors.surface }}
      >
        <div 
          className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-[28px] font-bold"
          style={{ background: colors.primary, color: colors.text, border: `3px solid ${colors.border}` }}
        >
          JD
        </div>
        <h2 className="text-[18px] font-semibold mb-1" style={{ color: colors.text }}>
          Jean-Pierre Dupont
        </h2>
        <p className="text-[13px] mb-3" style={{ color: colors.textSecondary }}>
          Membre depuis Janvier 2024
        </p>
        <div 
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-medium"
          style={{ background: 'rgba(46, 204, 113, 0.15)', color: '#2ECC71' }}
        >
          Vérifié
        </div>
      </div>
      
      <div className="px-5 py-6 space-y-6">
        {/* Loyalty Card */}
        <div 
          className="p-6 rounded-2xl"
          style={{ background: theme === 'dark' ? 'linear-gradient(135deg, #2E1C2B 0%, #4A1942 100%)' : 'linear-gradient(135deg, #4A1942 0%, #6A2959 100%)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Gift size={20} style={{ color: '#EAEAEA' }} />
            <h3 className="text-[16px] font-semibold" style={{ color: '#EAEAEA' }}>
              Programme MyFleet
            </h3>
          </div>
          <div className="text-[32px] font-bold mb-2" style={{ color: '#EAEAEA' }}>
            {currentPoints.toLocaleString()} points
          </div>
          <p className="text-[13px] mb-4" style={{ color: 'rgba(234, 234, 234, 0.8)' }}>
            Prochain palier : {nextTier.name} — {nextTier.points.toLocaleString()} points
          </p>
          
          {/* Current Tier Benefits */}
          <div 
            className="p-4 rounded-xl"
            style={{ background: 'rgba(5, 4, 4, 0.3)' }}
          >
            <div className="text-[14px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
              Vos avantages — {currentTier.name}
            </div>
            {currentTier.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#EAEAEA' }} />
                <span className="text-[13px]" style={{ color: 'rgba(234, 234, 234, 0.9)' }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Loyalty History */}
        <div>
          <h3 className="text-[17px] font-semibold mb-3 px-1" style={{ color: colors.text }}>
            Historique fidélité
          </h3>
          <div className="space-y-2">
            {loyaltyHistory.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: colors.surface }}
              >
                <div className="flex items-center gap-3">
                  {item.type === 'earned' ? (
                    <TrendingUp size={20} style={{ color: '#2ECC71' }} />
                  ) : (
                    <TrendingDown size={20} style={{ color: '#E74C3C' }} />
                  )}
                  <div>
                    <div className="text-[14px] font-medium" style={{ color: colors.text }}>
                      {item.description}
                    </div>
                    <div className="text-[12px]" style={{ color: colors.textSecondary }}>
                      {item.date}
                    </div>
                  </div>
                </div>
                <span 
                  className="text-[16px] font-semibold"
                  style={{ color: item.type === 'earned' ? '#2ECC71' : '#E74C3C' }}
                >
                  {item.amount > 0 ? '+' : ''}{item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mon compte */}
        <div 
          className="rounded-xl overflow-hidden"
          style={{ background: colors.surface }}
        >
          {[
            { icon: User, label: 'Mes informations personnelles' },
            { icon: CreditCard, label: 'Mes cartes bancaires' },
            { icon: FileText, label: 'Mes documents' },
          ].map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 border-b last:border-b-0"
              style={{ borderColor: colors.border }}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} style={{ color: colors.textSecondary }} />
                <span className="text-[15px]" style={{ color: colors.text }}>
                  {item.label}
                </span>
              </div>
              <ChevronRight size={20} style={{ color: colors.textSecondary }} />
            </button>
          ))}
        </div>
        
        {/* Préférences */}
        <div 
          className="rounded-xl overflow-hidden"
          style={{ background: colors.surface }}
        >
          {[
            { icon: Bell, label: 'Notifications', hasToggle: true, isNotification: true },
            { icon: Globe, label: 'Langue', value: 'Français' },
            { icon: theme === 'dark' ? Moon : Sun, label: 'Mode sombre', hasToggle: true, isTheme: true },
          ].map((item, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between p-4 border-b last:border-b-0"
              style={{ borderColor: colors.border }}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} style={{ color: colors.textSecondary }} />
                <span className="text-[15px]" style={{ color: colors.text }}>
                  {item.label}
                </span>
              </div>
              {item.hasToggle ? (
                <button
                  onClick={item.isTheme ? toggleTheme : undefined}
                  className="w-12 h-7 rounded-full relative transition-all"
                  style={{ background: theme === 'dark' ? colors.primary : 'rgba(0, 0, 0, 0.1)' }}
                >
                  <div 
                    className="absolute top-1 w-5 h-5 rounded-full transition-all"
                    style={{ 
                      background: colors.text,
                      left: theme === 'dark' ? '24px' : '4px'
                    }}
                  />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-[14px]" style={{ color: colors.textSecondary }}>
                    {item.value}
                  </span>
                  <ChevronRight size={20} style={{ color: colors.textSecondary }} />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Actions */}
        <button className="w-full py-4 text-[15px] font-medium flex items-center justify-center gap-2">
          <LogOut size={20} style={{ color: '#E74C3C' }} />
          <span style={{ color: '#E74C3C' }}>Se déconnecter</span>
        </button>
      </div>
      
      <BottomNav />
    </div>
  );
}