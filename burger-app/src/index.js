import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
//This for redux-saga to bee seen by store:
import createSagaMiddleware from 'redux-saga';
import { watchAuth, watchBurgerBuilder } from './store/sagas';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

//To install project on firebase: 
//1. npm install -g firebase-tools
//2. firebase login
//3. firebase init: 1.a Y | 1b hosting only | 1c use an existing project | 1d select the project | 1e not public but "build" (without quotes)
// | 1f configure as single page app: y | 1g File build/index.html already exists. Overwrite: N
//4. firebase deploy

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  : null || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
    );

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
