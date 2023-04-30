import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css";

export default function TradeItem(props) {
  const { nftname, nftimage, showCheckbox, onSelectNFT } = props;
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
    onSelectNFT();
  }

  return (
    <label className={props.class}>
      <img onClick={() => handleCheckboxChange()} width={200} src={nftimage}></img>
      <div className="nft-information">
        <span>{nftname}</span>{" "} &nbsp;&nbsp;
        <span>
        <a target="_blank" href={props.mintedURL}>
          <img
            alt="view on minted.network"
            height={20}
            src={require("../images/collections/minted.png")}
          ></img>
        </a>
        </span>
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
