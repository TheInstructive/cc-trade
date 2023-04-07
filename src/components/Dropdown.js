import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function Dropdown(props) {
  const { selectLanguage } = props;
  const [isListOpen, setIsListOpen] = useState(false);
  const [headerImage, setHeaderImage] = useState(null);
  const list = props.list;

  useEffect(() => {
    // Check if a language is selected in local storage and set the header image accordingly
    const selectedLanguage = localStorage.getItem('language');
    if (selectedLanguage) {
      const language = list.find(lang => lang.key === selectedLanguage);
      if (language) {
        setHeaderImage(language.image);
      }
    }
  }, [list]);

  const toggleList = () => {
    setIsListOpen(prevIsListOpen => !prevIsListOpen);
  };

  const selectItem = item => {
    const { id, key, image } = item;

    if (item.selected) {
      return;
    } else {
      localStorage.setItem('language', key);
      setHeaderImage(image);
    }

    setIsListOpen(false);
    selectLanguage(key);
  };

  return (
    <div className="dd-wrapper">
      <button type="button" className="dd-header" onClick={toggleList}>
        <div className="dd-header-title">
          {headerImage && <img src={headerImage} width={20} alt="" />} &nbsp;
        </div>
        {isListOpen ? (
          <FontAwesomeIcon icon={faAngleUp} />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} />
        )}
      </button>

      {isListOpen && (
        <div role="list" className="dd-list">
          {list.map(item => (
            <button
              type="button"
              className="dd-list-item"
              key={item.id}
              onClick={() => selectItem(item)}
            >
              <div><img width={20} src={item.image} alt="" /></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

