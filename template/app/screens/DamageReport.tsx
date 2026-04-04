import { useNavigate } from 'react-router';
import { ArrowLeft, Camera, X } from 'lucide-react';
import { Button } from '../components/Button';
import { useState } from 'react';

export default function DamageReport() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [photos, setPhotos] = useState<number[]>([]);
  const navigate = useNavigate();
  
  const zones = ['Avant', 'Arrière', 'Côté gauche', 'Côté droit', 'Toit', 'Intérieur'];
  
  return (
    <div className="min-h-screen" style={{ background: '#050404' }}>
      <div className="px-5 py-8">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} style={{ color: '#EAEAEA' }} />
          </button>
          <h1 className="text-[20px] font-bold" style={{ color: '#EAEAEA' }}>
            Signaler un dommage
          </h1>
        </div>
        
        <p className="text-[14px] mb-6" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
          Documentez tout dommage constaté sur le véhicule avant ou après votre location
        </p>
        
        {/* Car Diagram */}
        <div className="mb-6">
          <h3 className="text-[15px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
            Zone concernée
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {zones.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className="p-3 rounded-xl text-[14px] font-medium transition-all"
                style={{
                  background: selectedZone === zone ? 'rgba(74, 25, 66, 0.2)' : '#2E1C2B',
                  border: selectedZone === zone ? '2px solid #4A1942' : '1px solid rgba(234, 234, 234, 0.1)',
                  color: '#EAEAEA'
                }}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>
        
        {/* Photo Upload */}
        <div className="mb-6">
          <h3 className="text-[15px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
            Photos du dommage
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const hasPhoto = photos.includes(index);
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (hasPhoto) {
                      setPhotos(photos.filter(p => p !== index));
                    } else {
                      setPhotos([...photos, index]);
                    }
                  }}
                  className="relative aspect-square rounded-xl border-2 border-dashed flex items-center justify-center"
                  style={{
                    background: hasPhoto ? '#2E1C2B' : 'transparent',
                    borderColor: hasPhoto ? '#4A1942' : 'rgba(234, 234, 234, 0.15)'
                  }}
                >
                  {hasPhoto ? (
                    <>
                      <span className="text-[24px]">✓</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPhotos(photos.filter(p => p !== index));
                        }}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(234, 234, 234, 0.2)' }}
                      >
                        <X size={12} style={{ color: '#EAEAEA' }} />
                      </button>
                    </>
                  ) : (
                    <Camera size={24} style={{ color: 'rgba(234, 234, 234, 0.4)' }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-6">
          <h3 className="text-[15px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
            Description
          </h3>
          <textarea
            placeholder="Décrivez le dommage constaté (emplacement, type, taille estimée...)"
            className="w-full h-[120px] p-4 rounded-xl resize-none"
            style={{
              background: '#2E1C2B',
              border: '1px solid rgba(234, 234, 234, 0.1)',
              color: '#EAEAEA'
            }}
          />
        </div>
        
        <Button 
          fullWidth 
          variant="destructive"
          disabled={!selectedZone || photos.length === 0}
        >
          Envoyer le signalement
        </Button>
      </div>
    </div>
  );
}
