import { useNavigate } from 'react-router';
import { ArrowLeft, Lock, Shield } from 'lucide-react';
import { Button } from '../components/Button';

export default function Payment() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen" style={{ background: '#050404' }}>
      <div className="px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={24} style={{ color: '#EAEAEA' }} />
            </button>
            <h1 className="text-[20px] font-bold" style={{ color: '#EAEAEA' }}>
              Paiement
            </h1>
          </div>
          <span className="text-[13px] font-medium" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
            2/3
          </span>
        </div>
        
        <div 
          className="h-1 rounded-full mb-8 overflow-hidden"
          style={{ background: 'rgba(234, 234, 234, 0.1)' }}
        >
          <div 
            className="h-full"
            style={{ width: '66%', background: '#4A1942' }}
          />
        </div>
        
        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="text-[17px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
            Moyen de paiement
          </h3>
          
          <button 
            className="w-full p-4 rounded-xl mb-3"
            style={{ 
              background: 'linear-gradient(135deg, #2E1C2B 0%, #4A1942 100%)',
              border: '2px solid #4A1942'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-[14px] mb-1" style={{ color: 'rgba(234, 234, 234, 0.8)' }}>
                  **** **** **** 4242
                </div>
                <div className="text-[12px]" style={{ color: 'rgba(234, 234, 234, 0.5)' }}>
                  Exp: 09/27
                </div>
              </div>
              <div className="text-[14px] font-semibold" style={{ color: '#EAEAEA' }}>
                VISA
              </div>
            </div>
          </button>
          
          <button 
            className="w-full p-4 rounded-xl border-2 border-dashed flex items-center justify-center gap-2"
            style={{ borderColor: 'rgba(234, 234, 234, 0.15)' }}
          >
            <span className="text-[14px] font-medium" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
              + Ajouter une carte
            </span>
          </button>
        </div>
        
        {/* Security Indicators */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Lock size={16} style={{ color: 'rgba(234, 234, 234, 0.4)' }} />
            <span className="text-[11px]" style={{ color: 'rgba(234, 234, 234, 0.4)' }}>
              Paiement sécurisé
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={16} style={{ color: 'rgba(234, 234, 234, 0.4)' }} />
            <span className="text-[11px]" style={{ color: 'rgba(234, 234, 234, 0.4)' }}>
              Protection garantie
            </span>
          </div>
        </div>
        
        <Button fullWidth onClick={() => navigate('/confirmation/1')}>
          Confirmer et payer — 1 370 €
        </Button>
      </div>
    </div>
  );
}
