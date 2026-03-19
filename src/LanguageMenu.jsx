import React from 'react';
import './LanguageMenu.css';

const LanguageMenu = ({ onSelect }) => {
  const languages = [
    { name: 'Portugués', code: 'br', flag: '/src/assets/br.png' },
    { name: 'Inglés', code: 'us', flag: '/src/assets/us.png' },
    { name: 'Español', code: 'es', flag: '/src/assets/es.png' }
  ];

  return (
    <div className="language-menu">
      <h3 className="menu-title">Configuraciones</h3>
      <p className="menu-subtitle">Elige el Idioma:</p>
      <div className="language-list">
        {languages.map(lang => (
          <div key={lang.code} className="language-item" onClick={() => onSelect(lang)}>
            <div className="flag-circle">
              <img src={lang.flag} alt={lang.name} />
            </div>
            <span>{lang.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageMenu;
