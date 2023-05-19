import React, { useState, useEffect, useContext } from 'react'
import { AlertContext } from './Alert';
import { getActiveOffers, acceptOffer, cancelOffer, onWalletChange, getMissingApprovals } from "../web3/WalletConnect";


export default function ReceivedTrades() {
const [ activeTrades, setActiveTrades ] = useState([]);
const [ tradeTerms, setTradeTerms ] = useState(false);
const { showAlert } = useContext(AlertContext);
const [offerApproval, setOfferApproval] = useState("");
const [loading, setLoading] = useState(true);


function acceptTerms(){
  setTradeTerms(!tradeTerms)
}

async function fetchData() {
  setLoading(true);

  const result = await getActiveOffers();
  if (result.offers) {
    setActiveTrades(result.offers);
  } else {
    console.error(result.error);
    showAlert(result.error, "error", 2000);
  }

  setLoading(false);
}

useEffect(() => {
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
      return showAlert(missingError, "error", 2000);
    }

    if(missing.length>0){
      return showAlert("NFT(s) not eligible for trade.", "error", 2000);

    }

    const { error } = await acceptOffer(id,index);
    if (error) {
      return showAlert(error, "error", 2000);
    }

    showAlert("Offer accepted.", null, 2000);
    fetchData();
  })
}

async function cancelTradeOffer(id, index) {
  const { error } = await cancelOffer(id, index);
  if (error) {
    return showAlert(error, "error", 2000);
  }

  showAlert("Offer cancelled.", null, 2000);
  fetchData();
}


const receivedTrades = activeTrades.filter(trade => trade.received);
const reversedTrades = [...receivedTrades].reverse();



return (
<div>
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
                <button onClick={() => cancelTradeOffer(offer.id, offer.index)} id="decline-button">CANCEL</button>
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
