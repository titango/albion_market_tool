import React, {Suspense} from 'react';
import {Link } from 'react-router-dom';

import logo from './albion.png';
import './App.css';
import { Button } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <p className="primary-text-color">Albion Online Market Tool</p>
        <Link className="App-link" to="/main">
          <Button className="App-button dark-primary-color text-primary-color " size="large" color="primary" variant="contained">Get started</Button>
        </Link>
        
      </header>
      <div className="App-cover"></div>
    </div>
  );
}

export default App;
