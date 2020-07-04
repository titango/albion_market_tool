import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Route } from 'react-router-dom'

import Home from "./App"
import Navigator from './components/Navigator'
import Main from "./pages/Main"

ReactDOM.render(
    <Router>
        <div>
            <main>
                <Route exact path="/" component={Home} />
                <Route path="/main" component={Main} />
            </main>
        </div>
    </Router>, 
    document.getElementById("root")
    
)
