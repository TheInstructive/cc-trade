import React, { useState } from 'react'
import CollectionItem from './components/CollectionItem'
import './App.css';

export default function Newsletter() {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };

    const collections = [
      { name: "Aliens From Earth", image: "https://pbs.twimg.com/profile_images/1621649066798059522/1NaWOQ5G_400x400.jpg" },
      { name: "Ballies", image: "https://i.imgur.com/3yd4tfz.png" },
      { name: "Loaded Lions", image: "https://i.imgur.com/ykEQXdz.png" },
      { name: "VVS Miner Mole", image: "https://i.imgur.com/YFwKrXQ.png" },
      { name: "Cronos Chimp Club", image: "https://i.imgur.com/TpIwxwM.png" },
      { name: "CroSkull", image: "https://i.imgur.com/v50jSxn.png" },
      { name: "Cronos Cruisers", image: "https://i.imgur.com/WicSc1m.png" },
      { name: "Boomer Squad", image: "https://i.imgur.com/P61LN1n.png" },
      { name: "Eyeball Games", image: "https://i.imgur.com/6BPhlDO.png" },
      { name: "Argonauts", image: "https://i.imgur.com/VYt3Ghp.png" },
      { name: "Mad Meerkat", image: "https://i.imgur.com/qjfqIvs.png" },
      { name: "Cronos ID", image: "https://i.imgur.com/49qS3q5.png" },
      { name: "CronosVerse", image: "https://i.imgur.com/oLo6pbt.png" },
      { name: "Flaming Phenix Club", image: "https://i.imgur.com/I5L1Lmm.png" },
      { name: "D.G.Pals", image: "https://i.imgur.com/K8ukt6n.png" },
      { name: "CRO Crow", image: "https://i.imgur.com/xMO4A7n.png" },
      { name: "MarbleVerse", image: "https://i.imgur.com/9pTdxrP.png" },
        { name: "LazyHorse", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Undead Space Apes", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Trooprz", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "CRO Homes", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Crxillion", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Exodus", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "CrogeNFT", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Bored Candy", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Weird Apes Club", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Cr00ts", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "CroNodesNFT", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "CROugar Kingdom", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Primate Business", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Crobots", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Baby Alien Division", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "AIKO BEANZ", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "AlienCRO", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "CroHogs", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Blumies", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Minted", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Ebisu's Bay", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "MoonfloW", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Fulcrom Finance", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Veno Finance", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Ferro Protocol", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "Tectonic Finance", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        { name: "The Void", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },      
    ];

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
            />))}

        </div>
    </div>
  )
}
