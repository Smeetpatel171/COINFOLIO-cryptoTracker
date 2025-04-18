import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import BottomToTop from "./components/BottomToTop";
import PageNotFound from "./components/pages/PageNotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./components/pages/Coins";
import Exchanges from "./components/pages/Exchanges";
import LearnCrypto from "./components/pages/LearnCrypto";
import Premium from "./components/pages/Premium";
import Profile from "./components/pages/Profile";
import LoginSignup from "./components/pages/LoginSignup";
import CoinPage from "./components/pages/CoinPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Coins />} />
            {/* <Route path="contact" element={<Contact />} /> */}
            
            <Route path="about" element={<About />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="exchanges" element={<Exchanges />} />
            <Route path="premium" element={<Premium />} />
            <Route path="learncrypto" element={<LearnCrypto />} />
            <Route path="profile" element={<Profile />} />
            <Route path="loginsignup" element={<LoginSignup />} />
            <Route path="coins/:id" element={<CoinPage />} />
          </Route>
        </Routes>
        {/* <Footer></Footer> */}
        <BottomToTop></BottomToTop>
      </BrowserRouter>
    </>  
  );
}

export default App;
