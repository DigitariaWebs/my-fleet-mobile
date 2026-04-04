import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Share2, Heart, Gauge, Fuel, Users, DoorClosed, Package, Check, Car } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { vehicles, agencies } from '../data/mockData';

const vehicleImages = [
  'https://images.unsplash.com/photo-1654159866733-09f0614c3b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1629086314381-8f4c852a3c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1771670305417-41ab8254689e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1506616995931-556bc0c90c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1648482845536-8882f465df95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1648571902986-fd8cd71256b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
];

export default function VehicleDetail() {
  const { id } = useParams();
  const [withChauffeur, setWithChauffeur] = useState(false);
  const navigate = useNavigate();
  
  const vehicle = vehicles.find(v => v.id === id);
  const agency = agencies.find(a => a.id === vehicle?.agencyId);
  
  if (!vehicle || !agency) return null;
  
  const specs = [
    { icon: Gauge, label: 'Transmission', value: vehicle.transmission },
    { icon: Fuel, label: 'Carburant', value: vehicle.fuel },
    { icon: Gauge, label: 'Puissance', value: vehicle.power },
    { icon: Users, label: 'Places', value: `${vehicle.seats} places` },
    { icon: DoorClosed, label: 'Portes', value: `${vehicle.doors} portes` },
    { icon: Package, label: 'Coffre', value: vehicle.trunk }
  ];
  
  return (
    <div className="min-h-screen pb-[80px]" style={{ background: '#050404' }}>
      {/* Image Carousel */}
      <div className="relative h-[300px]">
        <img 
          src={vehicleImages[Number(id) - 1]}
          alt={vehicle.name}
          className="w-full h-full object-cover"
        />
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-5 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: 'rgba(46, 28, 43, 0.9)' }}
        >
          <ArrowLeft size={20} style={{ color: '#EAEAEA' }} />
        </button>
        
        <div className="absolute top-8 right-5 flex gap-2">
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: 'rgba(46, 28, 43, 0.9)' }}
          >
            <Share2 size={20} style={{ color: '#EAEAEA' }} />
          </button>
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: 'rgba(46, 28, 43, 0.9)' }}
          >
            <Heart size={20} style={{ color: '#EAEAEA' }} />
          </button>
        </div>
        
        <div 
          className="absolute top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[13px] font-medium"
          style={{ background: 'rgba(5, 4, 4, 0.7)', color: '#EAEAEA' }}
        >
          1/8
        </div>
      </div>
      
      <div className="px-5 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[22px] font-bold mb-1" style={{ color: '#EAEAEA' }}>
            {vehicle.name}
          </h1>
          <p className="text-[15px] mb-3" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
            {vehicle.year}
          </p>
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: '#4A1942' }}
          >
            <span className="text-[24px] font-bold" style={{ color: '#EAEAEA' }}>
              {vehicle.price} €
            </span>
            <span className="text-[14px]" style={{ color: 'rgba(234, 234, 234, 0.8)' }}>
              / jour
            </span>
          </div>
          
          <button 
            onClick={() => navigate(`/agency/${agency.id}`)}
            className="flex items-center gap-2 mt-3"
          >
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold"
              style={{ background: '#4A1942', color: '#EAEAEA' }}
            >
              {agency.logo}
            </div>
            <span className="text-[14px]" style={{ color: 'rgba(234, 234, 234, 0.7)' }}>
              {agency.name}
            </span>
            <Check size={14} style={{ color: '#2ECC71' }} />
          </button>
        </div>
        
        {/* Specifications */}
        <div className="mb-6">
          <h3 className="text-[17px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
            Spécifications
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {specs.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <div 
                  key={index}
                  className="p-3 rounded-xl flex flex-col items-center gap-2"
                  style={{ background: '#2E1C2B' }}
                >
                  <Icon size={24} style={{ color: 'rgba(234, 234, 234, 0.6)' }} strokeWidth={1.5} />
                  <span className="text-[11px]" style={{ color: 'rgba(234, 234, 234, 0.5)' }}>
                    {spec.label}
                  </span>
                  <span className="text-[13px] font-semibold" style={{ color: '#EAEAEA' }}>
                    {spec.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Équipements */}
        <div className="mb-6">
          <h3 className="text-[17px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
            Équipements
          </h3>
          <div className="flex flex-wrap gap-2">
            {vehicle.features.map((feature, index) => (
              <div 
                key={index}
                className="px-4 py-2 rounded-full text-[12px]"
                style={{ 
                  background: '#2E1C2B',
                  border: '1px solid rgba(234, 234, 234, 0.1)',
                  color: '#EAEAEA'
                }}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-6">
          <h3 className="text-[17px] font-semibold mb-2" style={{ color: '#EAEAEA' }}>
            Description
          </h3>
          <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(234, 234, 234, 0.7)' }}>
            {vehicle.description}
          </p>
        </div>
        
        {/* Chauffeur Option */}
        {vehicle.chauffeurAvailable && (
          <div 
            className="p-4 rounded-xl mb-6 flex items-center gap-3"
            style={{ 
              background: '#2E1C2B',
              borderLeft: '4px solid #4A1942'
            }}
          >
            <Car size={24} style={{ color: '#EAEAEA' }} />
            <div className="flex-1">
              <div className="text-[15px] font-semibold mb-1" style={{ color: '#EAEAEA' }}>
                Avec chauffeur privé
              </div>
              <div className="text-[13px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
                +{vehicle.chauffeurPrice} € / jour
              </div>
              <div className="text-[12px] mt-1" style={{ color: 'rgba(234, 234, 234, 0.5)' }}>
                Chauffeur professionnel bilingue français-anglais
              </div>
            </div>
            <button
              onClick={() => setWithChauffeur(!withChauffeur)}
              className="w-12 h-7 rounded-full relative transition-all"
              style={{ background: withChauffeur ? '#4A1942' : 'rgba(234, 234, 234, 0.15)' }}
            >
              <div 
                className="absolute top-1 w-5 h-5 rounded-full transition-all"
                style={{ 
                  background: '#EAEAEA',
                  left: withChauffeur ? 'calc(100% - 24px)' : '4px'
                }}
              />
            </button>
          </div>
        )}
        
        {/* Conditions */}
        <div>
          <h3 className="text-[17px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
            Conditions de location
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[14px]" style={{ color: 'rgba(234, 234, 234, 0.7)' }}>
              <Check size={16} style={{ color: 'rgba(234, 234, 234, 0.5)' }} />
              <span>Age minimum : {vehicle.conditions.minAge} ans</span>
            </div>
            <div className="flex items-center gap-2 text-[14px]" style={{ color: 'rgba(234, 234, 234, 0.7)' }}>
              <Check size={16} style={{ color: 'rgba(234, 234, 234, 0.5)' }} />
              <span>Permis de conduire valide depuis {vehicle.conditions.licenseYears} ans</span>
            </div>
            <div className="flex items-center gap-2 text-[14px]" style={{ color: 'rgba(234, 234, 234, 0.7)' }}>
              <Check size={16} style={{ color: 'rgba(234, 234, 234, 0.5)' }} />
              <span>Caution : {vehicle.conditions.deposit.toLocaleString()} €</span>
            </div>
            <div className="flex items-center gap-2 text-[14px]" style={{ color: 'rgba(234, 234, 234, 0.7)' }}>
              <Check size={16} style={{ color: 'rgba(234, 234, 234, 0.5)' }} />
              <span>Kilométrage : {vehicle.conditions.kmPerDay} km/jour inclus</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sticky Bottom Bar */}
      <div 
        className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto px-5 py-4 flex items-center justify-between gap-4"
        style={{ 
          background: '#2E1C2B',
          borderTop: '1px solid rgba(234, 234, 234, 0.05)'
        }}
      >
        <div>
          <span className="text-[16px] font-semibold" style={{ color: '#EAEAEA' }}>
            {vehicle.price} €
          </span>
          <span className="text-[13px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
            {' '}/ jour
          </span>
        </div>
        <Button onClick={() => navigate(`/booking/${vehicle.id}`)}>
          Réserver
        </Button>
      </div>
    </div>
  );
}