import React, { useState, useEffect, useContext } from 'react'
import { AlertContext } from './Alert';
import { getActiveOffers, acceptOffer, cancelOffer, onWalletChange, getMissingApprovals, getCronosID, requestApproval } from "../web3/WalletConnect";

const TRADES_PER_PAGE = 5;

export default function ReceivedTrades() {
const [ activeTrades, setActiveTrades ] = useState([]);
const [ page, setPage ] = useState(0);
const [ tradeTerms, setTradeTerms ] = useState(false);
const [offerApproval, setOfferApproval] = useState("");
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

function acceptTerms(){
  setTradeTerms(!tradeTerms)
}

async function fetchData() {
  setLoading(true);

  const result = await getActiveOffers();
  if (result.offers) {
    const trades = result.offers.filter(trade => trade.received).reverse();
    setActiveTrades(trades);
    setLoading(false);

    setActiveTrades(await fetchTradeDetails(trades));
  } else {
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
  showAlert("Checking for missing approvals...", "info");

  getMissingApprovals({ id, have: false }).then(async ({ missing, error: missingError }) => {
    if (missingError) {
      return showAlert(missingError, "error", 2000);
    }

    const requestForAll = true;
    const alreadyApproved = {};

    for (let i = 0; i < missing.length; i++) {
      if (requestForAll) {
        if (alreadyApproved[missing[i].contractAddress]) {
          continue;
        }

        showAlert("Requesting approval for " + missing[i].collection.name(), "info");
      } else {
        showAlert("Requesting approval for " + missing[i].name(), "info");
      }

      const { error } = await requestApproval(missing[i], requestForAll);
      if (error) {
        return showAlert(error, "error", 2000);
      }

      if (requestForAll) {
        alreadyApproved[missing[i].contractAddress] = true;
      }
    }

    showAlert("Confirming transaction with your wallet...", "info");

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

return (
<div>
{pageTrades.map((offer) => (
<div key={offer.index} className="trade-offer-wrapper">
  <div className="trade-offer-header">
    <div className="offer-date">
      <h3>31.03.2023</h3>
    </div>

    <h3><b>{offer.name || offer.address}</b> <br/> OFFERED YOU</h3>
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

{!loading && pageTrades.length < 1 &&
 <div>You have no offers.</div>
}


</div>

  )
}
