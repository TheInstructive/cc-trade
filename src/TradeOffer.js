import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TradeItem from "./components/TradeItem";
import { getNFTs } from "./web3/Inventory";
import { getWalletAddress, createOffer, getMissingApprovals, requestApproval, revokeApproval, getCronosID, isWalletConnected, onWalletChange } from "./web3/WalletConnect";
import { useParams } from "react-router-dom";
import animation from "./images/animation.webp";
import { Link } from 'react-router-dom';
import Collections from "./web3/collections"
import { AlertContext } from "./components/Alert";


export default function TradeOffer() {
  const { walletadrs } = useParams();

  const [tradeStepClass, setradeStepClass] = useState(
    "trade-bar-line trade-step-1"
  );
  const [currentTradeStep, setcurrentTradeStep] = useState(1);
  const [warningClass, setwarningClass] = useState("warning");
  const [walletAddress, setWalletAddress] = useState("");
  const [offerLoading, setOfferLoading] = useState(false);
  const [offerComplated, setOfferComplated] = useState(false);
  const [nftHaveIndex, setNftHaveIndex] = useState([]);
  const [nftWantIndex, setNftWantIndex] = useState([]);
  const [confirmButton, setConfirmButton] = useState(false);
  const [showOfferApproval, setShowOfferApproval] = useState(false);
  const { showAlert } = useContext(AlertContext);


  const [details, setDetails] = useState({});


  const [offerError, setOfferError] = useState("");
  const [offerApproval, setOfferApproval] = useState("");


  const [haveNFTs, setHaveNFTs] = useState([]);
  const [wantNFTs, setWantNFTs] = useState([]);

  const [haveOffer, setHaveOffer] = useState([]);
  const [wantOffer, setWantOffer] = useState([]);

  const pageSize = 10;

  const [currentHavePage, setCurrentHavePage] = useState(1);
  const [currentWantPage, setCurrentWantPage] = useState(1);

  const startHaveIndex = (currentHavePage - 1) * pageSize;
  const startWantIndex = (currentWantPage - 1) * pageSize;

  const endHaveIndex = startHaveIndex + pageSize;
  const endWantIndex = startWantIndex + pageSize;

  const currentHaveItems = haveNFTs.slice(startHaveIndex, endHaveIndex);
  const currentWantItems = wantNFTs.slice(startWantIndex, endWantIndex);

  const totalHavePages = Math.ceil(haveNFTs.length / pageSize);
  const totalWantPages = Math.ceil(wantNFTs.length / pageSize);

  const havePageNumbers = Array.from(
    { length: totalHavePages },
    (_, i) => i + 1
  );
  const wantPageNumbers = Array.from(
    { length: totalWantPages },
    (_, i) => i + 1
  );

  const handlePageClick = (pageNumber) => {
    if (currentTradeStep === 1) {
      setCurrentHavePage(pageNumber);
    }
    if (currentTradeStep === 2) {
      setCurrentWantPage(pageNumber);
    }
  };

  function loadTargetWallet() {
    if (walletadrs.startsWith('0x')) {
      getNFTs(walletadrs).then(want => want && setWantNFTs(want)).catch(console.error);
      getCronosID({ address: walletadrs }).then(details => setDetails(details)).catch(console.error);
    } else {
      getCronosID({ name: walletadrs }).then(details => {
        setDetails(details);
        getNFTs(details.address).then(want => want && setWantNFTs(want)).catch(console.error);
      }).catch(console.error);
    }
  }

  useEffect(() => {
    setWalletAddress(getWalletAddress());

    if (isWalletConnected()) {
      loadTargetWallet();
    }

    onWalletChange(() => {
      loadTargetWallet();
    });
  }, [walletadrs]);

  useEffect(() => {
    getNFTs(walletAddress).then(have => have && setHaveNFTs(have)).catch(console.error);
  }, [walletAddress]);

  function nextStep() {
    if (currentTradeStep === 1) {
      if (haveOffer.length === 0) {
        return showAlert("SELECT AT LEAST ONE NFT TO CONTINUE", "error", 2000);
      }
      setradeStepClass("trade-bar-line trade-step-2");
      setcurrentTradeStep(2);
    }
    if (currentTradeStep === 2) {
      if (wantOffer.length === 0) {
        return showAlert("SELECT AT LEAST ONE NFT TO CONTINUE", "error", 2000);
      }
      setradeStepClass("trade-bar-line trade-step-3");
      setcurrentTradeStep(3);
    } else {
      return;
    }
  }

  function prevStep() {
    if (currentTradeStep === 3) {
      setWantOffer([]);
      setNftWantIndex([])
      setradeStepClass("trade-bar-line trade-step-2");
      setcurrentTradeStep(2);
    }

    if (currentTradeStep === 2) {
      setWantOffer([]);
      setHaveOffer([]);
      setNftHaveIndex([])
      setNftWantIndex([])
      setradeStepClass("trade-bar-line trade-step-1");
      setcurrentTradeStep(1);
    } else {
      return;
    }
  }

  function closeWarning() {
    setwarningClass("displaynone");
  }

  function nftSelected(address, id, image, name, isHave, idx) {
    if (isHave) {
      const isHaveIndexExist = nftHaveIndex.some(
        (obj) => obj === idx
      );

      const isObjectExists = haveOffer.some(
        (obj) => obj.nftid === id && obj.nftadress === address
      );

      const has = {
        nftadress: address,
        nftid: id,
        nftimage: image,
        nftname: name,
      };

      if (!isObjectExists) {
        setHaveOffer([...haveOffer, has]);
      } else {
        const updatedArray = haveOffer.filter(
          (obj) => !(obj.nftid === id && obj.nftadress === address)
        );
        setHaveOffer(updatedArray);

      }

      if (!isHaveIndexExist) {
        setNftHaveIndex([...nftHaveIndex, idx])
      } else {
        const updateIndex = nftHaveIndex.filter(
          (obj) => !(obj === idx)
        )
        setNftHaveIndex(updateIndex)
      }
    } 
    
    else {
      const isWantIndexExist = nftWantIndex.some(
        (obj) => obj === idx
      );

      const isObjectExists = wantOffer.some(
        (obj) => obj.nftid === id && obj.nftadress === address
      );

      const wanted = {
        nftadress: address,
        nftid: id,
        nftimage: image,
        nftname: name,
      };

      if (!isObjectExists) {
        setWantOffer([...wantOffer, wanted]);
      } else {
        const updatedArray = wantOffer.filter(
          (obj) => !(obj.nftid === id && obj.nftadress === address)
        );
        setWantOffer(updatedArray);
      }

      if (!isWantIndexExist) {
        setNftWantIndex([...nftWantIndex, idx])
      } else {
        const updateIndex = nftWantIndex.filter(
          (obj) => !(obj === idx)
        )
        setNftWantIndex(updateIndex)
      }

    }
  }

  function confirmOffer() {
    const finalizeWantArray = wantOffer.map((obj) => {
      return {
        have: false,
        contractAddress: obj.nftadress,
        id: obj.nftid,
      };
    });
  
    const finalizeHaveArray = haveOffer.map((obj) => {
      return {
        have: true,
        contractAddress: obj.nftadress,
        id: obj.nftid,
      };
    });
  
    const tokens = [...finalizeWantArray, ...finalizeHaveArray];
  
    getMissingApprovals({ tokens, have: true }).then(async ({ missing, error: missingError }) => {
      if (missingError) {
        setOfferError(missingError);
        setOfferLoading(false);
        setConfirmButton(false)
        return showAlert(offerError, "error", 2000);
      }
    
      for (let i=0; i<missing.length; i++) {
        setConfirmButton(true)
        setShowOfferApproval(true)
        setOfferApproval(missing[i].name());

        const { error } = await requestApproval(missing[i]);
        if (error) {
          setConfirmButton(false)
          setOfferError(error);
          setOfferLoading(false);
          return showAlert(error, "error", 2000);
        }
      }

      setConfirmButton(true)
      setShowOfferApproval(false)
      setOfferLoading(true);
    
      const { error } = await createOffer(walletadrs, tokens);
      if (error) {
        setConfirmButton(false)
        setOfferError(error);
        setOfferLoading(false);
        return showAlert(error, "error", 2000);
      }

      setOfferLoading(false);
      setOfferComplated(true);
      setradeStepClass("trade-bar-line trade-step-4");   
    });
  }

  function revokeCollection(){
    revokeApproval(Collections[0])
  }

  return (
    <div className="main-container">
      <div className={warningClass}>
        <div>
          <h2>Warning!</h2>
          <p>
          Please be aware of scams and phishing attempts. Always double-check the URL and ensure you are on <b>cronos.club</b>. Do not share your private keys or seed phrases with anyone, and never send funds to unknown addresses. We will never ask for your private information or seed phrases. Stay safe and vigilant while trading on our platform.
          </p>
        </div>
        <button onClick={closeWarning}>X</button>
      </div>
      <button onClick={revokeCollection}>revoke</button>

      <div>
        <h2>Cronos ID: {details.name || '-'}</h2>
        <h3>Address: {details.address}</h3>
      </div>

      {currentTradeStep === 1 && (
        <div>
          <div className="trade-information">
            <h3>
              SELECT <b>YOUR</b> NFT(s)
            </h3>
            <p>
              These are the NFT(s) that will be transferred to the other party when they accept your offer.
            </p>
          </div>
          <div className="trade-area">
            <div className="trade-line"></div>
            <div className="trade-container">
              {currentHaveItems.map((have) => (
                <TradeItem
                  key={have.index}
                  class={nftHaveIndex.some((obj) => obj === have.index) ? 'nft-trade-item selected-nft' : 'nft-trade-item'}
                  nftimage={have.image}
                  nftname={have.name}
                  showCheckbox={true}
                  mintedURL={`https://minted.network/collections/cronos/${have.address}/${have.id}`}
                  onSelectNFT={() =>
                    nftSelected(
                      have.address,
                      have.id,
                      have.image,
                      have.name,
                      true,
                      have.index
                    )
                  }
                />
              ))}
            </div>
          </div>
          <div className="trade-offer-pagination">
            {havePageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                disabled={currentHavePage === pageNumber}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentTradeStep === 2 && (
      <div>
          <div className="trade-information">
            <h3>SELECT <b>THEIR</b> NFT(s)</h3>
            <p>These are the NFT(s) that you will receive when the other party accepts your offer.</p>
          </div>
          <div className="trade-area">
            <div className="trade-line"></div>
            <div className="trade-container">
              {currentWantItems.map((want) => (
                <TradeItem
                  key={want.index}
                  class={nftWantIndex.some((obj) => obj === want.index) ? 'nft-trade-item selected-nft' : 'nft-trade-item'}
                  nftid={want.id}
                  nftimage={want.image}
                  nftname={want.name}
                  mintedURL={`https://minted.network/collections/cronos/${want.address}/${want.id}`}
                  onSelectNFT={() =>
                    nftSelected(
                      want.address,
                      want.id,
                      want.image,
                      want.name,
                      false,
                      want.index
                    )
                  }
                  showCheckbox={true}
                />
              ))}
            </div>
          </div>
          <div className="trade-offer-pagination">
            {wantPageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                disabled={currentWantPage === pageNumber}
              >
                {pageNumber}
              </button>
            ))}
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

          {showOfferApproval &&
          <div className="trade-loading">
            <img width={200} src={animation} />
            Waiting approval for {offerApproval} collection...
          </div>
          }

          {offerLoading &&
          <div className="trade-loading">
            <img width={200} src={animation} />
            Confirming...
          </div>
          }

          {offerComplated &&
          <div className="trade-loading">
            <FontAwesomeIcon color="#325d96" size="4x" icon={faCheckCircle} /> <br/>
            OFFER CREATED!
            <br/><br/>
            <Link to='/trade'>GO TO TRADES PAGE</Link>
          </div>
          }

            <div className="trade-line"></div>
            <div className="trade-offer-container">
              <div className="given-nfts-container">
                <h3>YOU OFFERED:</h3>
                <div className="given-nfts">
                  {haveOffer.map((offered, idx) => (
                    <TradeItem
                      key={idx}
                      class={'nft-trade-item'}
                      nftid={offered.nftid}
                      nftimage={offered.nftimage}
                      nftname={offered.nftname}
                      showCheckbox={false}
                      onSelectNFT={() => ""}
                    />
                  ))}
                </div>
              </div>

              <div className="given-nfts-container">
                <h3>YOU WANT:</h3>
                <div className="given-nfts">
                  {wantOffer.map((offered, idx) => (
                    <TradeItem
                      key={idx}
                      class={'nft-trade-item'}
                      nftid={offered.nftid}
                      nftimage={offered.nftimage}
                      nftname={offered.nftname}
                      showCheckbox={false}
                      onSelectNFT={() => ""}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="trade-steps">
        <button disabled={currentTradeStep === 1 || offerComplated} onClick={prevStep}>
          PREV STEP
        </button>
        

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

        {currentTradeStep <= 2 && <button onClick={nextStep}>NEXT STEP</button>}
        {currentTradeStep === 3 && (
          <button disabled={confirmButton} onClick={confirmOffer}>CONFIRM OFFER</button>
        )}
      </div>
    </div>
  );
}
