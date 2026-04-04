import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';

export default function Auth() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/otp');
  };
  
  return (
    <div className="min-h-screen w-full px-5 py-8" style={{ background: '#050404' }}>
      {/* Tab Toggle */}
      <div className="flex border-b mb-8" style={{ borderColor: 'rgba(234, 234, 234, 0.1)' }}>
        <button
          onClick={() => setActiveTab('login')}
          className="flex-1 pb-3 text-[15px] font-medium relative"
          style={{ color: activeTab === 'login' ? '#EAEAEA' : 'rgba(234, 234, 234, 0.5)' }}
        >
          Connexion
          {activeTab === 'login' && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full"
              style={{ background: '#4A1942' }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('signup')}
          className="flex-1 pb-3 text-[15px] font-medium relative"
          style={{ color: activeTab === 'signup' ? '#EAEAEA' : 'rgba(234, 234, 234, 0.5)' }}
        >
          Inscription
          {activeTab === 'signup' && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full"
              style={{ background: '#4A1942' }}
            />
          )}
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        {activeTab === 'signup' && (
          <>
            {/* Name Input */}
            <div 
              className="flex items-center gap-3 h-[48px] px-4 rounded-xl"
              style={{ 
                background: '#2E1C2B',
                border: '1px solid rgba(234, 234, 234, 0.1)'
              }}
            >
              <User size={20} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
              <input
                type="text"
                placeholder="Nom complet"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="flex-1 bg-transparent outline-none"
                style={{ color: '#EAEAEA' }}
              />
            </div>
            
            {/* Email Input */}
            <div 
              className="flex items-center gap-3 h-[48px] px-4 rounded-xl"
              style={{ 
                background: '#2E1C2B',
                border: '1px solid rgba(234, 234, 234, 0.1)'
              }}
            >
              <Mail size={20} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
              <input
                type="email"
                placeholder="Adresse e-mail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="flex-1 bg-transparent outline-none"
                style={{ color: '#EAEAEA' }}
              />
            </div>
            
            {/* Phone Input */}
            <div 
              className="flex items-center gap-3 h-[48px] px-4 rounded-xl"
              style={{ 
                background: '#2E1C2B',
                border: '1px solid rgba(234, 234, 234, 0.1)'
              }}
            >
              <Phone size={20} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
              <span className="text-[15px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>+33</span>
              <input
                type="tel"
                placeholder="6 12 34 56 78"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="flex-1 bg-transparent outline-none"
                style={{ color: '#EAEAEA' }}
              />
            </div>
          </>
        )}
        
        {activeTab === 'login' && (
          <div 
            className="flex items-center gap-3 h-[48px] px-4 rounded-xl"
            style={{ 
              background: '#2E1C2B',
              border: '1px solid rgba(234, 234, 234, 0.1)'
            }}
          >
            <Mail size={20} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
            <input
              type="text"
              placeholder="E-mail ou téléphone"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="flex-1 bg-transparent outline-none"
              style={{ color: '#EAEAEA' }}
            />
          </div>
        )}
        
        {/* Password Input */}
        <div 
          className="flex items-center gap-3 h-[48px] px-4 rounded-xl"
          style={{ 
            background: '#2E1C2B',
            border: '1px solid rgba(234, 234, 234, 0.1)'
          }}
        >
          <Lock size={20} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mot de passe"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="flex-1 bg-transparent outline-none"
            style={{ color: '#EAEAEA' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
            ) : (
              <Eye size={20} style={{ color: 'rgba(234, 234, 234, 0.6)' }} />
            )}
          </button>
        </div>
        
        {activeTab === 'login' && (
          <div className="text-right">
            <button 
              type="button"
              className="text-[13px] font-medium"
              style={{ color: 'rgba(234, 234, 234, 0.6)' }}
            >
              Mot de passe oublié ?
            </button>
          </div>
        )}
        
        <div className="pt-2">
          <Button fullWidth type="submit">
            {activeTab === 'signup' ? 'Créer mon compte' : 'Se connecter'}
          </Button>
        </div>
        
        {/* Social Login */}
        <div className="pt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-[1px]" style={{ background: 'rgba(234, 234, 234, 0.1)' }} />
            <span className="text-[13px]" style={{ color: 'rgba(234, 234, 234, 0.5)' }}>
              ou continuer avec
            </span>
            <div className="flex-1 h-[1px]" style={{ background: 'rgba(234, 234, 234, 0.1)' }} />
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 h-[48px] rounded-xl flex items-center justify-center gap-2 font-medium"
              style={{ 
                background: '#2E1C2B',
                border: '1px solid rgba(234, 234, 234, 0.1)',
                color: '#EAEAEA'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
                <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
                <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
                <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex-1 h-[48px] rounded-xl flex items-center justify-center gap-2 font-medium"
              style={{ 
                background: '#2E1C2B',
                border: '1px solid rgba(234, 234, 234, 0.1)',
                color: '#EAEAEA'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#EAEAEA">
                <path d="M17.05 11.29c-.05 5.58-4.88 7.43-7.05 7.43-2.17 0-7-1.85-7.05-7.43C2.9 5.71 7.73 3.86 9.9 3.86c2.17 0 7.1 1.85 7.15 7.43zm-7.05-9.43C4.48 1.86 0 5.29 0 10s4.48 8.14 10 8.14S20 14.71 20 10 15.52 1.86 10 1.86z"/>
              </svg>
              Apple
            </button>
          </div>
        </div>
        
        {/* Bottom Link */}
        <div className="text-center pt-4">
          <span className="text-[14px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
            {activeTab === 'signup' ? 'Déjà un compte ? ' : 'Pas encore de compte ? '}
          </span>
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'signup' ? 'login' : 'signup')}
            className="text-[14px] font-medium underline"
            style={{ color: '#EAEAEA' }}
          >
            {activeTab === 'signup' ? 'Se connecter' : 'S\'inscrire'}
          </button>
        </div>
      </form>
    </div>
  );
}
