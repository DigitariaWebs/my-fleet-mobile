import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle, Camera, X, Upload } from 'lucide-react';
import { Button } from '../components/Button';

export default function KYC() {
  const [step, setStep] = useState(1);
  const [uploads, setUploads] = useState({
    idFront: false,
    idBack: false,
    licenseFront: false,
    licenseBack: false
  });
  const navigate = useNavigate();
  
  const progress = (step / 3) * 100;
  
  const handleSkip = () => {
    navigate('/home');
  };
  
  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/home');
    }
  };
  
  return (
    <div className="min-h-screen w-full px-5 py-8" style={{ background: '#050404' }}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)}>
          <ArrowLeft size={24} style={{ color: '#EAEAEA' }} />
        </button>
        <span className="text-[13px] font-medium" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
          Étape {step}/3
        </span>
      </div>
      
      {/* Progress Bar */}
      <div 
        className="h-1 rounded-full mb-6 overflow-hidden"
        style={{ background: 'rgba(234, 234, 234, 0.1)' }}
      >
        <div 
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, background: '#4A1942' }}
        />
      </div>
      
      {step === 1 && (
        <>
          <h1 className="text-[22px] font-bold mb-2" style={{ color: '#EAEAEA' }}>
            Vérification d'identité
          </h1>
          <p className="text-[15px] mb-6" style={{ color: 'rgba(234, 234, 234, 0.7)' }}>
            Pour votre sécurité et celle de nos agences partenaires, nous devons vérifier votre identité
          </p>
          
          <div 
            className="rounded-2xl p-6 mb-6 flex items-center justify-center"
            style={{ background: '#2E1C2B' }}
          >
            <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'rgba(74, 25, 66, 0.2)' }}>
              <CheckCircle size={48} style={{ color: '#4A1942' }} />
            </div>
          </div>
          
          <div className="space-y-3 mb-8">
            {[
              'Location sécurisée et garantie',
              'Badge vérifié sur votre profil',
              'Accès à l\'ensemble des véhicules'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle size={20} style={{ color: '#4A1942' }} />
                <span className="text-[15px]" style={{ color: '#EAEAEA' }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
          
          <Button fullWidth onClick={handleContinue}>
            Commencer la vérification
          </Button>
          <button 
            onClick={handleSkip}
            className="w-full text-center py-4 text-[15px]"
            style={{ color: 'rgba(234, 234, 234, 0.5)' }}
          >
            Plus tard
          </button>
        </>
      )}
      
      {step === 2 && (
        <>
          <h1 className="text-[22px] font-bold mb-2" style={{ color: '#EAEAEA' }}>
            Pièce d'identité
          </h1>
          <p className="text-[15px] mb-6" style={{ color: 'rgba(234, 234, 234, 0.7)' }}>
            Prenez en photo le recto et le verso de votre carte d'identité nationale
          </p>
          
          <div className="space-y-4 mb-6">
            {/* ID Card */}
            <div>
              <label className="block text-[13px] font-medium mb-2" style={{ color: 'rgba(234, 234, 234, 0.8)' }}>
                Carte d'identité
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['idFront', 'idBack'].map((side) => (
                  <div
                    key={side}
                    className="relative h-[120px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all"
                    style={{
                      background: uploads[side as keyof typeof uploads] ? '#2E1C2B' : 'transparent',
                      borderColor: uploads[side as keyof typeof uploads] ? '#4A1942' : 'rgba(234, 234, 234, 0.15)'
                    }}
                  >
                    {uploads[side as keyof typeof uploads] ? (
                      <>
                        <CheckCircle size={24} style={{ color: '#2ECC71' }} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploads({ ...uploads, [side]: false });
                          }}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: 'rgba(234, 234, 234, 0.2)' }}
                        >
                          <X size={14} style={{ color: '#EAEAEA' }} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setUploads({ ...uploads, [side]: true })}
                          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                        >
                          <Camera size={24} style={{ color: 'rgba(234, 234, 234, 0.4)' }} />
                          <span className="text-[11px] text-center px-2" style={{ color: 'rgba(234, 234, 234, 0.5)' }}>
                            {side === 'idFront' ? 'Recto' : 'Verso'}
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Driver's License */}
            <div>
              <label className="block text-[13px] font-medium mb-2" style={{ color: 'rgba(234, 234, 234, 0.8)' }}>
                Permis de conduire
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['licenseFront', 'licenseBack'].map((side) => (
                  <div
                    key={side}
                    className="relative h-[120px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all"
                    style={{
                      background: uploads[side as keyof typeof uploads] ? '#2E1C2B' : 'transparent',
                      borderColor: uploads[side as keyof typeof uploads] ? '#4A1942' : 'rgba(234, 234, 234, 0.15)'
                    }}
                  >
                    {uploads[side as keyof typeof uploads] ? (
                      <>
                        <CheckCircle size={24} style={{ color: '#2ECC71' }} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploads({ ...uploads, [side]: false });
                          }}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: 'rgba(234, 234, 234, 0.2)' }}
                        >
                          <X size={14} style={{ color: '#EAEAEA' }} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setUploads({ ...uploads, [side]: true })}
                          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                        >
                          <Upload size={24} style={{ color: 'rgba(234, 234, 234, 0.4)' }} />
                          <span className="text-[11px] text-center px-2" style={{ color: 'rgba(234, 234, 234, 0.5)' }}>
                            {side === 'licenseFront' ? 'Recto' : 'Verso'}
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div 
            className="rounded-xl p-3 mb-6 flex gap-2"
            style={{ background: 'rgba(74, 25, 66, 0.1)' }}
          >
            <span className="text-[12px]" style={{ color: 'rgba(234, 234, 234, 0.5)' }}>
              💡 Assurez-vous que la photo est nette, bien éclairée et que tous les textes sont lisibles
            </span>
          </div>
          
          <Button 
            fullWidth 
            onClick={handleContinue}
            disabled={!Object.values(uploads).every(Boolean)}
          >
            Continuer
          </Button>
        </>
      )}
      
      {step === 3 && (
        <>
          <h1 className="text-[22px] font-bold mb-2 text-center" style={{ color: '#EAEAEA' }}>
            Vérification en cours
          </h1>
          <p className="text-[15px] mb-8 text-center" style={{ color: 'rgba(234, 234, 234, 0.7)' }}>
            Nous vérifions vos documents. Vous recevrez une notification dès que votre profil sera validé. 
            Cela prend généralement moins de 24 heures.
          </p>
          
          <div 
            className="rounded-2xl p-8 mb-6 flex items-center justify-center"
            style={{ background: '#2E1C2B' }}
          >
            <div className="w-32 h-32 rounded-full flex items-center justify-center animate-pulse" style={{ background: 'rgba(74, 25, 66, 0.2)' }}>
              <CheckCircle size={64} style={{ color: '#4A1942' }} />
            </div>
          </div>
          
          <div 
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full mb-8 mx-auto block w-fit"
            style={{ background: 'rgba(243, 156, 18, 0.15)', color: '#F39C12' }}
          >
            <span className="text-[13px] font-medium">En attente de vérification</span>
          </div>
          
          <Button fullWidth onClick={handleContinue}>
            Retour à l'accueil
          </Button>
        </>
      )}
    </div>
  );
}