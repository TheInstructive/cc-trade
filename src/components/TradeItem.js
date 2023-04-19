import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export default function TradeItem(props) {
  const { nftname, nftimage, showCheckbox, onSelectNFT } = props;
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
      setIsChecked(!isChecked);
      onSelectNFT();
    }

return (
  <label onClick={() => handleCheckboxChange()} className={props.class}>
  <img width={200} src={nftimage}></img>
  <div className='nft-information'>
      <span>{nftname}</span>
  </div>
  </label>
)
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
