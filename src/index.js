import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import StartPage from './Components/StartPage'
import ApplyForLoan from './Components/ApplyForLoan'
import CompanyDetails from './Components/CompanyDetails'
import Workflow from './Components/Workflow'

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import reducer from './reducers'
//import { composeWithDevTools } from 'redux-devtools-extension'
import { Container } from 'react-bootstrap'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'

const initialState = {}

const store = createStore(
    reducer,
    initialState,
    //composedEnhancers

);

const routing = (

    <Container>
        <Provider store={store}>
                <Router>
                <div>
                    <Route path="/start" component={StartPage} />
                    <Route path="/apply" component={ApplyForLoan} />
                    <Route path="/companyDetails" component={CompanyDetails} />
                    <Route path="/workflow/:identifier" component={Workflow} />
                    <Route exact path="/" component={App} />
                </div>
            </Router>
        </Provider>
    </Container>

)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
