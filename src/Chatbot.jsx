import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: '¡Hola! Soy tu asistente de Smart Support Center. ¿En qué puedo ayudarte hoy?', sender: 'bot' }
  ]);
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = { id: Date.now(), text: message, sender: 'user' };
    setMessages([...messages, newMsg]);
    setMessage('');
    setShowEmoji(false);

    // Simulación de respuesta IA (Offline)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'Entendido. Estoy procesando tu solicitud localmente. (Modo IA Offline Preparado)',
        sender: 'bot'
      }]);
    }, 1000);
  };

  const onEmojiClick = (emojiData) => {
    setMessage(prev => prev + emojiData.emoji);
  };

  return (
    <div className="chatbot-wrapper">
      {isOpen ? (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="bot-avatar">AI</div>
              <span>Asistente Smart</span>
            </div>
            <X size={20} className="close-icon" onClick={() => setIsOpen(false)} />
          </div>
          
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <div className="input-with-emoji">
              <Smile 
                size={20} 
                className={`emoji-trigger ${showEmoji ? 'active' : ''}`} 
                onClick={() => setShowEmoji(!showEmoji)} 
              />
              <input 
                type="text" 
                placeholder="Escribe un mensaje..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {showEmoji && (
                <div className="emoji-picker-container">
                  <EmojiPicker 
                    onEmojiClick={onEmojiClick} 
                    autoFocusSearch={false}
                    theme="light"
                    width={300}
                    height={400}
                  />
                </div>
              )}
            </div>
            <button type="submit" className="send-btn">
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        <button className="chat-trigger" onClick={() => setIsOpen(true)}>
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
