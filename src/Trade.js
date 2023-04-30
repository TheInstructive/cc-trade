import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsLeftRight, faScaleBalanced, faArrowUpFromBracket, faWallet} from '@fortawesome/free-solid-svg-icons'
import logo from './images/logos.png'
import ReceivedTrades from './components/ReceivedTrades'
import SentTrades from './components/SentTrades'
import { onWalletChange, isWalletConnected, getWalletAddress } from "./web3/WalletConnect";
import { useTranslation } from 'react-i18next';
import Inventory from './components/Inventory'


export default function TradePage() {
  const { t } = useTranslation();

  const [rederTab, setRenderTab] = useState(0)
  const [alertClas, setAlertClass] = useState("alert displaynone")
  const [ isConnected, setConnected ] = useState(false);
  const [ walletAddress, setWalletAddress ] = useState("");
  const tradeURL = `https://${window.location.hostname}/createoffer/${walletAddress}`;

  const copyAddress = () => {
    if (navigator.clipboard.writeText) navigator.clipboard.writeText(tradeURL);
    setAlertClass("alert")
    setTimeout(() => {
      setAlertClass("alert displaynone")
    }, 2000);
  };

  useEffect(() => {
    setConnected(isWalletConnected());

    setWalletAddress(getWalletAddress())
    onWalletChange((account) => {
      setConnected(account.isConnected);

      if(account.address){
        setWalletAddress(account.address)
      }
    });
  }, []);

  return (
    <>
    {isConnected ?
    <div>
         <div className='last-trades'>
          
         <div className='last-trade-item'>
              <h5>LAST TRADES</h5>
        </div>

          <div className='last-trade-container'>

            <div className='last-trade-item'>
              <h4>Cronos Club #1234</h4>
              <img src={logo}></img>
            </div>

            <FontAwesomeIcon icon={faArrowsLeftRight} />

            <div className='last-trade-item'>
              <h4>Cronos Club #1234</h4>
              <img src={logo}></img>
            </div>
          </div>

          <div className='last-trade-container'>
            <div className='last-trade-item'>
              <h4>Cronos Club #1234</h4>
              <img src={logo}></img>
            </div>
            <FontAwesomeIcon icon={faArrowsLeftRight} />
            <div className='last-trade-item'>
              <h4>Cronos Club #1234</h4>
              <img src={logo}></img>
            </div>
          </div>

          <div className='last-trade-container'>
            <div className='last-trade-item'>
              <h4>Cronos Club #1234</h4>
              <img src={logo}></img>
            </div>
            <FontAwesomeIcon icon={faArrowsLeftRight} />
            <div className='last-trade-item'>
              <h4>Cronos Club #1234</h4>
              <img src={logo}></img>
            </div>
          </div>

          <div className='last-trade-container'>
            <div className='last-trade-item'>
              <h4>Cronos Club #1234</h4>
              <img src={logo}></img>
            </div>
            <FontAwesomeIcon icon={faArrowsLeftRight} />
            <div className='last-trade-item'>
              <h4>Cronos Club #1234</h4>
              <img src={logo}></img>
            </div>
          </div>

          <div className='last-trade-container'>
            <div className='last-trade-item'>
              <h4>Cronos Club #1234</h4>
              <img src={logo}></img>
            </div>
            <FontAwesomeIcon icon={faArrowsLeftRight} />
            <div className='last-trade-item'>
              <h4>Cronos Club #1234</h4>
              <img src={logo}></img>
            </div>
          </div>
         </div>

        <div className='trade-wrapper'>

          <div className='trade-header'>
          <div className='wallet-info'>
              <div className='wallet-pic'><img src={logo}></img></div>
              <div className='wallet-address'>{walletAddress}</div>
          </div>

          <div className='trade-url'>
            <h4>TRADE URL</h4>
            <div className='trade-url-input'>
            <input contentEditable={false} readOnly value={tradeURL}></input><button onClick={copyAddress}>COPY</button>
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
              <li onClick={() => setRenderTab(2)} className={rederTab === 2 ? 'active-trade-menu' : ""}><a><FontAwesomeIcon icon={faWallet} /> &nbsp; Inventory</a></li>
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
            {rederTab === 2 ?
              <div className='trade-offers-tab'>
                  <Inventory></Inventory>
              </div>
              : ""
            }
            </div>
        </div>
    </div>
    : 
    <div className='no-login-wrapper'>
      <div className='no-login-container'>
            <h2>please login to see trades</h2>
            <button>
          {t('connectwallet')}
            </button>
      </div>
        
    </div>
    }
    </>
    
  )
}
