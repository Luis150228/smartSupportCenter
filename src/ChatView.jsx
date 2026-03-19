import React, { useState } from 'react';
import { Send, Smile, Paperclip, X } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import './ChatView.css';

const ChatView = ({ userInfo, onLogout }) => {
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const quickActions = ["Bitlocker", "Macbook", "Outlook", "Telefonía Móvil", "Windows"];

  const onEmojiClick = (emojiData) => {
    setInputText(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="chat-view-container">
      <div className="chat-header-actions">
        <button className="logout-btn" onClick={onLogout}>
          <span>Finalizar sesión</span>
          <X size={16} className="x-circle" />
        </button>
      </div>
      <div className="chat-history">
        {/* Mensaje 1 */}
        <div className="message-row">
          <div className="bot-avatar-img">
            <img src="/src/assets/bot-oi.png" alt="Bot" onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=AI&background=2e6e8e&color=fff'} />
          </div>
          <div className="message-content">
            <div className="bubble">
              <p>Bienvenido(a) a <strong>+Smart</strong>.</p>
              <p>¿Qué puedo hacer por ti ahora? 😊</p>
              <span className="timestamp">14:04 ✓</span>
            </div>
          </div>
        </div>

        {/* Mensaje 2 - Botones */}
        <div className="message-row">
          <div className="bot-avatar-img">
            <img src="/src/assets/bot-oi.png" alt="Bot" onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=AI&background=2e6e8e&color=fff'} />
          </div>
          <div className="message-content">
            <div className="bubble wide">
              <p>Aquí tienes algunos productos de fácil acceso:</p>
              <div className="quick-actions">
                {quickActions.map(action => (
                  <button key={action} className="action-btn" onClick={() => setInputText(action)}>{action}</button>
                ))}
              </div>
              <p>O escribe en el chat lo que necesitas.</p>
              <p>¿Qué puedo hacer por ti ahora? 😊</p>
              <span className="timestamp">14:04 ✓</span>
            </div>
          </div>
        </div>

        {/* Mensaje 3 - Finalizado */}
        <div className="message-row">
          <div className="bot-avatar-img">
            <img src="/src/assets/bot-oi.png" alt="Bot" onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=AI&background=2e6e8e&color=fff'} />
          </div>
          <div className="message-content">
            <div className="bubble feedback">
              <p>Su atención fue finalizada, si aún necesita ayuda, vuelva a hablar con <strong>Smart Support Center</strong></p>
              <span className="timestamp">20:06 ✓</span>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-footer">
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Hacer una pregunta..." 
            maxLength={1000} 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="input-tools">
            <span className="char-counter">{inputText.length}/1000</span>
            <div style={{ position: 'relative' }}>
              <Smile 
                size={20} 
                className="tool-icon" 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
              />
              {showEmojiPicker && (
                <div style={{ position: 'absolute', bottom: '40px', right: 0, zIndex: 100 }}>
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
            <Send size={20} className="send-icon-blue" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
