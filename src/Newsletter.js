import React, { useState } from 'react'
import CollectionItem from './components/CollectionItem'
import './App.css';
import { useNavigate } from 'react-router-dom';

import collections from './collections';

export default function Newsletter() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCollections = collections.filter((collection) => {
    return collection.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
    
  return (
      <div className='newsletter-container'>
          <h1>SELECT A COLLECTION TO SEE ANNOUNCEMENTS</h1>
          <input placeholder='SEARCH' type="text" value={searchTerm} onChange={handleSearch} />
          <div className='collections-container'>
              {filteredCollections.map((collection) => (
              <CollectionItem 
              key={collection.name}
              collectionName={collection.name}
              collectionImage={collection.image}
              buttonClick={() => navigate(`/announcement/${collection.slug}`)}
              />))}

          </div>
      </div>
  )
}