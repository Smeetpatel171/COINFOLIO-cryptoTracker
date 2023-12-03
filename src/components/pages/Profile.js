import React from "react";
import { useEffect } from "react";
import close from "../../Assets/close.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrencyContext } from "../../context";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import deleteicon from "../../Assets/delete.svg";
export default function Profile() {
  //portfolio logic starts ==================================

  const { currency, setUser, user, watchlist, symbol, coinsrow, portfolio } =
    useCurrencyContext();
  const [showModal, setShowModal] = useState(false);
  const [coinInfo, setCoinInfo] = useState({
    coinName: "",
    noOfCoins: "",
    buyingPrice: "",
    buyingValue: "",
  });
  const [showtable, setShowTable] = useState(true);
  const handleCoinNameChanged = (e) => {
    setShowTable(true);
    setCoinInfo({
      ...coinInfo,
      coinName: e.target.value,
    });
  };
  const handleselectedcoin = (id) => {
    setShowTable(false);
    setCoinInfo({
      ...coinInfo,
      coinName: id,
    });
  };

  //search algorithm for portfolio coin search
  const handleSearch = () => {
    return coinsrow.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(coinInfo.coinName) ||
        coin.symbol.toLowerCase().includes(coinInfo.coinName)
      );
    });
  };

  useEffect(() => {
    handleSearch();
  }, [currency]);
  //=====================================================
  const handleclosebtn = () => {
    setShowModal(false);
  };
  const handleAddToPortfolio = () => {
    setShowModal(true);
  };

  //validation for the portfolio form:
  const [formerror, setFormError] = useState({});
  const validation = () => {
    let err = {};
    // we will validate each input field over here step by step
    //validation code
    if (coinInfo.coinName === "") {
      err.coinName = "Name Required !";
    }
    if (coinInfo.noOfCoins === "") {
      err.noOfCoins = "No of coins Required !";
    }
    if (coinInfo.buyingPrice === "") {
      err.buyingPrice = "Buying Price Required !";
    }
    if (coinInfo.buyingPrice === "" || coinInfo.noOfCoins === "") {
      err.buyingValue = "Previous Both Fields Required !";
    }

    setFormError({ ...err });
    return Object.keys(err).length < 1;
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const isvalid = validation();
    // Perform validation on coinInfo here
    // Update Firestore document with portfolio data
    if (isvalid) {
      const docRef = doc(db, "watchlist", user.uid);
      const buyingValue = coinInfo.buyingPrice * coinInfo.noOfCoins;
      const updatedCoinInfo = { ...coinInfo, buyingValue };
      await updateDoc(docRef, {
        portfolioCoins: arrayUnion(updatedCoinInfo),
      });
      alert(
        `The Coin ${coinInfo.coinName} is successfully added to Portfolio.`
      );
      setShowModal(false);
      setCoinInfo({
        coinName: null,
        noOfCoins: "",
        buyingPrice: "",
        buyingValue: "",
      });
    }
  };

  //portfolio logic ends=====================================
  const [activeCategory, setActiveCategory] = useState("WatchList");
  const changeCategory = (category) => {
    setActiveCategory(category);
  };

  //logout functionality

  const handleLogOut = () => {
    signOut(auth);
    setUser(null);
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  //delete button functionality
  const deletefromwatchlist = async (id) => {
    const docRef = doc(db, "watchlist", user.uid);
    await updateDoc(docRef, {
      coins: arrayRemove(id),
    })
      .then(() => {
        alert(`The coin "${id}" has been removed from the watchlist.`);
      })
      .catch((error) => {
        alert("Error removing coin: ", error);
      });
  };
  const deleteFromPortfolio = async (coinName) => {
    const docRef = doc(db, "watchlist", user.uid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const portfolioData = docSnapshot.data();
      const updatedPortfolio = portfolioData.portfolioCoins.filter(
        (coin) => coin.coinName !== coinName
      );

      await updateDoc(docRef, {
        portfolioCoins: updatedPortfolio,
      })
        .then(() => {
          alert(`The coin "${coinName}" has been removed from the portfolio.`);
        })
        .catch((error) => {
          alert("Error removing coin from portfolio: ", error);
        });
    }
  };
  //total portfolio value functionality
  // Calculate the total portfolio value and total buying value
  let totalCurrentValue = 0;
  let totalBuyingValue = 0;

  if (portfolio && coinsrow) {
    portfolio.forEach((portfolioCoin) => {
      // Find the corresponding coin information from coinsrow
      const coinInfo = coinsrow.find(
        (coin) => coin.id === portfolioCoin.coinName
      );

      if (coinInfo) {
        const currentPrice = coinInfo.current_price;
        const currentCoinValue = portfolioCoin.noOfCoins * currentPrice;
        totalCurrentValue += currentCoinValue;
        totalBuyingValue += portfolioCoin.buyingValue;
      }
    });
  }

  // Calculate the percentage change
  const percentageChange =
    ((totalCurrentValue - totalBuyingValue) / totalBuyingValue) * 100;

  // Now you can display totalCurrentValue and percentageChange in your component

  return (
    <div className="profile-page">
      <div className="container-fluid">
        <div className="heading">
          <h2>
            Hello! {user ? user.displayName || user.email : ""} welcome to
            Coinfolio.
          </h2>
        </div>
        <ul className="menu-tabs">
          <li
            className={activeCategory === "WatchList" ? "activetab" : ""}
            onClick={() => changeCategory("WatchList")}
          >
            WatchList
          </li>
          <li
            className={activeCategory === "PortFolio" ? "activetab" : ""}
            onClick={() => changeCategory("PortFolio")}
          >
            PortFolio
          </li>
        </ul>
        <div>
          {activeCategory === "WatchList" ? (
            !(watchlist.length === 0) ? (
              <div className="container">
                <table className="table table-hover tablecoins">
                  <thead>
                    <tr>
                      <th scope="col">Coin</th>
                      <th scope="col">Price</th>
                      <th scope="col" className="responsive-none">
                        24h Change
                      </th>
                      <th scope="col" className="responsive-none">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {coinsrow ? (
                      coinsrow.map((row) => {
                        if (watchlist.includes(row.id)) {
                          return (
                            <tr key={row.id}>
                              <td>
                                <Link to={`/coins/${row.id}`}>
                                  <div className="coinbox">
                                    <div className="coinimg">
                                      <img src={row.image} alt={row.name} />
                                    </div>
                                    <div className="cointitle">
                                      <h4>{row.symbol}</h4>
                                      <div>{row.name}</div>
                                    </div>
                                  </div>
                                </Link>
                              </td>
                              <td>
                                <div>
                                  {symbol}
                                  {numberWithCommas(
                                    row.current_price.toFixed(2)
                                  )}
                                </div>
                              </td>
                              <td
                                className="responsive-none"
                                style={{
                                  color:
                                    row.market_cap_change_percentage_24h > 0
                                      ? "rgb(14, 203, 129)"
                                      : "red",
                                  fontWeight: 500,
                                }}
                              >
                                <div>
                                  {row.market_cap_change_percentage_24h} %
                                </div>
                              </td>
                              <td className="responsive-none">
                                <div
                                  onClick={() => deletefromwatchlist(row.id)}
                                >
                                  <img src={deleteicon} alt="" />
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      })
                    ) : (
                      <div className="tablecoinserr">
                        Error Fetching Data of Watchlist, try again after some
                        time.
                      </div>
                    )}
                  </tbody>
                </table>

                <div className="watchbtn">
                  <Link to="/" className="singlecoinbtn">
                    Add Coins to WatchList
                  </Link>
                  <div>
                    You Can Explore the Cryptocurrencies By click on them and
                    Add to your Watchlist on Cryptocurrencies Page.
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="tablecoinserr">
                  No Cryptocurrencies Has Been Selected For The WatchList Yet.
                </div>
                <div className="watchbtn">
                  <Link to="/" className="singlecoinbtn">
                    Add Coins to WatchList
                  </Link>
                  <div>
                    You Can Explore the Cryptocurrencies By click on them and
                    Add to your Watchlist on Cryptocurrencies Page.
                  </div>
                </div>
              </>
            )
          ) : (
            <>
              {portfolio && !(portfolio.length === 0) ? (
                <div className="container-fluid">
                  <div className="totalportfolio">
                    <h1>
                     <span>Total Value:</span>  ₹ {totalCurrentValue}
                      <span
                        style={{
                          color:
                            percentageChange > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {` (${parseFloat(percentageChange.toFixed(4))}%)`}
                      </span>
                    </h1>
                  </div>
                  <table className="table table-hover tablecoins">
                    <thead>
                      <tr>
                        <th scope="col">Coin</th>
                        <th scope="col">Price</th>
                        <th scope="col">No of Coins</th>
                        <th scope="col">Buying Price</th>
                        <th scope="col">Buying Value</th>
                        <th scope="col">Current Value</th>
                        <th scope="col">P/L(%)</th>
                        <th scope="col">P/L(₹)</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coinsrow ? (
                        portfolio.map((portfolioCoin) => {
                          const matchingCoin = coinsrow.find(
                            (coin) => coin.id === portfolioCoin.coinName
                          );
                          if (matchingCoin) {
                            const currentPrice = matchingCoin.current_price;
                            const noOfCoins = portfolioCoin.noOfCoins;
                            const buyingPrice = portfolioCoin.buyingPrice;
                            const buyingValue = portfolioCoin.buyingValue;
                            const currentTotalValue = currentPrice * noOfCoins;
                            const profitLoss = currentTotalValue - buyingValue;
                            const profitLossPer =
                              [(currentTotalValue / buyingValue) * 100] - 100;
                            return (
                              <tr key={matchingCoin.id}>
                                <td>
                                  <Link to={`/coins/${matchingCoin.id}`}>
                                    <div className="coinbox">
                                      <div className="coinimg">
                                        <img
                                          src={matchingCoin.image}
                                          alt={matchingCoin.name}
                                        />
                                      </div>
                                      <div className="cointitle">
                                        <h4>{matchingCoin.symbol}</h4>
                                        <div>{matchingCoin.name}</div>
                                      </div>
                                    </div>
                                  </Link>
                                </td>
                                <td>
                                  <div>
                                    {symbol}
                                    {numberWithCommas(currentPrice.toFixed(2))}
                                  </div>
                                </td>
                                <td>{noOfCoins}</td>
                                <td>₹ {buyingPrice}</td>
                                <td>₹ {buyingValue}</td>
                                <td>
                                  {symbol}
                                  {numberWithCommas(
                                    currentTotalValue.toFixed(2)
                                  )}
                                </td>
                                <td
                                  className="responsive-none"
                                  style={{
                                    color:
                                      profitLoss > 0
                                        ? "rgb(14, 203, 129)"
                                        : "red",
                                    fontWeight: 500,
                                  }}
                                >
                                  <div>
                                    {parseFloat(profitLossPer.toFixed(3))} %
                                  </div>
                                </td>
                                <td
                                  className="responsive-none"
                                  style={{
                                    color:
                                      profitLoss > 0
                                        ? "rgb(14, 203, 129)"
                                        : "red",
                                    fontWeight: 500,
                                  }}
                                >
                                  <div>
                                    {numberWithCommas(profitLoss.toFixed(2))}
                                  </div>
                                </td>
                                <td className="responsive-none">
                                  <div
                                    onClick={() =>
                                      deleteFromPortfolio(matchingCoin.id)
                                    }
                                  >
                                    <img src={deleteicon} alt="" />
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        })
                      ) : (
                        <div className="tablecoinserr">
                          Error Fetching Data of Portfolio, try again after some
                          time.
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="tablecoinserr">
                  You have not Set-Up Your Portfolio Yet.
                </div>
              )}

              {/* the table of Portfolio Coins Here. */}

              <div className="watchbtn">
                <button
                  className="singlecoinbtn"
                  onClick={handleAddToPortfolio}
                >
                  Add Coins to Portfolio
                </button>
              </div>
              {showModal ? (
                <>
                  <div className="model-overlay">
                    <form onSubmit={handleFormSubmit} className="modelform">
                      <div className="close-button" onClick={handleclosebtn}>
                        <img src={close} alt="" />
                      </div>
                      <div className="heading">
                        <h2>Add Coin to Portfolio</h2>
                      </div>
                      <div className="form-group firstrowmodel">
                        <input
                          placeholder="Search Coin Name Here.."
                          type="text"
                          value={coinInfo.coinName}
                          onChange={(e) => handleCoinNameChanged(e)}
                        />
                        <span className="formhandle">{formerror.coinName}</span>
                        {!(handleSearch().length === 0) &&
                        coinInfo.coinName &&
                        showtable ? (
                          <>
                            <table className="table tablecoins portfolio-search">
                              <thead>
                                <tr>
                                  <th scope="col">Coin</th>
                                  <th scope="col">Price</th>
                                  <th scope="col" className="responsive-none">
                                    24h Change
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {handleSearch().map((row) => (
                                  <tr
                                    key={row.id}
                                    onClick={() => handleselectedcoin(row.id)}
                                  >
                                    <td>
                                      <div className="coinbox">
                                        <div className="coinimg">
                                          <img src={row.image} alt={row.name} />
                                        </div>
                                        <div className="cointitle">
                                          <h4>{row.symbol}</h4>
                                          <div>{row.name}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div>
                                        {symbol}
                                        {numberWithCommas(
                                          row.current_price.toFixed(2)
                                        )}
                                      </div>
                                    </td>
                                    <td
                                      className="responsive-none"
                                      style={{
                                        color:
                                          row.market_cap_change_percentage_24h >
                                          0
                                            ? "rgb(14, 203, 129)"
                                            : "red",
                                        fontWeight: 500,
                                      }}
                                    >
                                      <div>
                                        {row.market_cap_change_percentage_24h} %
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </>
                        ) : handleSearch().length === 0 &&
                          coinInfo.coinName &&
                          showtable ? (
                          <div className="tablecoinserr">
                            Oops! No Result...
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="modelfromrow">
                        <div className="form-group">
                          <span className="formhandle">
                            {formerror.noOfCoins}
                          </span>
                          <input
                            placeholder="Number of Coins"
                            type="number"
                            value={coinInfo.noOfCoins}
                            onChange={(e) =>
                              setCoinInfo({
                                ...coinInfo,
                                noOfCoins: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="form-group">
                          <span className="formhandle">
                            {formerror.buyingPrice}
                          </span>
                          <input
                            placeholder="Buying Price(₹)"
                            type="number"
                            value={coinInfo.buyingPrice}
                            onChange={(e) =>
                              setCoinInfo({
                                ...coinInfo,
                                buyingPrice: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="form-group">
                          <span className="formhandle">
                            {formerror.buyingValue}
                          </span>
                          <input
                            placeholder="Buying Value"
                            type="number"
                            value={coinInfo.buyingPrice * coinInfo.noOfCoins}
                            onChange={(e) =>
                              setCoinInfo({
                                ...coinInfo,
                                buyingValue: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <button type="submit" className="singlecoinbtn">
                        Add to Portfolio
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          )}
        </div>
        <div className="watchbtn">
          <Link to="/" className="singlecoinbtn" onClick={handleLogOut}>
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
}
