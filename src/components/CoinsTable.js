import { Link } from "react-router-dom";
import { useCurrencyContext } from "../context";

export default function CoinsTable() {
  const { symbol, coinsrow, loading ,handleInputChange,
    searchValue,
    handleSearch} = useCurrencyContext();

  

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="container">
      <div className="heading">
        <h2>Cryptocurrency By Market Cap</h2>
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
              <th scope="col">Coin</th>
              <th scope="col">Price</th>
              <th scope="col" className="responsive-none">
                24h Change
              </th>
              <th scope="col" className="responsive-none">
                Market Cap(Btc)
              </th>
            </tr>
          </thead>
          <tbody>
            {handleSearch
              ? handleSearch().map((row) => (
                  <tr key={row.id}>
                    <td>
                      <Link to={`/coins/${row.id}`} key={row.id}>
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
                        {numberWithCommas(row.current_price.toFixed(2))}
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
                      <div>{row.market_cap_change_percentage_24h} %</div>
                    </td>
                    <td className="responsive-none">
                      <div>{row.market_cap}</div>
                    </td>
                  </tr>
                ))
              : coinsrow.map((row) => (
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
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
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
                      <div>{row.market_cap_change_percentage_24h}</div>
                    </td>
                    <td className="responsive-none">
                      <div>{row.market_cap}</div>
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
  );
}
