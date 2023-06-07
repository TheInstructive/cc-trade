import React, { useContext, useEffect, useState } from "react";
import "./CreateOffer.css";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TradeItem from "./components/TradeItem";
import { getNFTs } from "./web3/Inventory";
import {
  createOffer,
  getMissingApprovals,
  requestApproval,
  revokeApproval,
  getCronosID,
  WalletContext,
} from "./web3/WalletConnect";
import { useParams } from "react-router-dom";
import animation from "./images/animation.webp";
import { Link } from "react-router-dom";
import Alert, { AlertContext } from "./components/Alert";
import cronosidlogo from './images/cronosid.svg';
import paginate from './utils/paginate';
import NeedLogin from "./components/NeedLogin";

const TradeLoading = {
  HIDDEN: 0,
  WAITING: 1,
  APPROVE_TYPE: 2,
  APPROVE_MSG: 3,
  CONFIRM: 4,
  CREATED: 5,

  LOADING: 1000,
  LOADING_OTHER: 1001,
};

export default function CreateOffer() {
  const { walletadrs } = useParams();

  const [tradeStepClass, setradeStepClass] = useState(
    "trade-bar-line trade-step-1"
  );
  const [currentTradeStep, setcurrentTradeStep] = useState(1);
  const [warningClass, setwarningClass] = useState("create-offer-warning");
  const { address: walletAddress, isConnected } = useContext(WalletContext);

  const [tradeLoading, setTradeLoading] = useState(TradeLoading.LOADING);

  const [nftHaveIndex, setNftHaveIndex] = useState([]);
  const [nftWantIndex, setNftWantIndex] = useState([]);
  const [currentApproval, setCurrentApproval] = useState({});
  const { showAlert } = useContext(AlertContext);

  const [details, setDetails] = useState({});

  const [offerError, setOfferError] = useState("");
  const [offerApproval, setOfferApproval] = useState("");

  const [haveNFTs, setHaveNFTs] = useState(null);
  const [wantNFTs, setWantNFTs] = useState(null);

  const [haveOffer, setHaveOffer] = useState([]);
  const [wantOffer, setWantOffer] = useState([]);

  const pageSize = 10;

  const [currentHavePage, setCurrentHavePage] = useState(1);
  const [currentWantPage, setCurrentWantPage] = useState(1);

  const handlePageClick = (pageNumber) => {
    if (currentTradeStep === 2) {
      setCurrentHavePage(pageNumber);
    }
    else if (currentTradeStep === 1) {
      setCurrentWantPage(pageNumber);
    }
  };

  const { page: currentHaveItems, buttons: havePageButtons } = paginate(pageSize, currentHavePage, haveNFTs || [], handlePageClick);
  const { page: currentWantItems, buttons: wantPageButtons } = paginate(pageSize, currentWantPage, wantNFTs || [], handlePageClick);

  useEffect(() => {
    if (walletadrs.startsWith("0x")) {
      getNFTs(walletadrs)
        .then((want) => want && setWantNFTs(want))
        .catch(console.error);
      getCronosID({ address: walletadrs })
        .then((details) => setDetails(details))
        .catch(console.error);
    } else {
      getCronosID({ name: walletadrs })
        .then((details) => {
          setDetails(details);
          getNFTs(details.address)
            .then((want) => want && setWantNFTs(want))
            .catch(console.error);
        })
        .catch(console.error);
    }
  }, [walletadrs]);

  useEffect(() => {
    if (!wantNFTs && !haveNFTs) {
      return;
    }

    if (tradeLoading === TradeLoading.LOADING) {
      setTradeLoading(TradeLoading.LOADING_OTHER);
    }
    else if (tradeLoading === TradeLoading.LOADING_OTHER) {
      setTradeLoading(TradeLoading.HIDDEN);
    }
  }, [wantNFTs, haveNFTs]);

  useEffect(() => {
    if (walletAddress) {
      getNFTs(walletAddress)
        .then((have) => have && setHaveNFTs(have))
        .catch(console.error);
    }
  }, [walletAddress]);

  function nextStep() {
    if (currentTradeStep === 1) {
      setradeStepClass("trade-bar-line trade-step-2");
      setcurrentTradeStep(2);
    }
    if (currentTradeStep === 2) {
      if (wantOffer.length === 0) {
        return showAlert("SELECT AT LEAST ONE NFT YOU WANT TO CONTINUE", "error", 2000);
      }
      if (haveOffer.length === 0) {
        return showAlert("SELECT AT LEAST ONE NFT YOU HAVE TO CONTINUE", "error", 2000);
      }
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

  function nftSelected(address, id, image, name, isHave, idx) {
    if (isHave) {
      const isHaveIndexExist = nftHaveIndex.some((obj) => obj === idx);

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
        setNftHaveIndex([...nftHaveIndex, idx]);
      } else {
        const updateIndex = nftHaveIndex.filter((obj) => !(obj === idx));
        setNftHaveIndex(updateIndex);
      }
    } else {
      const isWantIndexExist = nftWantIndex.some((obj) => obj === idx);

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
        setNftWantIndex([...nftWantIndex, idx]);
      } else {
        const updateIndex = nftWantIndex.filter((obj) => !(obj === idx));
        setNftWantIndex(updateIndex);
      }
    }
  }

  function getTokens() {
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

    return tokens;
  }

  function confirmOffer() {
    const tokens = getTokens();

    setTradeLoading(TradeLoading.WAITING);

    getMissingApprovals({ tokens, have: true }).then(
      async ({ missing, error: missingError }) => {
        if (missingError) {
          setOfferError(missingError);
          setTradeLoading(TradeLoading.HIDDEN);
          return showAlert(offerError, "error", 2000);
        }

        if (missing.length > 0) {
          setCurrentApproval({ missing });
          setTradeLoading(TradeLoading.APPROVE_TYPE);
          return;
        }

        setCurrentApproval({ missing, autoApprove: true });
      }
    );
  }

  useEffect(() => {
    const { autoApprove } = currentApproval;
  
    if (autoApprove) {
      approveAndConfirm().catch(console.error);
    }
  }, [currentApproval]);

  async function approveAndConfirm(requestForAll) {
    const alreadyApproved = {};
    const { missing } = currentApproval;
    const tokens = getTokens();

    for (let i = 0; i < missing.length; i++) {
      if (requestForAll) {
        if (alreadyApproved[missing[i].contractAddress]) {
          continue;
        }

        setTradeLoading(TradeLoading.APPROVE_MSG);
        setOfferApproval(missing[i].collection.name());
      } else {
        setTradeLoading(TradeLoading.APPROVE_MSG);
        setOfferApproval(missing[i].name());
      }

      const { error } = await requestApproval(missing[i], requestForAll);
      if (error) {
        setOfferError(error);
        setTradeLoading(TradeLoading.HIDDEN);
        return showAlert(error, "error", 2000);
      }

      if (requestForAll) {
        alreadyApproved[missing[i].contractAddress] = true;
      }
    }

    setTradeLoading(TradeLoading.CONFIRM);

    const { error } = await createOffer(details.address, tokens);
    if (error) {
      setOfferError(error);
      setTradeLoading(TradeLoading.HIDDEN);
      return showAlert(error, "error", 2000);
    }

    setTradeLoading(TradeLoading.CREATED);
    setradeStepClass("trade-bar-line trade-step-4");
  }

  if (!isConnected) {
    return <NeedLogin />
  }

  return (
    <div style={{ position: "relative" }}>
      <Alert />
      <div className={warningClass}>
        <p>
          <b>WARNING:</b> Please be aware of scams and phishing attempts. Always
          double-check the URL and ensure you are oncronos.club. Do not share
          your private keys or seed phrases with anyone, and never send funds to
          unknown addresses. We will never ask for your private information or
          seed phrases. Stay safe and vigilant while trading on our platform.
        </p>
        <button onClick={closeWarning}>X</button>
      </div>

      <div className="create-offer-header">
        <div className="create-offer-header-left">
          {/* STEPS */}
          <div style={{ width: "90%" }}>
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
              <div className="trade-step">SELECT THEIR NFT</div>
              <div className="trade-step">SELECT YOUR NFT</div>
              <div className="trade-step">CREATE OFFER</div>
            </div>
          </div>
        </div>

        <div className="create-offer-header-center"></div>

        <div className="create-offer-header-right">
          {currentTradeStep === 1 && (
            <p>
            These are the NFT(s) that you will receive when the other party
            accepts your offer.
            </p>
          )}
          {currentTradeStep === 2 && (
          <p>
          These are the NFT(s) that will be transferred to the other party
          when they accept your offer.
          </p>
          )}
          {currentTradeStep === 3 && <p>Please check and confirm the offer.</p>}
        </div>
      </div>

<div className="trader-info-wrapper">
  <div><h4>TRADER INFO</h4></div>
      <div className="trader-infos">
        {details.name &&
        <div className="cronos-id-section"><img src={cronosidlogo}></img><h2>{details.name || ' - '}</h2></div>
        }
        <p>{details.address}</p>
      </div>
</div>

      <div className="create-offer-buttons">
        <button
          disabled={currentTradeStep === 1 || tradeLoading === TradeLoading.CREATED}
          onClick={prevStep}
        >
          PREV STEP
        </button>
        {currentTradeStep <= 2 && <button onClick={nextStep}>NEXT STEP</button>}

        {currentTradeStep === 3 && (
          <button disabled={tradeLoading !== TradeLoading.HIDDEN} onClick={confirmOffer}>
            CONFIRM OFFER
          </button>
        )}
      </div>

      <div className="create-offer-container">

      {tradeLoading >= TradeLoading.LOADING && (
        <div className="trade-loading" style={{width:"100%",height:"100px",position:"initial"}}>
          Loading...
        </div>
      )}

      {currentTradeStep === 1 && (
          <>
            <>
              {currentWantItems.map((want) => (
                <TradeItem
                  key={want.index}
                  class={
                    nftWantIndex.some((obj) => obj === want.index)
                      ? "nft-trade-item selected-nft"
                      : "nft-trade-item"
                  }
                  nftid={want.id}
                  nftimage={want.image}
                  nftname={want.name}
                  mintedURL={`https://minted.network/collections/cronos/${want.address}/${want.id}`}
                  nftscanURL = {`https://cronos.nftscan.com/${want.address}/${want.id}`}
                  ebisuURL = {`https://app.ebisusbay.com/collection/${want.address}/${want.id}`}
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

              {!currentWantItems.length && tradeLoading < TradeLoading.LOADING && <div className="no-tradeable">
                <h3>There is no tradeable NFT found.</h3>
              </div>}
            </>

            <div className="trade-offer-pagination">
              {wantPageButtons}
            </div>
          </>
        )}

        {currentTradeStep === 2 && (
          <>
            <>
              {currentHaveItems.map((have) => (
                <TradeItem
                  key={have.index}
                  class={
                    nftHaveIndex.some((obj) => obj === have.index)
                      ? "nft-trade-item selected-nft"
                      : "nft-trade-item"
                  }
                  nftimage={have.image}
                  nftname={have.name}
                  showCheckbox={true}
                  mintedURL={`https://minted.network/collections/cronos/${have.address}/${have.id}`}
                  nftscanURL = {`https://cronos.nftscan.com/${have.address}/${have.id}`}
                  ebisuURL = {`https://app.ebisusbay.com/collection/${have.address}/${have.id}`}
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

              {!currentHaveItems.length && tradeLoading < TradeLoading.LOADING && <div>
                <h3>There is no tradeable NFT found.</h3>
              </div>}
            </>
            <div className="trade-offer-pagination">
              {havePageButtons}
            </div>
          </>
        )}

        {currentTradeStep === 3 && (
          <div style={{ width:'100%'}}>
            {tradeLoading === TradeLoading.APPROVE_TYPE && (
              <div className="trade-loading">
                <img width={150} src={animation} />
                <div className="chose-a-method">
                <p>CHOOSE A TRANSFER APPROVAL METHOD</p>
                </div>
                <div className="approval-method-details">
                  <div className="approval-detail">
                    <p>
                    <h3>APPROVE FOR EACH NFT</h3>
                    This button allows you to approve the transfer of each NFT individually.
                    You will need to give approval for each specific NFT before it can be transferred to another address.
                    Under the ERC721 standard, if you grant approval to another address or smart contract (e.g. marketplaces) for this token, your previous approval will be revoked.
                    </p>
                    <button onClick={() => approveAndConfirm(false)}>APPROVE FOR EACH NFT</button>

                  </div>
                  <div className="approval-detail">
                    <p>
                    <h3>APPROVE WHOLE COLLECTION</h3>
                    This button grants approval for the entire collection of NFTs.
                    Once approved, all NFTs within the collection can be transferred to other addresses without the need for individual approvals.
                    You won't be asked to approve these collections each time you create or accept an offer unless you revoke the approval.
                    </p>
                    <button onClick={() => approveAndConfirm(true)}>APPROVE WHOLE COLLECTION</button>

                  </div>
                </div>
              </div>
            )}

            {tradeLoading === TradeLoading.APPROVE_MSG && (
              <div className="trade-loading">
                <img width={200} src={animation} />
                Waiting approval for {offerApproval} collection...
              </div>
            )}

            {tradeLoading === TradeLoading.CONFIRM && (
              <div className="trade-loading">
                <img width={200} src={animation} />
                Confirming...
              </div>
            )}

            {tradeLoading === TradeLoading.CREATED && (
              <div className="trade-loading">
                <FontAwesomeIcon
                  color="#325d96"
                  size="4x"
                  icon={faCheckCircle}
                />{" "}
                <br />
                OFFER CREATED!
                <br />
                <br />
                <Link to="/trade">GO TO TRADES PAGE</Link>
              </div>
            )}

            <div className="trade-offer-container">
              <div className="given-nfts-container">
                <div className="trade-confirm-text">
                  <h3>YOU WANT</h3>
                </div>

                <div className="given-nfts">
                  {haveOffer.map((offered, idx) => (
                    <TradeItem
                      key={idx}
                      class={"nft-trade-item"}
                      nftid={offered.nftid}
                      nftimage={offered.nftimage}
                      nftname={offered.nftname}
                      showCheckbox={false}
                      onSelectNFT={() => ""}
                      mintedURL={`https://minted.network/collections/cronos/${offered.nftadress}/${offered.nftid}`}
                      nftscanURL = {`https://cronos.nftscan.com/${offered.nftadress}/${offered.nftid}`}
                      ebisuURL = {`https://app.ebisusbay.com/collection/${offered.nftadress}/${offered.nftid}`}
                    />
                  ))}
                </div>
              </div>

              <div className="given-nfts-container">
                <div className="trade-confirm-text">
                  <h3>YOU OFFERED</h3>
                </div>

                <div className="given-nfts">
                  {wantOffer.map((offered, idx) => (
                    <TradeItem
                      key={idx}
                      class={"nft-trade-item"}
                      nftid={offered.nftid}
                      nftimage={offered.nftimage}
                      nftname={offered.nftname}
                      showCheckbox={false}
                      onSelectNFT={() => ""}
                      mintedURL={`https://minted.network/collections/cronos/${offered.nftadress}/${offered.nftid}`}
                      nftscanURL = {`https://cronos.nftscan.com/${offered.nftadress}/${offered.nftid}`}
                      ebisuURL = {`https://app.ebisusbay.com/collection/${offered.nftadress}/${offered.nftid}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
