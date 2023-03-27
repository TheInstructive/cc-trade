import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsLeftRight, faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import loaded from './images/ll.jpg'
import ballies from './images/ballies.png'


export default function TradePage() {
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
         <h2>Feautured NFTs</h2>
         <div className='trade-item-container'>

          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img width={120} src={loaded}></img>
              <button>OFFER</button>
          </div>

          <div className='trade-nft-item'>
              <h4>Loaded Lion #1146</h4>
              <img width={120} src={loaded}></img>
              <button>OFFER</button>
          </div>

          <div className='trade-nft-item'>
          <h4>Loaded Lion #1146</h4>
              <img width={120} src={loaded}></img>
              <button>OFFER</button>
          </div>

          <div className='trade-nft-item'>
          <h4>Loaded Lion #1146</h4>
              <img width={120} src={loaded}></img>
              <button>OFFER</button>
          </div>

          <div className='trade-nft-item'>
          <h4>Loaded Lion #1146</h4>
              <img width={120} src={loaded}></img>
              <button>OFFER</button>
          </div>

          <div className='trade-nft-item'>
          <h4>Loaded Lion #1146</h4>
              <img width={120} src={loaded}></img>
              <button>OFFER</button>
          </div>

          <div className='trade-nft-item'>
          <h4>Loaded Lion #1146</h4>
              <img width={120} src={loaded}></img>
              <button>OFFER</button>
          </div>

          <div className='trade-nft-item'>
          <h4>Loaded Lion #1146</h4>
              <img width={120} src={loaded}></img>
              <button>OFFER</button>
          </div>
          
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
