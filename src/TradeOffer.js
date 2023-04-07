import React, { useEffect, useState } from "react";
import "./App.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TradeItem from "./components/TradeItem";
import loaded from "./images/ll.jpg";
import getNFTs from "./web3/Inventory"
import { getWalletAddress, createOffer } from "./web3/WalletConnect";
import { useParams } from "react-router-dom";


export default function TradeOffer() {
  const { walletadrs } = useParams();

  const [tradeStepClass, setradeStepClass] = useState("trade-bar-line trade-step-1");
  const [currentTradeStep, setcurrentTradeStep] = useState(1);
  const [warningClass, setwarningClass] = useState("warning");
  const [walletAddress, setWalletAddress] = useState("");

  const [haveNFTs, setHaveNFTs] = useState([]);
  const [wantNFTs, setWantNFTs] = useState([]);

  const [haveOffer, setHaveOffer] = useState([]);
  const [wantOffer, setWantOffer] = useState([]);

  useEffect(() => {
    setWalletAddress(getWalletAddress())

    async function getHaveNFTs() {
      const have = await getNFTs("0xb6ea6d126a2468786f11e1e09c9d283c03788753");
      if (have) {
        setHaveNFTs(have);
      } else {
        console.error(have);
      }
    }

    async function getWantNFTs() {
      const want = await getNFTs(walletadrs);
      if (want) {
        setWantNFTs(want);
      } else {
        console.error(want);
      }
    }

    getHaveNFTs();
    getWantNFTs();
  }, []);

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

  function nftSelected(address, id, image, name, isHave){
    if(isHave){
      const isObjectExists = haveOffer.some(obj => obj.nftid === id && obj.nftadress === address);
      const has = { nftadress: address, nftid: id, nftimage:image, nftname:name };

      if(!isObjectExists){
        setHaveOffer([...haveOffer, has]);
      }
      else{

      }
      console.log(haveOffer)
    }

    else{
      const isObjectExists = wantOffer.some(obj => obj.nftid === id && obj.nftadress === address);
      const wanted = { nftadress: address, nftid: id, nftimage:image, nftname:name };

      if(!isObjectExists){
        setWantOffer([...wantOffer, wanted]);
      }
      else{

      }
      console.log(wantOffer)

    }
  }

  function confirmOffer(){
    createOffer()
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
              <b>{walletadrs}</b>
            </h3>
            <p>
              You'll able to see their NFTs in the next page, select an NFT and
              click Next Step button.
            </p>
          </div>
          <div className="trade-area">
            <div className="trade-line"></div>
            <div className="trade-container">

            {haveNFTs.map((have, idx) => ( 
              <TradeItem
                key={idx}
                nftid={have.name}
                nftimage={have.image}
                nftname={have.name}
                showCheckbox = {true}
                onSelectNFT={() => nftSelected(have.address, have.id, have.image, have.name, true)}
              />
            ))}
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
            {wantNFTs.map((want, idx) => ( 
              <TradeItem
                key= {idx}
                nftid={want.id}
                nftimage={want.image}
                nftname={want.name}
                onSelectNFT={() => nftSelected(want.address, want.id, want.image, want.name, false)}
                showCheckbox = {true}
              />
            ))}
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
                {haveOffer.map((offered, idx) => ( 
                <TradeItem
                  key = {idx}
                  nftid={offered.nftid}
                  nftimage={offered.nftimage}
                  nftname={offered.nftname}
                  showCheckbox = {false}
                />
                ))}
                </div>
            </div>

            <div className="given-nfts-container">
                <h3>YOU WANT:</h3>
                <div className="given-nfts">
                {wantOffer.map((offered, idx) => ( 
                <TradeItem
                  key = {idx}
                  nftid={offered.nftid}
                  nftimage={offered.nftimage}
                  nftname={offered.nftname}
                  showCheckbox = {false}
                />
                ))}
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

        {currentTradeStep <= 2 &&
        <button onClick={nextStep}>NEXT STEP</button>
        }
        {currentTradeStep === 3 &&
        <button onClick={confirmOffer}>CONFIRM OFFER</button>
        }
      </div>
    </div>
  );
}
