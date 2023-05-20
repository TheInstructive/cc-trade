import React, { useRef, useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsLeftRight, faScaleBalanced, faArrowUpFromBracket, faWallet} from '@fortawesome/free-solid-svg-icons'
import logo from './images/logos.png'
import ReceivedTrades from './components/ReceivedTrades'
import SentTrades from './components/SentTrades'
import { onWalletChange, isWalletConnected, getWalletAddress } from "./web3/WalletConnect";
import { useTranslation } from 'react-i18next';
import Inventory from './components/Inventory'
import Alert, { AlertContext } from './components/Alert';

export default function TradePage() {
  const { t } = useTranslation();
  const { showAlert } = useContext(AlertContext);

  const [rederTab, setRenderTab] = useState(0)
  const [ isConnected, setConnected ] = useState(false);
  const [ walletAddress, setWalletAddress ] = useState("");
  const tradeURL = `https://${window.location.host}/createoffer/${walletAddress}`;

  const inputRef = useRef(null);

  async function copyAddress() {
    let successful = false;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(tradeURL);
        successful = true;
      } else {
        inputRef.current.focus();
        inputRef.current.select();
        successful = document.execCommand('copy');
      }
    } catch (err) {
      console.error("Error while copying", err);
    }

    if (successful) {
      showAlert("YOUR TRADE URL COPIED TO THE CLIPBOARD", null, 2000);
    } else {
      console.log("Copy unsuccessful");
    }
  }

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
        <Alert />


        <div className='trade-wrapper'>

          <div className='trade-header'>
          <div className='wallet-info'>
              <div className='wallet-pic'><img src={logo}></img></div>
              <div className='wallet-address'>{walletAddress}</div>
          </div>

          <div className='trade-url'>
            <h4>TRADE URL</h4>
            <div className='trade-url-input'>
            <input ref={inputRef} contentEditable={false} readOnly value={tradeURL}></input><button onClick={copyAddress}>COPY</button>
            </div>
            <p>Copy this URL and share anyone who want to trade with you!</p>
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
