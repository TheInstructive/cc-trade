import React, { useState, useEffect, useContext } from "react";
import { AlertContext } from "./Alert";
import {
  acceptOffer,
  cancelOffer,
  getMissingApprovals,
  requestApproval,
} from "../web3/WalletConnect";
import paginate from "../utils/paginate";
import TradeItem from "./TradeItem";
import animation from "../images/animation.webp";

export default function ReceivedTradesItem(props) {
  const [tradeTerms, setTradeTerms] = useState(false);
  const [askApprovalType, setAskApprovalType] = useState(false);
  const [currentApproval, setCurrentApproval] = useState({});

  const { showAlert } = useContext(AlertContext);


  function acceptTerms() {
    setTradeTerms(!tradeTerms);
  }


  function acceptTradeOffer(id, index) {
    showAlert("Checking for missing approvals...", "info");

    getMissingApprovals({ id, have: false }).then(
      async ({ missing, error: missingError }) => {
        if (missingError) {
          return showAlert(missingError, "error", 2000);
        }

        if (missing.length > 0) {
          showAlert("Waiting for user to choose an approval type...", "info");
          setCurrentApproval({ id, index, missing });
          setAskApprovalType(true);
          return;
        }

        setCurrentApproval({ id, index, missing, autoApprove: true });
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
    const { id, index, missing } = currentApproval;

    setAskApprovalType(false);

    if (id == null || index == null || missing == null) {
      return;
    }

    for (let i = 0; i < missing.length; i++) {
      if (requestForAll) {
        if (alreadyApproved[missing[i].contractAddress]) {
          continue;
        }

        showAlert(
          "Requesting approval for " + missing[i].collection.name(),
          "info"
        );
      } else {
        showAlert("Requesting approval for " + missing[i].name(), "info");
      }

      const { error } = await requestApproval(missing[i], requestForAll);
      if (error) {
        return showAlert(error, "error", 2000);
      }

      if (requestForAll) {
        alreadyApproved[missing[i].contractAddress] = true;
      }
    }

    showAlert("Confirming transaction with your wallet...", "info");

    const { error } = await acceptOffer(id, index);
    if (error) {
      return showAlert(error, "error", 2000);
    }

    showAlert("Offer accepted.", null, 2000);
  }

  async function cancelTradeOffer(id, index) {
    const { error } = await cancelOffer(id, index);
    if (error) {
      return showAlert(error, "error", 2000);
    }

    showAlert("Offer cancelled.", null, 2000);
  }

  const offer = props.setOffer

  return (
        <div className="trade-offer-wrapper">
          {askApprovalType && (
            <div className="trade-loading">
              <img width={150} src={animation} />
              <div className="chose-a-method">
                <p>CHOOSE A TRANSFER APPROVAL METHOD</p>
              </div>
              <div className="approval-method-details">
                <div className="approval-detail">
                  <p>
                    <h3>APPROVE FOR EACH NFT</h3>
                    This button allows you to approve the transfer of each NFT
                    individually. You will need to give approval for each
                    specific NFT before it can be transferred to another
                    address. Under the ERC721 standard, if you grant approval to
                    another address or smart contract (e.g. marketplaces) for
                    this token, your previous approval will be revoked.
                  </p>
                  <button onClick={() => approveAndConfirm(false)}>
                    APPROVE FOR EACH NFT
                  </button>
                </div>
                <div className="approval-detail">
                  <p>
                    <h3>APPROVE WHOLE COLLECTION</h3>
                    This button grants approval for the entire collection of
                    NFTs. Once approved, all NFTs within the collection can be
                    transferred to other addresses without the need for
                    individual approvals. You won't be asked to approve these
                    collections each time you create or accept an offer unless
                    you revoke the approval.
                  </p>
                  <button onClick={() => approveAndConfirm(true)}>
                    APPROVE WHOLE COLLECTION
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="trade-offer-header">
            <h3>
              <b>{offer.name || offer.address}</b> <br /> OFFERED YOU
            </h3>
            <div className="trade-status-active">ACTIVE</div>
          </div>

          <div className="trade-offer-container">
            <div className="given-nfts-container">
              <div className="given-nfts-title">
                <h3>YOUR NFT(S)</h3>
              </div>

              <div className="given-nfts">
                {offer.want.map((nft, i) => (
                  <TradeItem
                    key={i}
                    class={"nft-trade-item"}
                    nftimage={nft.image}
                    nftname={nft.name}
                    showCheckbox={false}
                    onSelectNFT={() => ""}
                    mintedURL={`https://minted.network/collections/cronos/${nft.address}/${nft.id}`}
                  />
                ))}
              </div>
            </div>

            <div className="given-nfts-container">
              <div className="given-nfts-title">
                <h3>THEIR NFT(S)</h3>
              </div>

              <div className="given-nfts">
                {offer.have.map((nft, i) => (
                  <TradeItem
                    key={i}
                    class={"nft-trade-item"}
                    nftimage={nft.image}
                    nftname={nft.name}
                    showCheckbox={false}
                    onSelectNFT={() => ""}
                    mintedURL={`https://minted.network/collections/cronos/${nft.address}/${nft.id}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="trade-offer-buttons">
            <div className="terms">
              <input
                id={`accepterms-${offer.id}`}
                checked={tradeTerms}
                onChange={() => acceptTerms()}
                required={true}
                type="checkbox"
              ></input>
              <label htmlFor={`accepterms-${offer.id}`}>
                I agreed to transfer ownership of the specified NFT(s) to the
                user making the offer.
              </label>
            </div>

            <div>
              <button
                onClick={() => acceptTradeOffer(offer.id, offer.index)}
                disabled={!tradeTerms}
                id="accept-button"
              >
                ACCEPT
              </button>
              <button
                onClick={() => cancelTradeOffer(offer.id, offer.index)}
                id="decline-button"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
  );
}
