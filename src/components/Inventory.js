import React, { useEffect, useState } from "react";
import "../App.css";
import TradeItem from "../components/TradeItem";
import { getNFTs } from "../web3/Inventory";
import { getWalletAddress } from "../web3/WalletConnect";

export default function Inventory() {



  const [walletAddress, setWalletAddress] = useState("");


  const [haveNFTs, setHaveNFTs] = useState([]);

  const pageSize = 10;

  const [currentHavePage, setCurrentHavePage] = useState(1);

  const startHaveIndex = (currentHavePage - 1) * pageSize;

  const endHaveIndex = startHaveIndex + pageSize;

  const currentHaveItems = haveNFTs.slice(startHaveIndex, endHaveIndex);

  const totalHavePages = Math.ceil(haveNFTs.length / pageSize);

  const havePageNumbers = Array.from(
    { length: totalHavePages },
    (_, i) => i + 1
  );

  const handlePageClick = (pageNumber) => {
      setCurrentHavePage(pageNumber);
  };

  useEffect(() => {
    setWalletAddress(getWalletAddress());

    getNFTs(walletAddress).then(have => have && setHaveNFTs(have)).catch(console.error);
  }, [walletAddress]);


  return (
    <div style={{overflow:'hidden'}} className="trade-container">
              {currentHaveItems.map((have, idx) => (
                <TradeItem
                  key={idx}
                  class={'nft-trade-item'}
                  nftimage={have.image}
                  nftname={have.name}
                  showCheckbox={false}
                  onSelectNFT={() => ""} 
                />
              ))}

          <div className="trade-offer-pagination">
            {havePageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                disabled={currentHavePage === pageNumber}
              >
                {pageNumber}
              </button>
            ))}
          </div>
    </div>
  );
}
