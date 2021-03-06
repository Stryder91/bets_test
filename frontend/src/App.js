import "antd/dist/antd.css";
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
// import history from './history';

import { Header } from './components/Header';
import { Hltv } from './components/Htlv';
import { Sider } from './components/MyMenu';
import { SelectWallet } from "./components/SelectWallet";
import { Tournament } from "./components/Tournament";
import { Matches } from "./components/Matches";
import Box from "./blockchain/Box";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <main className="d-flex">
        <Sider />
        <div className="central d-center w-100 ">
          <h1 className="w-100">Welcome on Best Bets</h1>
          <SelectWallet />
          <Routes>
            <Route path="/matches" element={<Box />} /> 
            <Route path="/events/:id" element={<Tournament />} /> 
            <Route path="/events" element={<Hltv />} /> 
          </Routes>
        </div>
      </main>
      </BrowserRouter>  
    </div>
  );
}

export default App;
