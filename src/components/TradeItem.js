import React, { useState } from 'react'
import '../App.css';

export default function TradeItem(props) {
    const [isChecked, setIsChecked] = useState(false);
    const showCheckbox = props.showCB

    function handleCheckboxChange() {
        setIsChecked(!isChecked);
      }

  return (
    <label onClick={props.selectedNFT} htmlFor={props.nftid} className={isChecked ? 'nft-trade-item selected-nft' : 'nft-trade-item'}>
    <div className='nft-image'><img width={200} src={props.nftimage}></img></div>
    <div className='nft-information'>
        <a>{props.nftname}</a>
       {showCheckbox ? <input onChange={handleCheckboxChange} type="checkbox" id={props.nftid} value={props.nftname} /> : ""}  
    </div>
    </label>
  )
}
