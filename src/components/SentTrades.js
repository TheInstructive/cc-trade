import React, { useState, useEffect } from 'react'
import { getActiveOffers, cancelOffer, onWalletChange } from "../web3/WalletConnect";

export default function SentTrades() {
const [ activeTrades, setActiveTrades ] = useState([]);

useEffect(() => {
  async function fetchData() {
    const result = await getActiveOffers();
    if (result.offers) {
      setActiveTrades(result.offers);
    } else {
      console.error(result.error);
    }
  }
  fetchData();

  onWalletChange((account) => {
    if(account.address){
      fetchData();
    }
  });
}, []);

const receivedTrades = activeTrades.filter(trade => !trade.received);

return (
<div>
{receivedTrades.map((offer, index) => (
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
                <button onClick={() => cancelOffer(offer.id, offer.index)} id="decline-button">CANCEL</button>
        </div> 

</div>
))}

</div>

  )
}
