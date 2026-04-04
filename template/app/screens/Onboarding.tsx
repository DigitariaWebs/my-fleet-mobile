import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { motion, AnimatePresence } from 'motion/react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1770847816156-a4041d979580?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    headline: 'Louez en toute simplicité',
    subtitle: 'Parcourez les meilleures agences et réservez en quelques secondes'
  },
  {
    image: 'https://images.unsplash.com/photo-1769546253924-9e23d794be53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    headline: 'Des agences de confiance',
    subtitle: 'Toutes nos agences sont vérifiées et notées par la communauté'
  },
  {
    image: 'https://images.unsplash.com/photo-1761264889404-a194af20ae90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    headline: 'Votre flotte, votre choix',
    subtitle: 'Berlines, SUV, sportives, cabriolets — avec ou sans chauffeur'
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/auth');
    }
  };
  
  const handleSkip = () => {
    navigate('/auth');
  };
  
  return (
    <div className="h-screen w-full relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={slides[currentSlide].image}
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(5, 4, 4, 0.95) 0%, rgba(5, 4, 4, 0.7) 40%, transparent 100%)'
              }}
            />
          </div>
          
          {/* Content */}
          <div className="relative h-full flex flex-col justify-end pb-12 px-5">
            <div className="mb-8">
              <h1 
                className="text-[26px] font-bold mb-3 leading-tight"
                style={{ color: '#EAEAEA' }}
              >
                {slides[currentSlide].headline}
              </h1>
              <p 
                className="text-[15px] leading-relaxed"
                style={{ color: 'rgba(234, 234, 234, 0.7)' }}
              >
                {slides[currentSlide].subtitle}
              </p>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="rounded-full transition-all"
                  style={{
                    width: index === currentSlide ? '8px' : '6px',
                    height: index === currentSlide ? '8px' : '6px',
                    background: index === currentSlide ? '#4A1942' : 'rgba(234, 234, 234, 0.3)'
                  }}
                />
              ))}
            </div>
            
            <Button fullWidth onClick={handleNext}>
              Commencer
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-5 z-10 text-[14px] font-medium"
        style={{ color: 'rgba(234, 234, 234, 0.6)' }}
      >
        Passer
      </button>
    </div>
  );
}
