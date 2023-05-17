import React, { useState, useEffect } from 'react'
import { getActiveOffers, acceptOffer, cancelOffer, onWalletChange, getMissingApprovals } from "../web3/WalletConnect";


export default function ReceivedTrades() {
const [ activeTrades, setActiveTrades ] = useState([]);
const [ tradeTerms, setTradeTerms ] = useState(false);
const [alertClas, setAlertClass] = useState("alert-error displaynone");
const [alertMessage, setAlertMessage] = useState("");
const [offerApproval, setOfferApproval] = useState("");
const [loading, setLoading] = useState(true);


function acceptTerms(){
  setTradeTerms(!tradeTerms)
}

const showAlert = (err) => {
  if(err){
    setAlertClass("alert-error");
  }
  else{
    setAlertClass("alert");
  }

  setTimeout(() => {
    setAlertClass("alert-error displaynone");
  }, 2000);
};

useEffect(() => {
  async function fetchData() {
    setLoading(true);

    const result = await getActiveOffers();
    if (result.offers) {
      setActiveTrades(result.offers);
    } else {
      console.error(result.error);
      showAlert(result.error);
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

function acceptTradeOffer(id, index){
  getMissingApprovals({ id, have: false }).then(async ({ missing, error: missingError }) => {
    if (missingError) {
      setAlertMessage(missingError)
      return showAlert(true);
    }

    if(missing.length>0){
      setAlertMessage("NFT(s) not eligible for trade.")
      return showAlert(true);

    }

    acceptOffer(id,index)
    setAlertMessage("Accepted!")
    return showAlert(false);
  })

}


const receivedTrades = activeTrades.filter(trade => trade.received);
const reversedTrades = [...receivedTrades].reverse();



return (
<div>
<div className={alertClas}>
<h2>{alertMessage}</h2>
</div>
{reversedTrades.map((offer) => (
<div key={offer.index} className="trade-offer-wrapper">
  <div className="trade-offer-header">
    <div className="offer-date">
      <h3>31.03.2023</h3>
    </div>

    <h3><b>{offer.name}</b> <br/> OFFERED YOU</h3>
    <div className="trade-status-active">ACTIVE</div>
  </div>


    <div className="trade-offer-container">
      <div className="given-nfts-container">
        <h3>YOUR NFT(S):</h3>
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

      <div className="given-nfts-container">
        <h3>THEIR NFT(S):</h3>
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
    </div>

        <div className="trade-offer-buttons">
            <div className="terms">
            <input checked={tradeTerms} onChange={() => acceptTerms()} required={true} type="checkbox"></input> I agreed to transfer
            ownership of the specified NFT(s) to the user making the offer.
            </div>

            <div>
                <button onClick={() => acceptTradeOffer(offer.id, offer.index)} disabled={!tradeTerms} id="accept-button">ACCEPT</button>
                <button onClick={() => cancelOffer(offer.id, offer.index)} id="decline-button">CANCEL</button>
            </div>
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
