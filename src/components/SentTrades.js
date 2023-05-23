import React, { useState, useEffect, useContext } from 'react'
import { getActiveOffers, cancelOffer, onWalletChange, getCronosID } from "../web3/WalletConnect";
import { AlertContext } from './Alert';

const TRADES_PER_PAGE = 5;

export default function SentTrades() {
const [ activeTrades, setActiveTrades ] = useState([]);
const [ page, setPage ] = useState(0);
const [loading, setLoading] = useState(true);
const { showAlert } = useContext(AlertContext);

const pageStartIndex = TRADES_PER_PAGE * page;
const pageTrades = activeTrades.slice(pageStartIndex, pageStartIndex + TRADES_PER_PAGE);

async function fetchTradeDetails(trades) {
  try {
    for (let i=0; i<trades.length; i++) {
      const details = await getCronosID({
        address: trades[i].address,
      });
      trades[i] = {
        ...details,
        ...trades[i],
      };
    }
  } catch (err) {
    console.error("Error while updating trade details", err);
  }

  return trades;
}

useEffect(() => {
  async function fetchData() {
    setLoading(true);

    const result = await getActiveOffers();
    if (result.offers) {
      const trades = result.offers.filter(trade => !trade.received).reverse();
      setActiveTrades(trades);
      setLoading(false);
  
      setActiveTrades(await fetchTradeDetails(trades));
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
{pageTrades.map((offer, index) => (
<div key={index} className="trade-offer-wrapper">
  <div className="trade-offer-header">
    <div className="offer-date">
      <h3>31.03.2023</h3>
    </div>

    <h3>YOU OFFERED <br/> <b>{offer.name || offer.address}</b></h3>
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

<div className='trades-message-text'>
{loading && <h2>Loading...</h2>}

{!loading && pageTrades.length < 1 &&
 <h2>You have no offers.</h2>
}
</div>


</div>

  )
}
