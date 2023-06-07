import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faGear } from '@fortawesome/free-solid-svg-icons';
import DarkMode from '../theme/DarkMode';
import Dropdown from './Dropdown';

const languages = [
    { id: 1, title: 'English', key: 'en', image:"https://flagicons.lipis.dev/flags/4x3/gb.svg" },
    { id: 2, title: 'Español', key: 'es', image:"https://flagicons.lipis.dev/flags/4x3/es.svg" },
    { id: 2, title: 'Italiano', key: 'it', image:"https://flagicons.lipis.dev/flags/4x3/it.svg" },
    { id: 2, title: 'Turkish', key: 'tr', image:"https://flagicons.lipis.dev/flags/4x3/tr.svg" },
  ];

export default function Settings() {
  const [isListOpen, setIsListOpen] = useState(false);

  const selectLanguage = (key) => {
    localStorage.setItem('language', key);
    window.location.reload();
  };

  const toggleList = () => {
    setIsListOpen(isListOpen => !isListOpen);
  };


  return (
    <div className="settings-wrapper">
      <button type="button" className="settings-header" onClick={toggleList}>
        <div className="settings-header-title">
        <FontAwesomeIcon icon={faGear} />
        </div>
      </button>

      {isListOpen && (
        <div className='settings-container'>
                  <Dropdown
                  title="Select Collection"
                  list={languages}
                  selectLanguage={selectLanguage}
                  />
      
                <DarkMode></DarkMode>
        </div>
      )}
    </div>
  );
}

