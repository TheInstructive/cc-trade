import React from "react";
import "../App.css";
import minted from '../images/minted.png'
import ebisusbay from '../images/ebisu.svg'
import nftscan from '../images/nftscan.png'

const images = {
  nftscan,
  minted,
  ebisusbay,
}

export default function TradeItem({ class: className, showCheckbox, onSelectNFT, token }) {
  return (
    <label className={className}>
      <div className="marketplace-details">
        {token.links?.map((link, index) => (
        <div className="nft-information-minted" key={index}>
          <a target="_blank" rel="noreferrer" href={link.url}>
            <img
              alt={"view on " + link.title}
              height={20}
              src={images[link.name] || '#'}
            />
          </a>
        </div>
        ))}
      </div>
      <img id="nft-trade-item-img" width={200} src={token.image} alt={token.name} />
      <div className="nft-information">
        <div className="nft-information-name">
        <span>{token.name}</span>
        </div>
        {showCheckbox &&
        <button onClick={() => onSelectNFT && onSelectNFT()} id="create-select-button">SELECT</button>
        }
      </div>
    </label>
  );
}