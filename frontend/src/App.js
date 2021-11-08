import './App.css';
import "antd/dist/antd.css";

import { FormTest } from './components/Form';
import { Header } from './components/Header';
import { Hltv } from './components/Htlv';
import { Sider } from './components/MyMenu';
import { Wallet } from './components/Setup';

function App() {
  return (
    <div className="App">
      <Header />
      <Sider />
      <h1>Coucou wallet</h1>

        <FormTest />
        {/* <Hltv /> */}
        <Wallet />
    </div>
  );
}

export default App;
