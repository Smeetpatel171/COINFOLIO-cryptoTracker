import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HistoricalChart } from "../ApiConfig";
import { useCurrencyContext } from "../../context";
import { Line } from "react-chartjs-2";
import {
  LineElement,
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { auth, db } from "../Firebase";
import { addDoc, doc, setDoc } from "firebase/firestore";

const CoinPage = () => {
  //==============================single coin logic starts====================================
  const { id } = useParams();

  const [coinErr, setCoinErr] = useState("");
  const [loading, setLoading] = useState(true);
  const { currency, symbol, watchlist, user, coin, setCoin } =
    useCurrencyContext();

  useEffect(() => {
    // Define the API URL
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${id}`;

    // Use Axios to fetch data
    axios
      .get(apiUrl)
      .then((response) => {
        setCoin(response.data);
        setLoading(false);
        console.log(coin); // Update the component state with the fetched data
      })
      .catch((error) => {
        setCoinErr(`${error.message} on fetching  ${id} coin.`);
        setLoading(false);
        console.log(error.message);
      });
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  //==========================single coin logic ends=======================================
  //logic for the  Chart Starts=====================================
  ChartJS.register(
    LineElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement
  );
  const [historicaldata, setHistoricaldata] = useState("");
  const [chartErr, setChartErr] = useState("");
  const [days, setdays] = useState(1);

  useEffect(() => {
    // Define the API URL
    const charturl = HistoricalChart(id, days, currency);

    // Use Axios to fetch data
    axios
      .get(charturl)
      .then((response) => {
        setHistoricaldata(response.data.prices);

        console.log(historicaldata); // Update the component state with the fetched data
      })
      .catch((error) => {
        setChartErr(`${error.message} on fetching  ${id} Chart.`);

        console.log(error.message);
      });
  }, [currency, days]);
  const chartbtnclass = "singlecoinbtn";
  const handlechartbtnclick = (event) => {
    const btnvalue = Number(event.target.value);
    setdays(btnvalue);
  };
  const pointBackgroundColorString = String("#1DA1F2");
  //logic for chart ends======================================

  const inWatchList = watchlist.includes(coin.id);
  const handlewatchlist = async () => {
    const coinref = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinref, {
        coins: watchlist ? [...watchlist, coin.id] : [coin.id],
      });
    } catch (err) {
      alert(err.message);
    }
  };
  const removeFromWatchlist = async () => {
    const coinref = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinref,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: "true" }
      );
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="singlecoinpage">
      {loading ? (
        <div>Loading</div>
      ) : coin ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <div className="singlecoin-info">
                <div className="singecoinimg">
                  <img src={coin.image.large} alt="" />
                </div>
                <div className="cointitle">
                  <h1>{coin.symbol}</h1>
                  <p>{coin.name}</p>
                </div>
                <div>
                  <span>Current Price: </span> {symbol}
                  {numberWithCommas(
                    coin.market_data.current_price.inr.toFixed(2)
                  )}
                </div>
                <div>
                  <span> Market Cap Percentage(24 hr): </span>

                  <div
                    style={{
                      color:
                        coin.market_data.market_cap_change_percentage_24h > 0
                          ? "rgb(14, 203, 129)"
                          : "red",
                      fontWeight: 500,
                    }}
                  >
                    {coin.market_data.market_cap_change_percentage_24h}
                  </div>
                </div>
                <div>
                  <span> Market Capitalization(BTC): </span>
                  {coin.market_data.market_cap.btc}
                </div>
                <div>
                  <span>Total Volume(BTC):</span>
                  {coin.market_data.total_volume.btc}
                </div>
                <div>
                  <span>Market cap Change of 24 hr(BTC) : </span>

                  <div
                    style={{
                      color:
                        coin.market_data.market_cap_change_24h > 0
                          ? "rgb(14, 203, 129)"
                          : "red",
                      fontWeight: 500,
                    }}
                  >
                    {coin.market_data.market_cap_change_24h}
                  </div>
                </div>
                {user && (
                  <div className="watchbtn">
                    <button
                      className="singlecoinbtn"
                      onClick={
                        inWatchList ? removeFromWatchlist : handlewatchlist
                      }
                      style={{ backgroundColor: inWatchList ? "#ff0000" : "" }}
                    >
                      {inWatchList
                        ? "Remove From WatchList"
                        : "Add to WatchList"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-8">
              <div className="singlecoin-graph">
                {/* we are going to use react chart js-2 library for this */}
                {historicaldata && Array.isArray(historicaldata) ? (
                  <>
                    <Line
                      datasetIdKey="id"
                      data={{
                        labels: historicaldata.map((coin) => {
                          let date = new Date(coin[0]);
                          let time =
                            date.getHours() > 12
                              ? `${
                                  date.getHours() - 12
                                }:${date.getMinutes()} PM`
                              : `${date.getHours()}:${date.getMinutes()} AM`;
                          return days === 1
                            ? String(time)
                            : String(date.toLocaleDateString());
                        }),
                        datasets: [
                          {
                            data: historicaldata.map((coin) => String(coin[1])),
                            label: `Price (past ${days} days) in ${currency}`,
                            borderColor: pointBackgroundColorString,
                          },
                        ],
                      }}
                    />
                  </>
                ) : (
                  <div className="tablecoinserr">{chartErr}</div>
                )}

                <div className="buttonschart">
                  <button
                    className={`${
                      days === 1 ? "activechartbtn" : ""
                    } ${chartbtnclass}`}
                    value="1"
                    onClick={handlechartbtnclick}
                  >
                    24 Hr
                  </button>
                  <button
                    className={`${
                      days === 30 ? "activechartbtn" : ""
                    } ${chartbtnclass}`}
                    value="30"
                    onClick={handlechartbtnclick}
                  >
                    30 Days
                  </button>
                  <button
                    className={`${
                      days === 180 ? "activechartbtn" : ""
                    } ${chartbtnclass}`}
                    value="180"
                    onClick={handlechartbtnclick}
                  >
                    6 Months
                  </button>
                  <button
                    className={`${
                      days === 365 ? "activechartbtn" : ""
                    } ${chartbtnclass}`}
                    value="365"
                    onClick={handlechartbtnclick}
                  >
                    1 Year
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="tablecoinserr">{coinErr}</div>
      )}
    </div>
  );
};

export default CoinPage;
