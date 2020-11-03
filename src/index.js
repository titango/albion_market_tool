import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Home from "./App"

const Main = React.lazy(() => import('./pages/Main'));
const Marketplace = React.lazy(() => import('./pages/Marketplace'));
const CityTrading = React.lazy(() => import('./pages/CityTrading'));

ReactDOM.render(
    <Router>
        <Suspense fallback={<div>Loading...</div>}> 
          <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/main" component={Main} />
                <Route exact path="/main/marketplace" component={Marketplace}></Route>
                <Route exact path="/main/city_trading" component={CityTrading}></Route>
            </Switch>
          </Suspense>
    </Router>, 
    document.getElementById("root")
    
)
