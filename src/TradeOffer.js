import React, { useState } from "react";
import "./App.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TradeItem from "./components/TradeItem";
import loaded from "./images/ll.jpg";

export default function TradeOffer() {
  const [tradeStepClass, setradeStepClass] = useState("trade-bar-line trade-step-1");
  const [currentTradeStep, setcurrentTradeStep] = useState(1);
  const [warningClass, setwarningClass] = useState("warning");
  const [haveNFTs, setHaveNFTs] = useState([]);
  const [wantNFTs, setWantNFTs] = useState([]);

  function nextStep() {
    if (currentTradeStep === 1) {
      setradeStepClass("trade-bar-line trade-step-2");
      setcurrentTradeStep(2);
    }
    if (currentTradeStep === 2) {
      setradeStepClass("trade-bar-line trade-step-3");
      setcurrentTradeStep(3);
    } else {
      return;
    }
  }

  function prevStep() {
    if (currentTradeStep === 3) {
      setradeStepClass("trade-bar-line trade-step-2");
      setcurrentTradeStep(2);
    }

    if (currentTradeStep === 2) {
      setradeStepClass("trade-bar-line trade-step-1");
      setcurrentTradeStep(1);
    } else {
      return;
    }
  }

  function closeWarning() {
    setwarningClass("displaynone");
  }

  return (
    <div className="main-container">
      <div className={warningClass}>
        <div>
          <h2>Warning!</h2>
          <p>
            Scammers send fake text messages to trick you into giving them your
            personal information — things like your password, account number, or
            Social Security number. -RNDM MSG-
          </p>
        </div>
        <button onClick={closeWarning}>X</button>
      </div>

      {currentTradeStep === 1 && (
        <div>
          <div className="trade-information">
            <h3>
              Please select at least one NFT you want to trade with{" "}
              <b>$USERNAME</b>
            </h3>
            <p>
              You'll able to see their NFTs in the next page, select an NFT and
              click Next Step button.
            </p>
          </div>
          <div className="trade-area">
            <div className="trade-line"></div>
            <div className="trade-container">
              <TradeItem
                nftid="test"
                nftimage={loaded}
                nftname="Loaded Lion #1146"
                showCB = {true}
              />
              <TradeItem
                nftid="test1"
                nftimage={loaded}
                nftname="Loaded Lion #1147"
                showCB = {true}

              />
            </div>
          </div>
        </div>
      )}

      {currentTradeStep === 2 && (
        <div>
          <div className="trade-information">
            <h3>Select their NFT</h3>
            <p>You have to confirm the offer in the next step.</p>
          </div>
          <div className="trade-area">
            <div className="trade-line"></div>
            <div className="trade-container">
              <TradeItem
                nftid="test"
                nftimage={loaded}
                nftname="Loaded Lion #1146"
                showCB = {true}

              />
              <TradeItem
                nftid="test1"
                nftimage={loaded}
                nftname="Loaded Lion #1147"
                showCB = {true}

              />
            </div>
          </div>
        </div>
      )}

    {currentTradeStep === 3 && (
        <div>
        <div className="trade-information">
            <h3>PLEASE CONFIRM THE OFFER</h3>
            <p></p>
        </div>
        <div className="trade-area">
            <div className="trade-line"></div>
            <div className="trade-offer-container">
            <div className="given-nfts-container">
                <h3>YOU OFFERED:</h3>
                <div className="given-nfts">
                <TradeItem
                        nftid="test"
                        nftimage={loaded}
                        nftname="Loaded Lion #1146"
                        showCB = {false}
                    />
                                    <TradeItem
                        nftid="test"
                        nftimage={loaded}
                        nftname="Loaded Lion #1146"
                        showCB = {false}
                    />
                                    <TradeItem
                        nftid="test"
                        nftimage={loaded}
                        nftname="Loaded Lion #1146"
                        showCB = {false}
                    />
                </div>
            </div>

            <div className="given-nfts-container">
                <h3>YOU WANT:</h3>
                <div className="given-nfts">
                <TradeItem
                        nftid="test"
                        nftimage={loaded}
                        nftname="Loaded Lion #1146"
                        showCB = {false}
                    />
                                    <TradeItem
                        nftid="test"
                        nftimage={loaded}
                        nftname="Loaded Lion #1146"
                        showCB = {false}
                    />
                                    <TradeItem
                        nftid="test"
                        nftimage={loaded}
                        nftname="Loaded Lion #1146"
                        showCB = {false}
                    />
                </div>
            </div>
            </div>
        </div>
        </div>
    )
    }


      <div className="trade-steps">
        <button onClick={prevStep}>PREV STEP</button>

        <div className="trade-steps-container">
          <div className="trade-bar-container">
            <div className="trade-ghost-line"></div>
            <div className={tradeStepClass}></div>
            <div className="trade-dot-container">
              <div className="trade-bar-dot">
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <div className="trade-bar-dot">
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <div className="trade-bar-dot">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </div>
          </div>

          <div className="trade-steps-text">
            <div className="trade-step">Select Your NFT</div>
            <div className="trade-step">Select Their NFT</div>
            <div className="trade-step">Confirm Offer</div>
          </div>
        </div>

        <button onClick={nextStep}>{currentTradeStep <= 2 ? "NEXT STEP" : "CONFIRM OFFER" }</button>
      </div>
    </div>
  );
}
