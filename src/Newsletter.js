import React, { useEffect, useState } from 'react'
import CollectionItem from './components/CollectionItem'
import './App.css';
import { useNavigate } from 'react-router-dom';

import collections from './collections';

export default function Newsletter() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setFilteredCollections(
      collections.filter((collection) =>
        collection.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || filteredCollections.length <= page * 8) return;
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
        setIsLoading(true);
        setTimeout(() => {
          setPage((prevPage) => prevPage + 1);
          setIsLoading(false);
        }, 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, filteredCollections, page]);
    
  return (
      <div className='newsletter-container'>
          <h1>SELECT A COLLECTION TO SEE ANNOUNCEMENTS</h1>
          <input placeholder='SEARCH' type="text" value={searchTerm} onChange={handleSearch} />
          <div className='collections-container'>
          {filteredCollections.slice(0, page * 8).map((collection) => (
          <CollectionItem
            key={collection.name}
            collectionName={collection.name}
            collectionImage={collection.image}
            buttonClick={() => navigate(`/announcement/${collection.slug}`)}
          />
        ))}
          </div>
          {isLoading && <p id='loading-text'>Loading...</p>}
      </div>
  )
}