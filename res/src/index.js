import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import RootReducer from './RootReducer'
import { Provider } from 'react-redux'

export const Store = createStore(RootReducer)

ReactDOM.render(
    <Provider store={Store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

