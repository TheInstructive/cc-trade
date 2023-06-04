import React, { useState, useEffect, useContext } from 'react'
import { getActiveOffers, cancelOffer, getCronosID, WalletContext } from "../web3/WalletConnect";
import { AlertContext } from './Alert';
import paginate from '../utils/paginate';
import TradeItem from './TradeItem';

const pageSize = 5;

export default function SentTrades() {
const [ activeTrades, setActiveTrades ] = useState([]);
const [loading, setLoading] = useState(true);
const { showAlert } = useContext(AlertContext);
const { address, isConnected } = useContext(WalletContext);

const [currentPage, setCurrentPage] = useState(1);
const handlePageClick = (pageNumber) => {
  setLoading(true);
  setCurrentPage(pageNumber);
  setLoading(false);
};
const { page: pageTrades, buttons } = paginate(pageSize, currentPage, activeTrades, handlePageClick);


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

useEffect(() => {
  if (address && isConnected) {
    fetchData();
  }
}, [address, isConnected]);

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
    <h3>YOU OFFERED <br/> <b>{offer.name || offer.address}</b></h3>
    <div className="trade-status-active">WAITING FOR RESPONSE</div>
  </div>


    <div className="trade-offer-container">
      <div className="given-nfts-container">
      <div className='given-nfts-title'><h3>YOUR NFT(S)</h3></div>
        
        <div className="given-nfts">
        {offer.have.map((nft, i) => (
        <TradeItem
                  key={i}
                  class={'nft-trade-item'}
                  nftimage={nft.image}
                  nftname={nft.name}
                  showCheckbox={false}
                  onSelectNFT={() => ""} 
                  mintedURL={`https://minted.network/collections/cronos/${nft.address}/${nft.id}`}
                />
                
          ))}
      </div>
      </div>

      <div className="given-nfts-container">
      <div className='given-nfts-title'><h3>THEIR NFT(S)</h3></div>
        <div className="given-nfts">
        {offer.want.map((nft, i) => (
        <TradeItem
                  key={i}
                  class={'nft-trade-item'}
                  nftimage={nft.image}
                  nftname={nft.name}
                  showCheckbox={false}
                  onSelectNFT={() => ""} 
                  mintedURL={`https://minted.network/collections/cronos/${nft.address}/${nft.id}`}
                />
                
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

<div className="trade-offer-pagination">
{buttons}
</div>


</div>

  )
}
