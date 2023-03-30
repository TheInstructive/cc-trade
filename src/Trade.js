import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsLeftRight, faInfo} from '@fortawesome/free-solid-svg-icons'
import loaded from './images/ll.jpg'
import ballies from './images/ballies.png'
import Dropdown from './components/Dropdown'

export default function TradePage() {
  const [dropCollections, setDropCollections] = useState([
    {
      id: 0,
      title: 'Aliens From Earth',
      selected: false,
      key: 'nft'
    },
    {
      id: 1,
      title: 'Ballies',
      selected: false,
      key: 'nft'
    },
    {
      id: 2,
      title: 'Loaded Lions',
      selected: false,
      key: 'nft'
    },
    {
      id: 3,
      title: 'CroSkull',
      selected: false,
      key: 'nft'
    },
    {
      id: 4,
      title: 'Cronos Cruisers',
      selected: false,
      key: 'nft'
    },
    {
      id: 5,
      title: 'Boomer Squad',
      selected: false,
      key: 'nft'
    }
  ]);

  const resetThenSet = (id) => {
    const temp = [...dropCollections];

    if(temp[id].selected === true){
    temp.forEach((item) => item.selected = false);
    setDropCollections(temp);
    }

    else{
    temp.forEach((item) => item.selected = false);
    temp[id].selected = true;
    setDropCollections(temp);
    }
  };

  return (
    <div>
         <div className='last-trades'>
          <div className='last-trade-container'>

            <div className='last-trade-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
            </div>

            <FontAwesomeIcon icon={faArrowsLeftRight} />

            <div className='last-trade-item'>
              <h4>Ballie #1146</h4>
              <img src={ballies}></img>
            </div>
          </div>

          <div className='last-trade-container'>
            <div className='last-trade-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
            </div>
            <FontAwesomeIcon icon={faArrowsLeftRight} />
            <div className='last-trade-item'>
              <h4>Ballie #1146</h4>
              <img src={ballies}></img>
            </div>
          </div>

          <div className='last-trade-container'>
            <div className='last-trade-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
            </div>
            <FontAwesomeIcon icon={faArrowsLeftRight} />
            <div className='last-trade-item'>
              <h4>Ballie #1146</h4>
              <img src={ballies}></img>
            </div>
          </div>

          <div className='last-trade-container'>
            <div className='last-trade-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
            </div>
            <FontAwesomeIcon icon={faArrowsLeftRight} />
            <div className='last-trade-item'>
              <h4>Ballie #1146</h4>
              <img src={ballies}></img>
            </div>
          </div>

          <div className='last-trade-container'>
            <div className='last-trade-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
            </div>
            <FontAwesomeIcon icon={faArrowsLeftRight} />
            <div className='last-trade-item'>
              <h4>Ballie #1146</h4>
              <img src={ballies}></img>
            </div>
          </div>
         </div>

         <div className='feautured-nfts'>
          <h2>FEATURED</h2>
         <div className='trade-item-container'>
          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>

          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>

          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>

          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>

          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>
         </div>
        </div>

        <div className='filter-nfts'>
          <div className='filter-search'>
          <input placeholder='SEARCH' type="text"/>
          </div>

         <Dropdown
          title="Select Collection"
          list={dropCollections}
          resetThenSet={resetThenSet}
          />
        </div>

        <div className='all-tradeable-nfts'>
        <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>
          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>
          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>
          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>
          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>
          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>
          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>
          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>
          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>
          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>
          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>
          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img src={loaded}></img>
              <button id='featured-details-button'><FontAwesomeIcon icon={faInfo} /></button>
              <button id='featured-rank'>#RANK</button>
              <button id='featured-offer-button'>OFFER</button>
          </div>
        </div>

         
 {/* 
         <div className='information-box'>
          <div className='info-box'>
            <h2>COMPLATED TRADES</h2>
            <h1 id='counter'>878</h1>
          </div>

          <div className='info-box'>
            <h2>CONNECTED WALLET</h2>
            <h1 id='counter'>1456</h1>
          </div>
          
          <div className='info-box'>
            <h2>COMPLATED TRADES</h2>
            <h1 id='counter'>421</h1>
          </div>
        </div>
      */}
    </div>
  )
}
