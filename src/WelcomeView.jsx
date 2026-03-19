import React, { useEffect } from 'react';
import './WelcomeView.css';

const WelcomeView = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3 segundos de carga/bienvenida

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="welcome-view">
      <div className="welcome-content">
        <div className="bot-hero">
          <img src="/src/assets/bot-oi.png" alt="Welcome Bot" />
        </div>
        <h1 className="welcome-text">
          Bienvenidos a <strong>Smart Support Center!</strong>
        </h1>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;
