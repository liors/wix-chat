import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import startChat, { chatMiddleware } from './chat';
import reducers from './reducers';

const initialState = {
    userId: '1',
    currentMessage: '',
    messages: []
};

const createStoreWithMiddleware = applyMiddleware(chatMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers(initialState));

startChat(store);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app'));