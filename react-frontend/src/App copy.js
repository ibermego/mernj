import logo from './logo.svg';
import './App.css';
import MessageComponent from './components/MessageComponent';
import Coches from './components/Coches';

function App() {
  return (
    <div className="App">

      {/* <MessageComponent /> */}

      <Coches />

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
