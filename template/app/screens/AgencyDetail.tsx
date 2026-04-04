import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Share2, MapPin, Star, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { agencies, vehicles, reviews } from '../data/mockData';

const vehicleImages = [
  'https://images.unsplash.com/photo-1654159866733-09f0614c3b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1629086314381-8f4c852a3c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1771670305417-41ab8254689e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1506616995931-556bc0c90c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1648482845536-8882f465df95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1648571902986-fd8cd71256b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
];

export default function AgencyDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'vehicles' | 'reviews'>('vehicles');
  const navigate = useNavigate();
  
  const agency = agencies.find(a => a.id === id);
  const agencyVehicles = vehicles.filter(v => v.agencyId === id);
  const agencyReviews = reviews.filter(r => r.agencyId === id);
  
  if (!agency) return null;
  
  return (
    <div className="min-h-screen pb-6" style={{ background: '#050404' }}>
      {/* Hero */}
      <div className="relative h-[240px]">
        <img 
          src={vehicleImages[Number(id) - 1]}
          alt={agency.name}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(5, 4, 4, 0.9) 0%, transparent 60%)'
          }}
        />
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-5 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(46, 28, 43, 0.8)' }}
        >
          <ArrowLeft size={20} style={{ color: '#EAEAEA' }} />
        </button>
        
        <button 
          className="absolute top-8 right-5 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(46, 28, 43, 0.8)' }}
        >
          <Share2 size={20} style={{ color: '#EAEAEA' }} />
        </button>
        
        <div 
          className="absolute bottom-0 left-5 translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-[20px] font-bold"
          style={{ background: '#4A1942', color: '#EAEAEA', border: '3px solid #050404' }}
        >
          {agency.logo}
        </div>
      </div>
      
      <div className="px-5 pt-10">
        <h1 className="text-[22px] font-bold mb-2" style={{ color: '#EAEAEA' }}>
          {agency.name}
        </h1>
        
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={16} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
          <span className="text-[14px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
            {agency.address}
          </span>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star size={16} fill="#F1C40F" style={{ color: '#F1C40F' }} />
            <span className="text-[16px] font-semibold" style={{ color: '#EAEAEA' }}>
              {agency.rating}
            </span>
            <span className="text-[13px]" style={{ color: 'rgba(234, 234, 234, 0.5)' }}>
              ({agency.reviews} avis)
            </span>
          </div>
          <div 
            className="flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-medium"
            style={{ background: 'rgba(46, 204, 113, 0.15)', color: '#2ECC71' }}
          >
            <CheckCircle size={12} />
            Agence vérifiée
          </div>
        </div>
        
        <p className="text-[14px] leading-relaxed mb-4" style={{ color: 'rgba(234, 234, 234, 0.7)' }}>
          {agency.description}
        </p>
        
        {/* Tabs */}
        <div className="flex border-b mb-6" style={{ borderColor: 'rgba(234, 234, 234, 0.1)' }}>
          <button
            onClick={() => setActiveTab('vehicles')}
            className="flex-1 pb-3 text-[15px] font-medium relative"
            style={{ color: activeTab === 'vehicles' ? '#EAEAEA' : 'rgba(234, 234, 234, 0.4)' }}
          >
            Véhicules
            {activeTab === 'vehicles' && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full"
                style={{ background: '#4A1942' }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className="flex-1 pb-3 text-[15px] font-medium relative"
            style={{ color: activeTab === 'reviews' ? '#EAEAEA' : 'rgba(234, 234, 234, 0.4)' }}
          >
            Avis
            {activeTab === 'reviews' && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full"
                style={{ background: '#4A1942' }}
              />
            )}
          </button>
        </div>
        
        {/* Vehicles Tab */}
        {activeTab === 'vehicles' && (
          <div>
            <p className="text-[14px] mb-4" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
              {agencyVehicles.length} véhicules disponibles
            </p>
            <div className="grid grid-cols-2 gap-3">
              {agencyVehicles.map((vehicle, index) => (
                <button
                  key={vehicle.id}
                  onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                  className="rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(234, 234, 234, 0.08)' }}
                >
                  <img 
                    src={vehicleImages[Number(vehicle.id) - 1]}
                    alt={vehicle.name}
                    className="w-full h-[100px] object-cover"
                  />
                  <div className="p-2" style={{ background: '#2E1C2B' }}>
                    <div className="text-[14px] font-semibold mb-1 truncate text-left" style={{ color: '#EAEAEA' }}>
                      {vehicle.name}
                    </div>
                    <div className="text-[15px] font-semibold text-left" style={{ color: '#EAEAEA' }}>
                      {vehicle.price} € <span className="text-[11px] font-normal" style={{ color: 'rgba(234, 234, 234, 0.5)' }}>/ jour</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <div className="text-center mb-6 p-6 rounded-2xl" style={{ background: '#2E1C2B' }}>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-[40px] font-bold" style={{ color: '#EAEAEA' }}>
                  {agency.rating}
                </span>
                <span className="text-[20px]" style={{ color: 'rgba(234, 234, 234, 0.5)' }}>
                  /5
                </span>
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="#F1C40F" style={{ color: '#F1C40F' }} />
                ))}
              </div>
              <p className="text-[13px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
                Basé sur {agency.reviews} avis
              </p>
            </div>
            
            <div className="space-y-4">
              {agencyReviews.map((review) => (
                <div 
                  key={review.id}
                  className="p-4 rounded-xl"
                  style={{ background: '#2E1C2B' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-semibold"
                        style={{ background: '#4A1942', color: '#EAEAEA' }}
                      >
                        {review.userName[0]}
                      </div>
                      <span className="text-[14px] font-semibold" style={{ color: '#EAEAEA' }}>
                        {review.userName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="#F1C40F" style={{ color: '#F1C40F' }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[14px] mb-2" style={{ color: 'rgba(234, 234, 234, 0.7)' }}>
                    {review.comment}
                  </p>
                  <p className="text-[11px]" style={{ color: 'rgba(234, 234, 234, 0.4)' }}>
                    {review.date}
                  </p>
                  
                  {review.agencyResponse && (
                    <div 
                      className="mt-3 p-3 rounded-lg"
                      style={{ background: 'rgba(74, 25, 66, 0.15)' }}
                    >
                      <p className="text-[12px] font-medium mb-1" style={{ color: 'rgba(234, 234, 234, 0.8)' }}>
                        Réponse de l'agence
                      </p>
                      <p className="text-[13px]" style={{ color: 'rgba(234, 234, 234, 0.7)' }}>
                        {review.agencyResponse}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
