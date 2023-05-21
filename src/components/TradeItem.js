import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css";
import mntd from '../images/mntd.svg'
import mntdark from '../images/mntdark.svg'
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
      <img id="nft-trade-item-img" onClick={() => handleCheckboxChange()} width={200} src={nftimage}></img>
      <div className="nft-information">
        <div className="nft-information-name">
        <span>{nftname}</span>
        </div>

        <div className="nft-information-minted">
        <img
            alt="view on minted.network"
            height={20}
            src={mntd}
        ></img>

        <a target="_blank" href={props.mintedURL}>
          Details
        </a>
        </div>

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
