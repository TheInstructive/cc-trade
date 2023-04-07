import React, { useState } from 'react'
import trades from '../trades'
import { getActiveOffers } from "../web3/WalletConnect";
import { useEffect } from 'react';


export default function ReceivedTrades() {
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
}, []);

const receivedTrades = activeTrades.filter(trade => trade.received);


const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

return (
<div>
{receivedTrades.map((offer) => (
<div key={offer.index} className="trade-offer-wrapper">
  <div className="trade-offer-header">
    <div className="offer-date">
      <h3>31.03.2023</h3>
    </div>

    <h3>{offer.name} OFFERED YOU</h3>
    <div className="trade-status-active">ACTIVE</div>
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

    <form onSubmit={handleSubmit}>
        <div className="trade-offer-buttons">
            <div className="terms">
            <input required={true} type="checkbox"></input> I agreed to transfer
            ownership of the specified NFT(s) to the user making the offer.
            </div>

            <div>
                <button id="accept-button">ACCEPT</button>
                <button id="decline-button">DECLINE</button>
            </div>
        </div> 
    </form>

</div>
))}

</div>

  )
}
