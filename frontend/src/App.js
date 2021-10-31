import './App.css';
import { Hltv } from './components/Htlv';
import { Wallet } from './components/Setup';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Coucou wallet</h1>
          <Hltv />
          <Wallet />
      </header>
    </div>
  );
}

export default App;
