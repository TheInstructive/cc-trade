import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import TradeItem from "../components/TradeItem";
import { getNFTs } from "../web3/Inventory";
import { WalletContext } from "../web3/WalletConnect";
import paginate from '../utils/paginate';
import travolta from '../images/travolta-empty.gif';

export default function Inventory() {
  const [loading, setLoading] = useState(true);
  const [haveNFTs, setHaveNFTs] = useState([]);
  const { address, isConnected, network } = useContext(WalletContext);

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);
    setLoading(false);
  };
  const { page, buttons } = paginate(pageSize, currentPage, haveNFTs, handlePageClick);

  useEffect(() => {
    if (isConnected) {
      (async () => {
        setLoading(true);
  
        try {
          const have = await getNFTs(address);
          if (have) {
            setHaveNFTs(have);
          }
        } catch (err) {
          console.error(err);
        }
  
        setLoading(false);
      })();
    }
  }, [address, isConnected, network]);


  return (
    <div style={{overflow:'hidden'}} className="trade-container">
          <div className='trades-message-text'>
          {loading && <h2>Loading...</h2>}

          {!loading && haveNFTs.length === 0 && <div>
            <img src={travolta} alt="travolta empty hall"/>
            <br />
            <h2>You don't have any NFTs from the approved collections.</h2>
            <button className="button"><a href="https://mint.aliensfromearth.com">Wanna try minting?</a></button>
            <br />
            <br />
          </div>}
          </div>

          {!loading && page.map((have, idx) => (
                <TradeItem
                  key={idx}
                  class={'nft-trade-item'}
                  token={have}
                />
          ))}

          <div className="trade-offer-pagination">
            {buttons}
          </div>
    </div>
  );
}
