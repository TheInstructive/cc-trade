import React from 'react'
import trades from '../trades'

export default function SentTrades() {
const sentTrades = trades.filter(trade => !trade.received);


return (
<div>
{sentTrades.map((trade, index) => (
<div key={index} className="trade-offer-wrapper">
  <div className="trade-offer-header">
    <div className="offer-date">
      <h3>31.03.2023</h3>
    </div>

    <h3>YOU OFFERED $WALLETADDRESS</h3>
    <div className="trade-status-active">WAITING FOR RESPONSE</div>
  </div>


    <div className="trade-offer-container">
      <div className="given-nfts-container">
        <h3>YOUR NFT(S):</h3>
        <div className="given-nfts">
        {trade.have.map((nft, i) => (
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
        {trade.want.map((nft, i) => (
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
      <div className="terms">
        This offer will be canceled in <b>89</b> hours.
      </div>
      <button id="decline-button">CANCEL OFFER</button>
    </div>

</div>
))}

</div>

  )
}
