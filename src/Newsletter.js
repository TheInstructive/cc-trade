import React, { useEffect, useState } from 'react'
import CollectionItem from './components/CollectionItem'
import './App.css';
import { useNavigate } from 'react-router-dom';


export default function Newsletter() {
  const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCollectionId, setSelectedCollectionId] = useState(null);

    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };

    const collections = [
      {id: "970110042424610886", name: "Aliens From Earth", image: "https://pbs.twimg.com/profile_images/1621649066798059522/1NaWOQ5G_400x400.jpg" },
      {id: "903875726418268220", name: "Ballies", image: "https://i.imgur.com/3yd4tfz.png" },
      {id: "0", name: "Loaded Lions", image: "https://i.imgur.com/ykEQXdz.png" },
      {id: "905038556140036106", name: "VVS Miner Mole", image: "https://i.imgur.com/YFwKrXQ.png" },
      {id: "896483719295156274", name: "Cronos Chimp Club", image: "https://i.imgur.com/TpIwxwM.png" },
      {id: "0", name: "CroSkull", image: "https://i.imgur.com/v50jSxn.png" },
      {id: "1009732055648714813", name: "Cronos Cruisers", image: "https://i.imgur.com/WicSc1m.png" },
      {id: "0", name: "Boomer Squad", image: "https://i.imgur.com/P61LN1n.png" },
      {id: "1044839682057453639", name: "Eyeball Games", image: "https://i.imgur.com/6BPhlDO.png" },
      {id: "944556573005590579", name: "Argonauts", image: "https://i.imgur.com/VYt3Ghp.png" },
      {id: "0", name: "Mad Meerkat", image: "https://i.imgur.com/qjfqIvs.png" },
      {id: "1003888475566772295", name: "Cronos ID", image: "https://i.imgur.com/49qS3q5.png" },
      {id: "0", name: "CronosVerse", image: "https://i.imgur.com/oLo6pbt.png" },
      {id: "0", name: "Flaming Phenix Club", image: "https://i.imgur.com/I5L1Lmm.png" },
      {id: "912620482031939599", name: "D.G.Pals", image: "https://i.imgur.com/K8ukt6n.png" },
      {id: "903133867924422677", name: "CRO Crow", image: "https://i.imgur.com/xMO4A7n.png" },
      {id: "936221636829519874", name: "MarbleVerse", image: "https://i.imgur.com/9pTdxrP.png" },
      {id: "0", name: "LazyHorse", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "1014397087116439654", name: "Undead Space Apes", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "921711758484328458", name: "Trooprz", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "929744973283340298", name: "CRO Homes", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "911246161233457172", name: "Crxillion", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "967089657475121254", name: "Exodus", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "969658754838720556", name: "CrogeNFT", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "0", name: "Bored Candy", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "911705542995636255", name: "Weird Apes Club", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "1056245905994559595", name: "Cr00ts", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "0", name: "CroNodesNFT", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "923642608788578396", name: "CROugar Kingdom", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "1072076032624033812", name: "Primate Business", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "0", name: "Crobots", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "966011090330865704", name: "Baby Alien Division", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "961425677024919614", name: "AIKO BEANZ", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "0", name: "AlienCRO", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "998297452161552424", name: "CroHogs", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "0", name: "Blumies", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "994547822701592607", name: "Minted", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "905933527936278609", name: "Ebisu's Bay", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "981654148191772702", name: "MoonfloW", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "0", name: "Fulcrom Finance", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "1042850385670447114", name: "Veno Finance", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "0", name: "Ferro Protocol", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "0", name: "Tectonic Finance", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },
        {id: "0", name: "The Void", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" },      
    ];

      const filteredCollections = collections.filter((collection) => {
        return collection.name.toLowerCase().includes(searchTerm.toLowerCase());
      });

      useEffect(() => {
        if (selectedCollectionId !== null) {
          navigate(`/announcement/${selectedCollectionId}`);
        }
      }, [selectedCollectionId, navigate]);
    
      const handleButtonClick = (id,name,image) => {
        setSelectedCollectionId(id);
        navigate(`/announcement/${id}?name=${encodeURIComponent(name)}&image=${encodeURIComponent(image)}`);
      };
    
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
              buttonClick={() => handleButtonClick(collection.id,collection.name,collection.image)}
              />))}

          </div>
      </div>
  )
}