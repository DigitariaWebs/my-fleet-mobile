import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Send, Paperclip } from 'lucide-react';

export default function Messagerie() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState('');
  
  const messages = [
    { 
      id: 1, 
      text: 'Bonjour, votre véhicule est en préparation.', 
      from: 'agency', 
      time: '09:30' 
    },
    { 
      id: 2, 
      text: 'Merci ! À quelle heure pensez-vous arriver ?', 
      from: 'user', 
      time: '09:32' 
    },
    { 
      id: 3, 
      text: 'Nous arriverons dans environ 15 minutes.', 
      from: 'agency', 
      time: '09:45' 
    },
    { 
      id: 4, 
      text: 'Parfait, je vous attends.', 
      from: 'user', 
      time: '09:46' 
    },
  ];
  
  const handleSend = () => {
    if (message.trim()) {
      // Handle send message
      setMessage('');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050404' }}>
      {/* Header */}
      <div 
        className="px-5 py-6 flex items-center gap-3"
        style={{ background: '#2E1C2B' }}
      >
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(234, 234, 234, 0.1)' }}
        >
          <ArrowLeft size={20} style={{ color: '#EAEAEA' }} />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-[16px] font-semibold"
            style={{ background: '#4A1942', color: '#EAEAEA' }}
          >
            P
          </div>
          <div>
            <div className="text-[15px] font-semibold" style={{ color: '#EAEAEA' }}>
              Prestige Auto Nice
            </div>
            <div className="text-[12px]" style={{ color: 'rgba(234, 234, 234, 0.6)' }}>
              En ligne
            </div>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 px-5 py-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className="max-w-[75%] px-4 py-3 rounded-2xl"
              style={{ 
                background: msg.from === 'user' ? '#4A1942' : '#2E1C2B',
                borderBottomRightRadius: msg.from === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.from === 'user' ? '16px' : '4px'
              }}
            >
              <p className="text-[14px] leading-relaxed" style={{ color: '#EAEAEA' }}>
                {msg.text}
              </p>
              <div 
                className={`text-[11px] mt-1 ${msg.from === 'user' ? 'text-right' : 'text-left'}`}
                style={{ color: 'rgba(234, 234, 234, 0.5)' }}
              >
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input */}
      <div 
        className="px-5 py-4 border-t"
        style={{ 
          background: '#050404',
          borderColor: 'rgba(234, 234, 234, 0.1)' 
        }}
      >
        <div 
          className="flex items-center gap-2 px-4 py-3 rounded-xl"
          style={{ background: '#2E1C2B' }}
        >
          <button className="p-1">
            <Paperclip size={20} style={{ color: 'rgba(234, 234, 234, 0.5)' }} />
          </button>
          <input 
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Écrire un message..."
            className="flex-1 bg-transparent outline-none text-[14px]"
            style={{ color: '#EAEAEA' }}
          />
          <button 
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-1 disabled:opacity-30"
          >
            <Send size={20} style={{ color: '#4A1942' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
