  import { onAuthStateChanged } from "firebase/auth";
  import { createContext, useState, useContext, useEffect } from "react";
  import { auth, db } from "./components/Firebase";
  import { doc, onSnapshot } from "firebase/firestore";
  import { CoinList } from "./components/ApiConfig";
  import axios from "axios";
  //step:1  create context
  //here CurrencyContext is the context object which has got the state that we need to make availabe in entire application.

  const CurrencyContext = createContext();

  //step:2 Provider Function which provides the state to the entire app.

  const CurrencyProvider = ({ children }) => {
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [coinsrow, setCoinsrow] = useState([]);
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    const [user, setUser] = useState(null);
    const [coin, setCoin] = useState("");
    const [watchlist, setWatchlist] = useState([]);
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(CoinList(currency));
        setCoinsrow(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    useEffect(() => {
      if (currency === "INR") {
        setSymbol("₹");
      } else if (currency === "USD") {
        setSymbol("$");
      }
      fetchData();
    }, [currency]);
   //logic for constantly update the Portfolio state. 
   useEffect(() => {
    if (user) {
      const portfolioRef = doc(db, "watchlist", user.uid);
      var unSubscribe = onSnapshot(portfolioRef, (portfolioDoc) => {
        if (portfolioDoc.exists()) {
          setPortfolio(portfolioDoc.data().portfolioCoins);
          console.log(portfolioDoc.data().portfolioCoins);
        } else {
          console.log("No Portfolio Data Found");
        }
      });
  
      return () => {
        unSubscribe();
      };
    }
  }, [user]); // Add user to the dependency array to re-subscribe when the user changes
  //search algorithm

  const [searchValue, setSearchvalue] = useState("");
  const handleInputChange = (event) => {
    setSearchvalue(event.target.value);
  };

  const handleSearch = () => {
    return coinsrow.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(searchValue) ||
        coin.symbol.toLowerCase().includes(searchValue)
      );
    });
  };
  useEffect(() => {
    handleSearch();
  }, [currency]);
    //logic for constantly update the watchlist state.
    useEffect(() => {
      if (user) {
        const coinref = doc(db, "watchlist", user.uid);
        var unSubscribe = onSnapshot(coinref, (coin) => {
          if (coin.exists()) {
            setWatchlist(coin.data().coins);
          } else {
            console.log("No Items In the WatchList");
          }
        });
        return () => {
          unSubscribe();
        };
      }
    }, [user]);
    //user state update
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          console.log(user);
        } else setUser(null);
      });
    }, []);

    return (
      <CurrencyContext.Provider
        value={{
          currency,
          setCurrency,
          symbol,
          setCoin,
          coin,
          user,
          setUser,
          watchlist,
          setWatchlist,
          setCoinsrow,
          coinsrow,
          setLoading,
          loading,
          portfolio,
          handleInputChange,
          searchValue,
          handleSearch
        }}
      >
        {children}
      </CurrencyContext.Provider>
    );
  };
  //Now the question is what is this children?
  //Btw we can name it anything we want but it is just a convention to name children..
  //whatever inside provider component will automatically passed as a prop inside that and provider component will render that..
  //as we can see in it returns the children prop, although when you warp An entire app you don't need to pass any prop.

  //====================================================================
  // Step 3: Create a custom hook for consuming the context

  //this is optional but we are doing this because By doing this  we don't need to use useContext in any component.
  //we dont need to import the CurrencyContext in any component.just one import which is useCurrencyContext.
  function useCurrencyContext() {
    return useContext(CurrencyContext);
  }

  export { CurrencyProvider, useCurrencyContext };
