import { useParams, useNavigate } from 'react-router';
import { Calendar, Clock, MapPin, User, Receipt, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';

export default function Confirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen" style={{ background: '#050404' }}>
      <div className="px-5 py-8 text-center">
        <div className="mb-6">
          <span className="text-[13px] font-medium" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
            3/3
          </span>
        </div>
        
        <div 
          className="h-1 rounded-full mb-8 overflow-hidden max-w-[200px] mx-auto"
          style={{ background: 'rgba(234, 234, 234, 0.1)' }}
        >
          <div 
            className="h-full"
            style={{ width: '100%', background: '#4A1942' }}
          />
        </div>
        
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(46, 204, 113, 0.15)' }}
        >
          <CheckCircle size={40} style={{ color: '#2ECC71' }} />
        </div>
        
        <h1 className="text-[24px] font-bold mb-2" style={{ color: '#EAEAEA' }}>
          Réservation confirmée
        </h1>
        <p className="text-[15px] mb-6 max-w-[300px] mx-auto" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
          Votre véhicule est réservé. Vous recevrez un e-mail de confirmation.
        </p>
        
        <div 
          className="inline-flex px-4 py-2 rounded-full mb-8"
          style={{ background: 'rgba(74, 25, 66, 0.2)', color: '#4A1942' }}
        >
          <span className="text-[16px] font-semibold">Réf. #MF-2026-0847</span>
        </div>
        
        {/* Booking Summary */}
        <div 
          className="p-5 rounded-2xl mb-6 text-left"
          style={{ background: '#2E1C2B' }}
        >
          <div className="flex items-center gap-3 pb-4 mb-4" style={{ borderBottom: '1px solid rgba(234, 234, 234, 0.1)' }}>
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ background: '#4A1942' }}
            >
              <span className="text-[20px]">🏎️</span>
            </div>
            <div>
              <div className="text-[16px] font-semibold mb-1" style={{ color: '#EAEAEA' }}>
                Porsche 911 Carrera S
              </div>
              <div className="text-[13px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
                Prestige Auto Nice
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar size={18} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
              <span className="text-[14px]" style={{ color: '#EAEAEA' }}>
                12 – 15 Juin 2026
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={18} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
              <span className="text-[14px]" style={{ color: '#EAEAEA' }}>
                10:00 – 18:00
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
              <span className="text-[14px]" style={{ color: '#EAEAEA' }}>
                Livraison : 14 Rue de France, Nice
              </span>
            </div>
            <div className="flex items-center gap-3">
              <User size={18} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
              <span className="text-[14px]" style={{ color: '#EAEAEA' }}>
                Avec chauffeur
              </span>
            </div>
            <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid rgba(234, 234, 234, 0.1)' }}>
              <Receipt size={18} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
              <span className="text-[16px] font-semibold" style={{ color: '#EAEAEA' }}>
                Total : 1 370 €
              </span>
            </div>
          </div>
        </div>
        
        <Button fullWidth onClick={() => navigate(`/tracking/${id}`)}>
          Suivre ma réservation
        </Button>
        <button 
          onClick={() => navigate('/home')}
          className="w-full py-4 text-[15px] font-medium"
          style={{ color: 'rgba(234, 234, 234, 0.6)' }}
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
