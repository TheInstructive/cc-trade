import React, { useContext, useEffect, useState } from 'react'
import { checkApprovals, revokeApproval, WalletContext } from "./web3/WalletConnect";
import Alert, { AlertContext } from './components/Alert';
import NeedLogin from './components/NeedLogin'
import paginate from './utils/paginate';
import getNFTs from './web3/Inventory';
import TradeItem from './components/TradeItem';

export default function RevokePage() {
  const { showAlert } = useContext(AlertContext);
  const { isConnected, address } = useContext(WalletContext);

  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState([]);
  const [collections, setCollections] = useState([]);

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);
    setLoading(false);
  };
  const { page, buttons } = paginate(pageSize, currentPage, tokens, handlePageClick);

  useEffect(() => {
    if (isConnected) {
      (async () => {
        setLoading(true);
  
        try {
          const { error, approvals } = await checkApprovals();
          if (error) {
            showAlert(error, "error", 3000);
          } else {
            setCollections(approvals);
          }

          const have = await getNFTs(address);
          if (have) {
            setTokens(have);
          }
        } catch (err) {
          console.error(err);
        }
  
        setLoading(false);
      })();
    }
  }, [address, isConnected]);

  async function revoke(token) {
    const { error } = await revokeApproval(token, false);

    if (error) {
      showAlert(error, "error", 3000);
    }
  }

  async function revokeCollection(collection) {
    const { error } = await revokeApproval({
      collection,
    }, true);

    if (error) {
      showAlert(error, "error", 3000);
    }
  }

  if (!isConnected) {
    return <NeedLogin />
  }

  return (<div className='revoke-wrapper'>
    <Alert />

    <h1 className='title'>Revoke Collection Approvals</h1>

    <div>
      {collections.map((col, index) => <div key={index}>
        <h2 className='text'>
          {col.collection.name()}

          <button className='button' disabled={!col.approved} onClick={() => revokeCollection(col.collection)}>
            {col.approved ? "Revoke Approval" : "NOT APPROVED"}
          </button>
        </h2>
      </div>)}
    </div>

    <h1 className='title'>Revoke Individual NFT Approvals</h1>

    <div style={{overflow:'hidden'}} className="trade-container">
      <div className='trades-message-text'>
        {loading && <h2>Loading...</h2>}

        {!loading && tokens.length === 0 && <div>
          <br />
          <h2>You don't have any NFTs from the approved collections.</h2>
          <button className="button"><a href="https://mint.aliensfromearth.com">Wanna try minting?</a></button>
          <br />
          <br />
        </div>}
      </div>

      {!loading && page.map((token, idx) => (
        <TradeItem
          key={idx}
          class={'nft-trade-item'}
          nftimage={token.image}
          nftname={token.name}
          showCheckbox={false}
          onSelectNFT={() => revoke(token)} 
          mintedURL={`https://minted.network/collections/cronos/${token.address}/${token.id}`}
          nftscanURL = {`https://cronos.nftscan.com/${token.address}/${token.id}`}
          ebisuURL = {`https://app.ebisusbay.com/collection/${token.address}/${token.id}`}
        />
      ))}

      <div className="trade-offer-pagination">
        {buttons}
      </div>
    </div>
  </div>);
}
