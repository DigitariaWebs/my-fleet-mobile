import { useNavigate } from 'react-router';
import { ArrowLeft, Star } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { agencies } from '../data/mockData';

const vehicleImages = [
  'https://images.unsplash.com/photo-1654159866733-09f0614c3b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1629086314381-8f4c852a3c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1771670305417-41ab8254689e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1506616995931-556bc0c90c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
];

export default function AgencyList() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen pb-[80px]" style={{ background: '#050404' }}>
      <div className="px-5 py-8">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} style={{ color: '#EAEAEA' }} />
          </button>
          <h1 className="text-[20px] font-bold" style={{ color: '#EAEAEA' }}>
            Agences
          </h1>
        </div>
        
        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6">
          {['Toutes', 'Nice', 'Cannes', 'Monaco', 'Antibes'].map((city, index) => (
            <button
              key={city}
              className="flex-shrink-0 px-4 h-[36px] rounded-full text-[13px] font-medium"
              style={{
                background: index === 0 ? '#4A1942' : '#2E1C2B',
                border: index === 0 ? 'none' : '1px solid rgba(234, 234, 234, 0.1)',
                color: '#EAEAEA'
              }}
            >
              {city}
            </button>
          ))}
        </div>
        
        {/* Agency Cards */}
        <div className="space-y-3">
          {agencies.map((agency, index) => (
            <button
              key={agency.id}
              onClick={() => navigate(`/agency/${agency.id}`)}
              className="w-full rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(234, 234, 234, 0.08)' }}
            >
              <div className="h-[100px] relative">
                <img 
                  src={vehicleImages[index]}
                  alt={agency.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div 
                className="px-4 py-3 relative"
                style={{ background: '#2E1C2B' }}
              >
                <div 
                  className="absolute -top-6 left-4 w-11 h-11 rounded-full flex items-center justify-center text-[16px] font-semibold"
                  style={{ background: '#4A1942', color: '#EAEAEA', border: '3px solid #2E1C2B' }}
                >
                  {agency.logo}
                </div>
                <div className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-[16px] font-semibold mb-1 text-left" style={{ color: '#EAEAEA' }}>
                        {agency.name}
                      </div>
                      <div className="text-[13px] text-left" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
                        {agency.city} — {agency.vehicles} véhicules
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} fill="#F1C40F" style={{ color: '#F1C40F' }} />
                      <span className="text-[14px] font-semibold" style={{ color: '#EAEAEA' }}>
                        {agency.rating}
                      </span>
                      <span className="text-[12px]" style={{ color: 'rgba(234, 234, 234, 0.5)' }}>
                        ({agency.reviews} avis)
                      </span>
                    </div>
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
