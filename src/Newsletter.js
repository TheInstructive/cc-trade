import React, { useEffect, useState } from 'react'
import CollectionItem from './components/CollectionItem'
import './App.css';
import { useNavigate } from 'react-router-dom';

import collections from './collections';

export default function Newsletter() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTag = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTags((tags) => [...tags, value]);
    } else {
      setSelectedTags((tags) => tags.filter((tag) => tag !== value));
    }
  };

useEffect(() => {
  const filteredBySearch = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredByTags =
    selectedTags.length > 0
      ? filteredBySearch.filter((collection) =>
          collection.tag && selectedTags.some((tag) => collection.tag.includes(tag))
        )
      : filteredBySearch;

  setFilteredCollections(filteredByTags);
}, [searchTerm, selectedTags]);

  
  

    
  return (
      <div className='newsletter-container'>
          <h1>SELECT A COLLECTION TO SEE ANNOUNCEMENTS</h1>
          <input placeholder='SEARCH' type="text" value={searchTerm} onChange={handleSearch} />
          <div className='collection-tags'>

          <label htmlFor='nft' className={`collection-tag ${selectedTags.includes('nft') && 'selected-tag'}`}>
            <input onChange={handleTag} type='checkbox' value="nft" id='nft'></input>
            <a>NFT</a>
          </label>

            <label htmlFor='gamefi' className={`collection-tag ${selectedTags.includes('gamefi') && 'selected-tag'}`}><input onChange={handleTag} type='checkbox' value="gamefi" id='gamefi'></input><a>GameFi</a></label>
            <label htmlFor='marketplace' className={`collection-tag ${selectedTags.includes('marketplace') && 'selected-tag'}`}><input onChange={handleTag} type='checkbox' value="marketplace" id='marketplace'></input><a>Marketplace</a></label>
            <label htmlFor='finance' className={`collection-tag ${selectedTags.includes('finance') && 'selected-tag'}`}><input onChange={handleTag} type='checkbox' value="finance" id='finance'></input><a>Finance</a></label>
            <label htmlFor='other' className={`collection-tag ${selectedTags.includes('other') && 'selected-tag'}`}><input onChange={handleTag} type='checkbox' value="other" id='other'></input><a>Other</a></label>
          </div>
          <div className='collections-container'>
          {filteredCollections.map((collection) => (
          <CollectionItem
            key={collection.name}
            collectionName={collection.name}
            collectionImage={collection.image}
            buttonClick={() => navigate(`/announcement/${collection.slug}`)}
          />
        ))}
          </div>
      </div>
  )
}