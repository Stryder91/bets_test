import "antd/dist/antd.css";
import './App.css';

import { FormTest } from './components/Form';
import { Header } from './components/Header';
import { Hltv } from './components/Htlv';
import { Sider } from './components/MyMenu';
import { SelectWallet } from "./components/SelectWallet";

function App() {
  return (
    <div className="App">
      
      <Header />
      <main className="d-flex">
        <Sider />
        <div className="central d-center w-100 ">
          <h1 className="w-100">Welcome on Best Bets</h1>
          <SelectWallet />
        </div>

        {/* <FormTest /> */}
        {/* <Hltv /> */}
      </main>
    </div>
  );
}

export default App;
