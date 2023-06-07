import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css";
import mntd from '../images/minted.png'
import ebisu from '../images/ebisu.svg'
import nftscan from '../images/nftscan.png'

const selectedTheme = localStorage.getItem("selectedTheme")

export default function TradeItem(props) {
  const { nftname, nftimage, showCheckbox, onSelectNFT } = props;
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
    onSelectNFT();
  }

  return (
    <label className={props.class}>
      <div className="marketplace-details">
      <div className="nft-information-minted">
        <a target="_blank" href={props.nftscanURL}>
          <img
              alt="view on minted.network"
              height={20}
              src={nftscan}
          />
          </a>
        </div>

        <div className="nft-information-minted">
        <a target="_blank" href={props.mintedURL}>
          <img
              alt="view on minted.network"
              height={20}
              src={mntd}
          />
          </a>
        </div>

        <div className="nft-information-minted">
        <a target="_blank" href={props.ebisuURL}>
          <img
              alt="view on minted.network"
              height={20}
              src={ebisu}
          />
          </a>
        </div>
      </div>
      <img id="nft-trade-item-img" width={200} src={nftimage}></img>
      <div className="nft-information">
        <div className="nft-information-name">
        <span>{nftname}</span>
        </div>
        <button onClick={() => handleCheckboxChange()} id="create-select-button">SELECT</button>

      </div>
    </label>
  );
}

TradeItem.propTypes = {
  nftname: PropTypes.string.isRequired,
  nftimage: PropTypes.string.isRequired,
  showCheckbox: PropTypes.bool,
  onSelectNFT: PropTypes.func,
};

TradeItem.defaultProps = {
  showCheckbox: false,
};
