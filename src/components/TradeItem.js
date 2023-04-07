import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export default function TradeItem(props) {
  const { nftid, nftname, nftimage, showCheckbox, onSelectNFT } = props;
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
      setIsChecked(!isChecked);
    }


return (
  <label onClick={onSelectNFT} htmlFor={props.nftid} className={isChecked ? 'nft-trade-item selected-nft' : 'nft-trade-item'}>
  <img width={200} src={nftimage}></img>
  <div className='nft-information'>
      <span>{nftname}</span>
      &nbsp;&nbsp;
     {showCheckbox ? <input onChange={() => handleCheckboxChange} type="checkbox" id={nftid} value={nftname} /> : ""}  
  </div>
  </label>
)
}

TradeItem.propTypes = {
  nftid: PropTypes.string.isRequired,
  nftname: PropTypes.string.isRequired,
  nftimage: PropTypes.string.isRequired,
  showCheckbox: PropTypes.bool,
  onSelectNFT: PropTypes.func.isRequired,
};

TradeItem.defaultProps = {
  showCheckbox: false,
};
