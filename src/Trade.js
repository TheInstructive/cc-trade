import React, { useState } from 'react'
import './App.css';
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TradeItem from './components/TradeItem';
import loaded from './images/ll.jpg'


export default function Trade() {
    const [tradeStepClass, setradeStepClass] = useState('trade-bar-line trade-step-1');
    const [currentTradeStep, setcurrentTradeStep] = useState(1);
    const [warningClass, setwarningClass] = useState("warning")


    function nextStep(){
        if (currentTradeStep >= 3){return}
        setcurrentTradeStep(currentTradeStep+1)
        setradeStepClass("trade-bar-line trade-step-"+currentTradeStep)
    }

    function prevStep(){
        if (currentTradeStep <= 1){return}
        setcurrentTradeStep(currentTradeStep-1)
        setradeStepClass("trade-bar-line trade-step-"+currentTradeStep)
    }

    function closeWarning(){
        setwarningClass("displaynone")
    }

  return (
    <div className='main-container'>
        <div className={warningClass}>
            <div>
            <h2>Warning!</h2>
            <p>Scammers send fake text messages to trick you into giving them your personal information — things like your password, account number, or Social Security number.</p>
            </div>
            <button onClick={closeWarning}>X</button>
        </div>

        <div className='trade-information'>
            <h3>Please select at least one NFT you want to trade with <b>$USERNAME</b></h3>
            <p>You'll able to see their NFTs in the next page, select an NFT and press Next Step button.</p>
        </div>
        <div className='trade-area'>
            <div className='trade-line'></div>
            <div className='trade-container'>
            <TradeItem
                nftid = "test"
                nftimage = {loaded}
                nftname = "Loaded Lion #1146"
                />
             <TradeItem
                nftid = "test1"
                nftimage = {loaded}
                nftname = "Loaded Lion #1147"
            />
            </div>
        </div>

        <div className='trade-steps'>
        <button onClick={prevStep}>PREV STEP</button>

        <div className='trade-steps-container'>
            <div className='trade-bar-container'>
            <div className='trade-ghost-line'></div>
            <div className={tradeStepClass}></div>
                <div className='trade-dot-container'>
                    <div className='trade-bar-dot'><FontAwesomeIcon icon={faCheck} /></div>
                    <div className='trade-bar-dot'><FontAwesomeIcon icon={faCheck} /></div>
                    <div className='trade-bar-dot'><FontAwesomeIcon icon={faCheck} /></div>
                </div>
            </div>

            <div className='trade-steps-text'>
                <div className='trade-step'>Select an NFT</div>
                <div className='trade-step'>Select an NFT</div>
                <div className='trade-step'>Confirm Offer</div>
            </div>
        </div>

            <button onClick={nextStep}>NEXT STEP</button>
        </div>


    </div>
  )
}
