import { useNavigate } from 'react-router';
import { ArrowLeft, Star, Camera } from 'lucide-react';
import { Button } from '../components/Button';
import { useState } from 'react';

export default function Review() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const navigate = useNavigate();
  
  const ratingLabels = ['Décevant', 'Passable', 'Bien', 'Très bien', 'Excellente'];
  
  return (
    <div className="min-h-screen" style={{ background: '#050404' }}>
      <div className="px-5 py-8">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} style={{ color: '#EAEAEA' }} />
          </button>
          <h1 className="text-[20px] font-bold" style={{ color: '#EAEAEA' }}>
            Laisser un avis
          </h1>
        </div>
        
        {/* Booking Context */}
        <div 
          className="p-4 rounded-xl flex items-center gap-3 mb-6"
          style={{ background: '#2E1C2B' }}
        >
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{ background: '#4A1942' }}
          >
            <span className="text-[24px]">🏎️</span>
          </div>
          <div>
            <div className="text-[14px] font-semibold mb-1" style={{ color: '#EAEAEA' }}>
              Porsche 911 Carrera S
            </div>
            <div className="text-[12px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
              Prestige Auto Nice
            </div>
            <div className="text-[11px]" style={{ color: 'rgba(234, 234, 234, 0.5)' }}>
              12 – 15 Juin 2026
            </div>
          </div>
        </div>
        
        {/* Star Rating */}
        <div className="mb-6">
          <h3 className="text-[15px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
            Votre note
          </h3>
          <div className="flex justify-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star 
                  size={36}
                  fill={(hoveredRating || rating) >= star ? '#F1C40F' : 'transparent'}
                  style={{ color: (hoveredRating || rating) >= star ? '#F1C40F' : 'rgba(234, 234, 234, 0.2)' }}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center text-[14px] font-medium" style={{ color: '#EAEAEA' }}>
              {ratingLabels[rating - 1]}
            </p>
          )}
        </div>
        
        {/* Text Review */}
        <div className="mb-6">
          <h3 className="text-[15px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
            Votre avis
          </h3>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value.slice(0, 500))}
            placeholder="Partagez votre expérience avec cette agence et ce véhicule..."
            className="w-full h-[140px] p-4 rounded-xl resize-none"
            style={{
              background: '#2E1C2B',
              border: '1px solid rgba(234, 234, 234, 0.1)',
              color: '#EAEAEA'
            }}
          />
          <div className="text-right text-[12px] mt-2" style={{ color: 'rgba(234, 234, 234, 0.4)' }}>
            {review.length} / 500
          </div>
        </div>
        
        {/* Photo Upload */}
        <div className="mb-6">
          <h3 className="text-[15px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
            Ajouter des photos (optionnel)
          </h3>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                className="flex-shrink-0 w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center"
                style={{ borderColor: 'rgba(234, 234, 234, 0.15)' }}
              >
                <Camera size={24} style={{ color: 'rgba(234, 234, 234, 0.4)' }} />
              </button>
            ))}
          </div>
        </div>
        
        <Button 
          fullWidth 
          disabled={rating === 0 || review.length < 10}
          onClick={() => navigate('/home')}
        >
          Publier l'avis
        </Button>
      </div>
    </div>
  );
}
