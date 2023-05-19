import React, { useState, useEffect, useContext } from 'react'
import { getActiveOffers, cancelOffer, onWalletChange } from "../web3/WalletConnect";
import { AlertContext } from './Alert';

export default function SentTrades() {
const [ activeTrades, setActiveTrades ] = useState([]);
const [loading, setLoading] = useState(true);
const { showAlert } = useContext(AlertContext);

useEffect(() => {
  async function fetchData() {
    setLoading(true);

    const result = await getActiveOffers();
    if (result.offers) {
      setActiveTrades(result.offers);
    } else {
      console.error(result.error);
    }

    setLoading(false);
  }
  fetchData();

  onWalletChange((account) => {
    if(account.address){
      fetchData();
    }
  });
}, []);

const receivedTrades = activeTrades.filter(trade => !trade.received);
const reversedTrades = [...receivedTrades].reverse();

async function cancelTradeOffer(id, index) {
  const { error } = await cancelOffer(id, index);

  if (error) {
    showAlert(error, "error", 2000);
    return;
  }

  showAlert("Offer cancelled.", null, 2000);
}


return (
<div>
{reversedTrades.map((offer, index) => (
<div key={index} className="trade-offer-wrapper">
  <div className="trade-offer-header">
    <div className="offer-date">
      <h3>31.03.2023</h3>
    </div>

    <h3>YOU OFFERED <br/> <b>{offer.name}</b></h3>
    <div className="trade-status-active">WAITING FOR RESPONSE</div>
  </div>


    <div className="trade-offer-container">
      <div className="given-nfts-container">
        <h3>YOUR NFT(S):</h3>
        <div className="given-nfts">
        {offer.have.map((nft, i) => (
            <div key={i} className="offered-nft-item">
              <div className="offered-nft-image">
                <img width={100} src={nft.image} alt={nft.name} />
              </div>
              <div className="offered-nft-information">
                <a>{nft.name}</a>
              </div>
            </div>
            ))}
        </div>
      </div>

      <div className="given-nfts-container">
        <h3>THEIR NFT(S):</h3>
        <div className="given-nfts">
        {offer.want.map((nft, i) => (
            <div key={i} className="offered-nft-item">
              <div className="offered-nft-image">
                <img width={100} src={nft.image} alt={nft.name} />
              </div>
              <div className="offered-nft-information">
                <a>{nft.name}</a>
              </div>
            </div>
            ))}
        </div>
      </div>
    </div>

        <div className="trade-offer-buttons">
                <button onClick={() => cancelTradeOffer(offer.id, offer.index)} id="decline-button">CANCEL</button>
        </div> 

</div>
))}

{loading && <div>Loading...</div>}

{!loading && receivedTrades.length < 1 &&
 <div>You have no offers.</div>
}


</div>

  )
}
