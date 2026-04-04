import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Clock, MapPin, Home, Truck } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { vehicles } from '../data/mockData';

export default function Booking() {
  const { id } = useParams();
  const [pickupMethod, setPickupMethod] = useState<'agency' | 'delivery'>('agency');
  const [withChauffeur, setWithChauffeur] = useState(false);
  const navigate = useNavigate();
  
  const vehicle = vehicles.find(v => v.id === id);
  if (!vehicle) return null;
  
  const days = 3;
  const vehicleTotal = vehicle.price * days;
  const deliveryFee = pickupMethod === 'delivery' ? 50 : 0;
  const chauffeurFee = withChauffeur ? (vehicle.chauffeurPrice || 0) * days : 0;
  const total = vehicleTotal + deliveryFee + chauffeurFee;
  
  return (
    <div className="min-h-screen pb-6" style={{ background: '#050404' }}>
      <div className="px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={24} style={{ color: '#EAEAEA' }} />
            </button>
            <h1 className="text-[20px] font-bold" style={{ color: '#EAEAEA' }}>
              Réservation
            </h1>
          </div>
          <span className="text-[13px] font-medium" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
            1/3
          </span>
        </div>
        
        {/* Progress Bar */}
        <div 
          className="h-1 rounded-full mb-8 overflow-hidden"
          style={{ background: 'rgba(234, 234, 234, 0.1)' }}
        >
          <div 
            className="h-full"
            style={{ width: '33%', background: '#4A1942' }}
          />
        </div>
        
        {/* Dates Section */}
        <div className="mb-6">
          <h3 className="text-[17px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
            Dates de location
          </h3>
          <div 
            className="p-4 rounded-xl"
            style={{ background: '#2E1C2B' }}
          >
            <div className="text-center py-2">
              <Calendar size={40} style={{ color: '#4A1942', margin: '0 auto' }} />
              <p className="text-[14px] font-semibold mt-3" style={{ color: '#EAEAEA' }}>
                12 Juin — 15 Juin (3 jours)
              </p>
              <button className="text-[13px] mt-2" style={{ color: '#4A1942' }}>
                Modifier
              </button>
            </div>
          </div>
        </div>
        
        {/* Time Selection */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[13px] font-medium mb-2" style={{ color: 'rgba(234, 234, 234, 0.8)' }}>
              Heure de prise en charge
            </label>
            <div 
              className="p-3 rounded-xl flex items-center justify-between"
              style={{ background: '#2E1C2B', border: '1px solid rgba(234, 234, 234, 0.1)' }}
            >
              <Clock size={18} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
              <span className="text-[15px]" style={{ color: '#EAEAEA' }}>10:00</span>
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-2" style={{ color: 'rgba(234, 234, 234, 0.8)' }}>
              Heure de retour
            </label>
            <div 
              className="p-3 rounded-xl flex items-center justify-between"
              style={{ background: '#2E1C2B', border: '1px solid rgba(234, 234, 234, 0.1)' }}
            >
              <Clock size={18} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
              <span className="text-[15px]" style={{ color: '#EAEAEA' }}>18:00</span>
            </div>
          </div>
        </div>
        
        {/* Pickup Method */}
        <div className="mb-6">
          <h3 className="text-[17px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
            Mode de récupération
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPickupMethod('agency')}
              className="p-4 rounded-xl flex flex-col items-center gap-2 transition-all"
              style={{ 
                background: '#2E1C2B',
                border: pickupMethod === 'agency' ? '2px solid #4A1942' : '1px solid rgba(234, 234, 234, 0.1)'
              }}
            >
              <Home size={28} style={{ color: pickupMethod === 'agency' ? '#4A1942' : 'rgba(234, 234, 234, 0.6)' }} />
              <span className="text-[14px] font-medium" style={{ color: '#EAEAEA' }}>
                En agence
              </span>
            </button>
            <button
              onClick={() => setPickupMethod('delivery')}
              className="p-4 rounded-xl flex flex-col items-center gap-2 transition-all"
              style={{ 
                background: '#2E1C2B',
                border: pickupMethod === 'delivery' ? '2px solid #4A1942' : '1px solid rgba(234, 234, 234, 0.1)'
              }}
            >
              <Truck size={28} style={{ color: pickupMethod === 'delivery' ? '#4A1942' : 'rgba(234, 234, 234, 0.6)' }} />
              <span className="text-[14px] font-medium" style={{ color: '#EAEAEA' }}>
                Livraison
              </span>
              <span className="text-[12px]" style={{ color: 'rgba(234, 234, 234, 0.5)' }}>
                +50 €
              </span>
            </button>
          </div>
        </div>
        
        {/* Chauffeur Option */}
        <div 
          className="p-4 rounded-xl mb-6 flex items-center justify-between"
          style={{ background: '#2E1C2B' }}
        >
          <div>
            <div className="text-[15px] font-semibold mb-1" style={{ color: '#EAEAEA' }}>
              Ajouter un chauffeur privé
            </div>
            <div className="text-[13px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
              +{vehicle.chauffeurPrice} € / jour
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
        
        {/* Order Summary */}
        <div 
          className="p-4 rounded-xl mb-6"
          style={{ background: '#2E1C2B' }}
        >
          <h3 className="text-[17px] font-semibold mb-4" style={{ color: '#EAEAEA' }}>
            Récapitulatif
          </h3>
          
          <div className="flex items-center gap-3 pb-4 mb-4" style={{ borderBottom: '1px solid rgba(234, 234, 234, 0.1)' }}>
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <div className="w-full h-full" style={{ background: '#4A1942' }} />
            </div>
            <div className="flex-1">
              <div className="text-[14px] font-semibold" style={{ color: '#EAEAEA' }}>
                {vehicle.name}
              </div>
              <div className="text-[12px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
                {vehicle.agencyName}
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-[14px]">
              <span style={{ color: 'rgba(234, 234, 234, 0.7)' }}>Location ({days} jours)</span>
              <span style={{ color: '#EAEAEA' }}>{vehicleTotal} €</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between text-[14px]">
                <span style={{ color: 'rgba(234, 234, 234, 0.7)' }}>Livraison à domicile</span>
                <span style={{ color: '#EAEAEA' }}>{deliveryFee} €</span>
              </div>
            )}
            {chauffeurFee > 0 && (
              <div className="flex justify-between text-[14px]">
                <span style={{ color: 'rgba(234, 234, 234, 0.7)' }}>Chauffeur ({days} jours)</span>
                <span style={{ color: '#EAEAEA' }}>{chauffeurFee} €</span>
              </div>
            )}
          </div>
          
          <div 
            className="flex justify-between pt-4 text-[18px] font-semibold"
            style={{ borderTop: '1px solid rgba(234, 234, 234, 0.1)', color: '#EAEAEA' }}
          >
            <span>Total</span>
            <span>{total} €</span>
          </div>
        </div>
        
        <Button fullWidth onClick={() => navigate('/payment')}>
          Continuer vers le paiement
        </Button>
      </div>
    </div>
  );
}
