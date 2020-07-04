import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Route } from 'react-router-dom'

import Home from "./App"
import Navigator from './components/Navigator'
import About from "./pages/about"

ReactDOM.render(
    <Router>
        <div>
            <main>
                <Route exact path="/" component={Navigator} />
                <Route path="/about" component={About} />
            </main>
        </div>
    </Router>, 
    document.getElementById("root")
    
)
