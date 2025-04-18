import axios from "axios";
import React, { useEffect, useState } from "react";
import { ExchangeList } from "../ApiConfig";
import { Link } from "react-router-dom";
export default function Exchanges() {
  const [loading, setLoading] = useState(true);
  const [coinsrow, setCoinsrow] = useState([]);
  const [coinsrowerr, setCoinsrowerr] = useState(null);
  const [searchValue, setSearchvalue] = useState("");
  //just because of this i was encoutering an error which is not able to see anything inside the tbody element.
  //the solution was to just initialize the search state with empty string "".
  const handleInputChange = (event) => {
    setSearchvalue(event.target.value);
  };
  const handleSearch = () => {
    return coinsrow.filter((coin) => {
      return coin.name.toLowerCase().includes(searchValue)
    });
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(ExchangeList());
      setCoinsrow(response.data);
      setLoading(false);
    } catch (error) {
      setCoinsrowerr(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    handleSearch();
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="coinpage">
      <div className="container">
        <div className="heading">
          <h2>Explore Exchanges</h2>
        </div>
        {/* search component  */}

        <div className="input-group mb-3">
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Search Coins here.."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          
        </div>
        {/* search component ends  */}
        {loading ? (
          <div>Loading...</div>
        ) : coinsrow && coinsrow.length > 0 && Array.isArray(coinsrow) ? ( // Check if coinsrow is not empty
          <table className="table table-hover tablecoins">
            <thead>
              <tr>
                <th scope="col">Exchange</th>
                <th scope="col">Trust Score(10)</th>
                <th scope="col" className="responsive-none">
                  Trade Volume(btc)
                </th>
                <th scope="col" className="responsive-none">
                  Visit Website
                </th>
              </tr>
            </thead>
            <tbody>
              {handleSearch ? handleSearch().map((row) => (
                    <tr key={row.id}>
                      <td>
                        <div className="coinbox">
                          <div className="coinimg">
                            <img src={row.image} alt={row.name} />
                          </div>
                          <div className="cointitle">
                            <h4>{row.name}</h4>
                            <div>Centralized</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div> {row.trust_score}</div>
                      </td>
                      <td className="responsive-none">
                        <div>
                          {numberWithCommas(
                            row.trade_volume_24h_btc.toFixed(2)
                          )}
                        </div>
                      </td>
                      <td className="responsive-none">
                        <div>
                          <Link to={row.url} target="_blank" rel="noreferrer">
                            Read More..
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )) : coinsrow.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <div className="coinbox">
                          <div className="coinimg">
                            <img src={row.image} alt={row.name} />
                          </div>
                          <div className="cointitle">
                            <h4>{row.name}</h4>
                            <div>Centralized</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div> {row.trust_score}</div>
                      </td>
                      <td className="responsive-none">
                        <div>
                          {numberWithCommas(
                            row.trade_volume_24h_btc.toFixed(2)
                          )}
                        </div>
                      </td>
                      <td className="responsive-none">
                        <div>
                          <Link to={row.url} target="_blank" rel="noreferrer">
                            Read More..
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        ) : (
          <div className="tablecoinserr">
            You are on a Free plan, You can only check Realtime Crypto Data 5 times in a minute.
          </div>
        )}
      </div>
    </div>
  );
}
