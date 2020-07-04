import React from 'react';
import { Link } from "react-router-dom"
import logo from './albion.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Albion Online Market Tool</p>
        <img src={logo} className="App-logo" alt="logo" />
        <Link className="App-link" to="/main">Get Started</Link>
      </header>
      
    </div>
  );
}

export default App;
