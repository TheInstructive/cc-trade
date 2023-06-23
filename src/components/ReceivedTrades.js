import React, { useState, useEffect, useContext } from "react";
import { AlertContext } from "./Alert";
import {
  getActiveOffers,
  getCronosID,
  WalletContext,
} from "../web3/WalletConnect";
import paginate from "../utils/paginate";
import ReceivedTradesItem from './ReceivedTradesItem'

const pageSize = 5;

export default function ReceivedTrades() {
  const [activeTrades, setActiveTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const { showAlert } = useContext(AlertContext);
  const { address, isConnected, network } = useContext(WalletContext);

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);
    setLoading(false);
  };
  const { page: pageTrades, buttons } = paginate(
    pageSize,
    currentPage,
    activeTrades,
    handlePageClick
  );

  async function fetchTradeDetails(trades) {
    try {
      for (let i = 0; i < trades.length; i++) {
        const details = await getCronosID({
          address: trades[i].address,
        });
        trades[i] = {
          ...details,
          ...trades[i],
        };
      }
    } catch (err) {
      console.error("Error while updating trade details", err);
    }

    return trades;
  }

  async function fetchData() {
    setLoading(true);

    const result = await getActiveOffers();
    if (result.offers) {
      const trades = result.offers.filter((trade) => trade.received).reverse();
      setActiveTrades(trades);
      setLoading(false);

      setActiveTrades(await fetchTradeDetails(trades));
    } else {
      showAlert(result.error, "error", 2000);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (address && isConnected) {
      fetchData();
    }
  }, [address, isConnected, network]);


  return (
    <div style={{ position: "relative", minHeight:'100vh' }}>
      {pageTrades.map((offer, index) => ( 

      <ReceivedTradesItem key={index} offer = {offer} />

      ))}


      <div className="trades-message-text">
        {loading && <h2>Loading...</h2>}

        {!loading && pageTrades.length < 1 && <h2>You have no offers.</h2>}
      </div>

      <div className="trade-offer-pagination">{buttons}</div>
    </div>
  );
}
