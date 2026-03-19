import React, { useState, useEffect } from 'react';
import { Settings, Check, LayoutGrid } from 'lucide-react';
import Chatbot from './Chatbot';
import ChatView from './ChatView';
import WelcomeView from './WelcomeView';
import LanguageMenu from './LanguageMenu';
import Modal from './Modal';
import './index.css';

function App() {
  const [view, setView] = useState('dashboard'); // 'dashboard', 'welcome', 'chat'
  const [showConfig, setShowConfig] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: 'LUIS FERNANDO',
    hostname: 'Cargando...',
    ip: 'Cargando...'
  });

  useEffect(() => {
    if (window.electron) {
      window.electron.getSystemInfo().then(info => {
        setUserInfo(prev => ({
          ...prev,
          username: info.username.toUpperCase(),
          hostname: info.hostname,
          ip: info.ip
        }));
      });
    }
  }, []);

  const handleCountrySelect = () => {
    setView('welcome');
  };

  const handleWelcomeComplete = () => {
    setView('chat');
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    setView('dashboard');
  };

  const handleLanguageSelect = (lang) => {
    console.log('Idioma seleccionado:', lang.name);
    setShowConfig(false);
  };

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <LayoutGrid size={24} />
          <span className="logo-text">
            Global Tech Hub <span className="logo-divider">|</span> Smart Support Center
          </span>
        </div>
        <div className="user-session" style={{ position: 'relative' }}>
          <span title={`Host: ${userInfo.hostname} | IP: ${userInfo.ip}`}>
            Hola, {userInfo.username}!
          </span>
          <span className="logo-divider">|</span>
          <Settings 
            size={20} 
            className="settings-icon" 
            onClick={() => setShowConfig(!showConfig)} 
          />
          {showConfig && <LanguageMenu onSelect={handleLanguageSelect} />}
        </div>
      </header>

      <main className="dashboard-container">
        {/* Columna Izquierda (Se oculta en vista de bienvenida en mobile si se desea, pero la mantenemos por consistencia) */}
        {view !== 'welcome' && (
          <div className="column-left">
            <h2 className="section-title">Centro de información</h2>
            <div className="card status-card">
              <div className="status-check">
                <Check size={24} strokeWidth={3} />
              </div>
              <p className="status-text">
                En términos generales, los sistemas funcionan normalmente.
              </p>
            </div>
          </div>
        )}

        {/* Área Central Dinámica */}
        <div className={view === 'welcome' ? 'column-full' : 'column-right'}>
          {view === 'dashboard' && (
            <>
              <h2 className="section-title" style={{ textAlign: 'center', fontSize: '2rem' }}>
                Servicio Especializado
              </h2>
              <div className="card main-card" onClick={handleCountrySelect} style={{ cursor: 'pointer' }}>
                <div className="flag-container" style={{ pointerEvents: 'none' }}>
                  <img 
                    src="/src/assets/mx.png" 
                    alt="México Flag" 
                  />
                </div>
                <h3 className="country-title">México</h3>
                <p className="country-subtitle">México</p>
              </div>
            </>
          )}

          {view === 'welcome' && (
            <WelcomeView onComplete={handleWelcomeComplete} />
          )}

          {view === 'chat' && (
            <ChatView userInfo={userInfo} onLogout={handleLogoutClick} />
          )}
        </div>
      </main>

      {view === 'dashboard' && <Chatbot />}

      {showLogoutModal && (
        <Modal 
          title="Finalizar sesión"
          message="¿Deseas encerrar esta sesión y retornar a la página inicial?"
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
}

export default App;
