import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';

export default function OTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handleVerify = () => {
    navigate('/kyc');
  };
  
  return (
    <div className="min-h-screen w-full px-5 py-8" style={{ background: '#050404' }}>
      <button onClick={() => navigate(-1)} className="mb-8">
        <ArrowLeft size={24} style={{ color: '#EAEAEA' }} />
      </button>
      
      <h1 className="text-[22px] font-bold mb-2" style={{ color: '#EAEAEA' }}>
        Vérifiez votre numéro
      </h1>
      <p className="text-[14px] mb-8" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
        Un code a été envoyé au +33 6 ** ** **42
      </p>
      
      {/* OTP Input */}
      <div className="flex justify-center gap-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-[48px] h-[52px] text-center text-[24px] font-semibold rounded-xl outline-none transition-all"
            style={{
              background: '#2E1C2B',
              border: digit ? '2px solid #4A1942' : '1px solid rgba(234, 234, 234, 0.1)',
              color: '#EAEAEA'
            }}
          />
        ))}
      </div>
      
      {/* Resend Code */}
      <div className="text-center mb-8">
        <button
          disabled={countdown > 0}
          onClick={() => setCountdown(60)}
          className="text-[14px] font-medium"
          style={{ 
            color: countdown > 0 ? 'rgba(234, 234, 234, 0.3)' : '#EAEAEA'
          }}
        >
          Renvoyer le code {countdown > 0 && `(${countdown}s)`}
        </button>
      </div>
      
      <Button 
        fullWidth 
        onClick={handleVerify}
        disabled={otp.some(d => !d)}
      >
        Vérifier
      </Button>
    </div>
  );
}
