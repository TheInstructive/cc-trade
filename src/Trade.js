import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsLeftRight, faScaleBalanced, faArrowUpFromBracket, faHistory} from '@fortawesome/free-solid-svg-icons'
import loaded from './images/ll.jpg'
import ballies from './images/ballies.png'
import ReceivedTrades from './components/ReceivedTrades'
import SentTrades from './components/SentTrades'
import TradeOffer from './TradeOffer'
import { isWalletConnected, getWalletAddress, createOffer, getActiveOffers, acceptOffer, cancelOffer } from "./web3/WalletConnect";



export default function TradePage() {
  const [rederTab, setRenderTab] = useState(0)
  const walletAddress = "https://cronos.club/createoffer/0x0000000000000000000000000000"
  const [alertClas, setAlertClass] = useState("alert displaynone")
  
  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setAlertClass("alert")
    setTimeout(() => {
      setAlertClass("alert displaynone")
    }, 2000);
  };

  return (
    <div>
         <div className='last-trades'>
          
         <div className='last-trade-item'>
              <h5>LAST TRADES</h5>
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

        <div className='trade-wrapper'>

          <div className='trade-header'>
            <div className='wallet-info'>
              <div className='wallet-pic'><img width={200} src={ballies}></img></div>
              <div className='wallet-address'>0x00000000000000</div>
          </div>

          <div className='trade-url'>
            <h4>TRADE URL</h4>
            <div className='trade-url-input'>
            <input contentEditable={false} readOnly value={walletAddress}></input><button onClick={copyAddress}>COPY</button>
            </div>
            <p>Copy this URL and share anyone who want to trade with you!</p>
            <div className={alertClas}>
              <h2>YOUR TRADE URL COPIED TO THE CLIPBOARD</h2>
            </div>

          </div>

          </div>

            <div className='trade-nav-menu'>
              <ul>
              <li onClick={() => setRenderTab(0)} className={rederTab === 0 ? 'active-trade-menu' : ""}><a><FontAwesomeIcon icon={faScaleBalanced} /> &nbsp; Received Offers</a></li>
              <li onClick={() => setRenderTab(1)} className={rederTab === 1 ? 'active-trade-menu' : ""}><a><FontAwesomeIcon icon={faArrowUpFromBracket} /> &nbsp; Sent Offers</a></li>
              </ul>
            </div>

            <div className='trade-page-container'>
            {rederTab === 0 ?

              <div className='trade-offers-tab'>
                <ReceivedTrades></ReceivedTrades>
              </div>
              : ""
            }
            {rederTab === 1 ?
              <div className='trade-offers-tab'>
                  <SentTrades></SentTrades>
              </div>
              : ""
            }
            </div>
        </div>

        

         
 {/* 
 <TradeItem></TradeItem>
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
