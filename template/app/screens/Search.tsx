import { useNavigate } from 'react-router';
import { ArrowLeft, Search as SearchIcon, Clock, X } from 'lucide-react';
import { useState } from 'react';

const recentSearches = [
  'Porsche 911',
  'Monaco Premium Fleet',
  'SUV Nice'
];

const popularCategories = [
  { name: 'Sportives', icon: '🏎️' },
  { name: 'SUV', icon: '🚙' },
  { name: 'Berlines', icon: '🚗' },
  { name: 'Cabriolets', icon: '🚗' },
  { name: 'Électriques', icon: '⚡' },
  { name: 'Avec chauffeur', icon: '👔' }
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searches, setSearches] = useState(recentSearches);
  const navigate = useNavigate();
  
  const removeSearch = (search: string) => {
    setSearches(searches.filter(s => s !== search));
  };
  
  return (
    <div className="min-h-screen" style={{ background: '#050404' }}>
      <div className="px-5 py-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} style={{ color: '#EAEAEA' }} />
          </button>
          <div 
            className="flex-1 h-[52px] rounded-[26px] flex items-center gap-3 px-4"
            style={{ 
              background: '#2E1C2B',
              border: '1px solid rgba(234, 234, 234, 0.1)'
            }}
          >
            <SearchIcon size={20} style={{ color: 'rgba(234, 234, 234, 0.6)' }} strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent outline-none text-[15px]"
              style={{ color: '#EAEAEA' }}
            />
          </div>
        </div>
        
        {/* Recent Searches */}
        {searches.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[16px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
              Recherches récentes
            </h3>
            <div className="space-y-2">
              {searches.map((search) => (
                <div 
                  key={search}
                  className="flex items-center justify-between h-[44px] px-4 rounded-xl"
                  style={{ background: '#2E1C2B' }}
                >
                  <button className="flex items-center gap-3 flex-1 text-left">
                    <Clock size={18} style={{ color: 'rgba(234, 234, 234, 0.4)' }} />
                    <span className="text-[14px]" style={{ color: 'rgba(234, 234, 234, 0.7)' }}>
                      {search}
                    </span>
                  </button>
                  <button onClick={() => removeSearch(search)}>
                    <X size={18} style={{ color: 'rgba(234, 234, 234, 0.4)' }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Popular Categories */}
        <div>
          <h3 className="text-[16px] font-semibold mb-3" style={{ color: '#EAEAEA' }}>
            Catégories populaires
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {popularCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => navigate('/agencies')}
                className="h-[60px] rounded-xl flex items-center justify-center gap-2 font-medium"
                style={{ background: '#2E1C2B' }}
              >
                <span className="text-[24px]">{category.icon}</span>
                <span className="text-[14px]" style={{ color: '#EAEAEA' }}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
