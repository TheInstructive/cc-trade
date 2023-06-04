import React, { useRef, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScaleBalanced, faArrowUpFromBracket, faWallet} from '@fortawesome/free-solid-svg-icons'
import ReceivedTrades from './components/ReceivedTrades'
import SentTrades from './components/SentTrades'
import { WalletContext } from "./web3/WalletConnect";
import { useTranslation } from 'react-i18next';
import Inventory from './components/Inventory'
import Alert, { AlertContext } from './components/Alert';

export default function TradePage() {
  const { t } = useTranslation();
  const { showAlert } = useContext(AlertContext);

  const [rederTab, setRenderTab] = useState(0)
  const { isConnected, address: walletAddress } = useContext(WalletContext);
  const tradeURL = `${window.location.protocol}//${window.location.host}/offer/${walletAddress}`;
  const [ sentOfferAddress, setSentOfferAddress ] = useState("");
  const offerAdress = `${window.location.protocol}//${window.location.host}/offer/${sentOfferAddress}`;


  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setSentOfferAddress(event.target.value);
  };

  function redirectToTradePage(url) {
    console.log(url.length)
    if(url == "" || sentOfferAddress.length < 4){return showAlert("PLEASE ENTER A VALID ADDRESS", "error", 2000);}

    else{window.location.href = url;    }
  }


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

  return (
    <>
    {isConnected ?
    <div>
        <Alert />


        <div className='trade-wrapper'>

          <div className='trade-header'>

            <div className='sent-trade-offer'>
              <h2>I WANT TO SEND TRADE OFFERS</h2>
              <div className='send-offer'>
                <div className='send-offer-form'>
                  <input onChange={handleInputChange} required value={sentOfferAddress} placeholder='ENTER WALLET ADDRESS OR CRONOS ID'></input>
                  <button onClick={() => redirectToTradePage(offerAdress)}>TRADE</button>
                </div>

                <div className='trade-offer-desc'>
                  <ul>
                  <li>Please enter the Trader's wallet address or Cronos ID and click the Trade button.</li>
                  <li>You will be redirected to the trade page where you can create trade offers.</li>
                  </ul>
                </div>

              </div>

            </div>

            <div className='receive-trade-offer'>
            <h2>I WANT TO RECEIVE TRADE OFFERS</h2>
            <div className='send-offer'>
                <div className='send-offer-form'>
                  <input ref={inputRef} contentEditable={false} readOnly value={tradeURL}></input>
                  <button onClick={copyAddress}>COPY URL</button>
                </div>

                <div className='trade-offer-desc'>
                  <ul>
                  <li>Click the "Copy URL" button to easily copy your trade URL</li>
                  <li>Share your trade URL with anyone who wants to trade with you!</li>
                  </ul>
                </div>

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
