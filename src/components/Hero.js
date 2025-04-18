import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { TrendingCoins } from "./ApiConfig";
import { useCurrencyContext } from "../context";
import { Link } from "react-router-dom";

export default function Hero() {
  const { currency, symbol } = useCurrencyContext();
  const [trendingCoins, setTrendingCoins] = useState("");
  const [trendingCoinsErr, setTrendingCoinsErr] = useState("");
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  var settings = {
    className: "center",

    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };
  const fetchdata = () => {
    axios
      .get(TrendingCoins(currency))
      .then((res) => {
        setTrendingCoins(res.data);
      })
      .catch((error) => {
        setTrendingCoinsErr(` You are on a Free plan, You can only check Realtime Crypto Data 5 times in a minute.`);
      });
  };
  useEffect(() => {
    fetchdata();
  }, [currency]);

  return (<div className="coincarousel container">
    <div className="heading">
        <h2> Most Trending Cryptocurrencies</h2>
      </div>
  {trendingCoins && !trendingCoinsErr? <Slider {...settings} className="slickslider container">
      {trendingCoins && trendingCoins.map((coin) => {
            let profit = coin?.price_change_percentage_24h >= 0;

            return (
              <Link className="coin-item" to={`/coins/${coin.id}`} key={coin.name}>
                <img
                  src={coin?.image}
                  alt={coin.name}
                  height="80"
                  style={{ marginBottom: 10 }}
                />
                <div>
                  {coin?.symbol}
                  &nbsp;
                  </div>
                  <div
                    style={{
                      color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                      fontWeight: 500,
                    }}
                  >
                    {profit && "+"}
                    {coin?.price_change_percentage_24h?.toFixed(2)}%
                  </div>
                
                <div style={{ fontSize: 22, fontWeight: 500 }}>
                  {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </div>
              </Link>
            );
          })
        }
    </Slider>: <div className="trendingcoinserr">{trendingCoinsErr}</div> }
    </div>
  );
}
