import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bell, Search, SlidersHorizontal, MapPin, Calendar, Star } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { agencies, vehicles, categories } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const vehicleImages = [
  'https://images.unsplash.com/photo-1654159866733-09f0614c3b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1629086314381-8f4c852a3c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1771670305417-41ab8254689e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1506616995931-556bc0c90c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1648482845536-8882f465df95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1648571902986-fd8cd71256b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const navigate = useNavigate();
  const { colors, theme } = useTheme();
  
  return (
    <div className="min-h-screen pb-[80px]" style={{ background: colors.background }}>
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-semibold" style={{ color: colors.text }}>
            Bonjour, Jean-Pierre
          </h2>
          <button 
            onClick={() => navigate('/notifications')}
            className="relative"
          >
            <Bell size={24} style={{ color: colors.text }} strokeWidth={1.5} />
            <div 
              className="absolute top-0 right-0 w-2 h-2 rounded-full"
              style={{ background: '#E74C3C' }}
            />
          </button>
        </div>
        
        {/* Search Bar */}
        <button
          onClick={() => navigate('/search')}
          className="w-full h-[48px] rounded-[24px] flex items-center gap-3 px-4 mb-4"
          style={{ 
            background: colors.surface,
            border: `1px solid ${colors.border}`
          }}
        >
          <Search size={20} style={{ color: colors.textSecondary }} strokeWidth={1.5} />
          <span className="flex-1 text-left text-[15px]" style={{ color: colors.textSecondary }}>
            Rechercher un véhicule, une agence...
          </span>
          <SlidersHorizontal size={20} style={{ color: colors.textSecondary }} strokeWidth={1.5} />
        </button>
        
        {/* Quick Filters */}
        <div className="flex gap-2">
          <button 
            className="flex items-center gap-2 px-4 h-[36px] rounded-full"
            style={{ 
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              color: colors.textSecondary
            }}
          >
            <MapPin size={16} strokeWidth={1.5} />
            <span className="text-[13px] font-medium">Nice, France</span>
          </button>
          <button 
            className="flex items-center gap-2 px-4 h-[36px] rounded-full"
            style={{ 
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              color: colors.textSecondary
            }}
          >
            <Calendar size={16} strokeWidth={1.5} />
            <span className="text-[13px] font-medium">12 — 15 Juin</span>
          </button>
        </div>
      </div>
      
      {/* Catégories - Moved to top */}
      <div className="mb-8">
        <div className="px-5 mb-4">
          <h3 className="text-[18px] font-semibold" style={{ color: colors.text }}>
            Catégories
          </h3>
        </div>
        
        <div className="flex gap-2 px-5 overflow-x-auto hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="flex-shrink-0 px-5 h-[36px] rounded-full text-[13px] font-medium transition-all"
              style={{
                background: selectedCategory === category ? colors.primary : colors.surface,
                border: selectedCategory === category ? 'none' : `1px solid ${colors.border}`,
                color: selectedCategory === category ? '#EAEAEA' : colors.text
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Agences populaires */}
      <div className="mb-8">
        <div className="flex items-center justify-between px-5 mb-4">
          <h3 className="text-[18px] font-semibold" style={{ color: colors.text }}>
            Agences populaires
          </h3>
          <button 
            onClick={() => navigate('/agencies')}
            className="text-[13px] font-medium"
            style={{ color: colors.textSecondary }}
          >
            Voir tout
          </button>
        </div>
        
        <div className="flex gap-4 px-5 overflow-x-auto hide-scrollbar">
          {agencies.slice(0, 3).map((agency, index) => (
            <button
              key={agency.id}
              onClick={() => navigate(`/agency/${agency.id}`)}
              className="flex-shrink-0 w-[240px] rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${colors.border}` }}
            >
              <div className="h-[100px] relative">
                <img 
                  src={vehicleImages[index]} 
                  alt={agency.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div 
                className="px-4 py-5 relative"
                style={{ background: colors.surface }}
              >
                <div 
                  className="absolute -top-5 left-4 w-10 h-10 rounded-full flex items-center justify-center text-[16px] font-semibold shadow-lg"
                  style={{ background: colors.primary, color: '#EAEAEA' }}
                >
                  {agency.logo}
                </div>
                <div className="mt-5">
                  <div className="text-[15px] font-semibold mb-2 truncate text-left" style={{ color: colors.text }}>
                    {agency.name}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px]" style={{ color: colors.textSecondary }}>
                      {agency.city}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={14} fill="#F1C40F" style={{ color: '#F1C40F' }} />
                      <span className="text-[13px] font-semibold" style={{ color: colors.text }}>
                        {agency.rating}
                      </span>
                      <span className="text-[11px]" style={{ color: colors.textSecondary }}>
                        ({agency.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Véhicules recommandés */}
      <div className="mb-8">
        <div className="flex items-center justify-between px-5 mb-4">
          <h3 className="text-[18px] font-semibold" style={{ color: colors.text }}>
            Véhicules recommandés
          </h3>
          <button 
            onClick={() => navigate('/agencies')}
            className="text-[13px] font-medium"
            style={{ color: colors.textSecondary }}
          >
            Voir tout
          </button>
        </div>
        
        <div className="flex gap-4 px-5 overflow-x-auto hide-scrollbar">
          {vehicles.map((vehicle, index) => (
            <button
              key={vehicle.id}
              onClick={() => navigate(`/vehicle/${vehicle.id}`)}
              className="flex-shrink-0 w-[280px] rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${colors.border}` }}
            >
              <div className="h-[160px] relative">
                <img 
                  src={vehicleImages[index]}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div 
                className="px-4 py-5"
                style={{ background: colors.surface }}
              >
                <div className="text-[16px] font-semibold mb-2 truncate text-left" style={{ color: colors.text }}>
                  {vehicle.name}
                </div>
                <div className="flex items-center gap-1.5 mb-4 text-[13px]" style={{ color: colors.textSecondary }}>
                  <span>{vehicle.year}</span>
                  <span>•</span>
                  <span>{vehicle.transmission}</span>
                  <span>•</span>
                  <span>{vehicle.fuel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[18px] font-semibold" style={{ color: colors.text }}>
                      {vehicle.price} €
                    </span>
                    <span className="text-[13px]" style={{ color: colors.textSecondary }}>
                      {' '}/ jour
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold"
                      style={{ background: colors.primary, color: '#EAEAEA' }}
                    >
                      {agencies.find(a => a.id === vehicle.agencyId)?.logo}
                    </div>
                    <span className="text-[12px]" style={{ color: colors.textSecondary }}>
                      {vehicle.agencyName.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}