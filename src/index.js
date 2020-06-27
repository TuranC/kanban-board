import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.scss';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import rootReducer from './redux/rootReducer';

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log('middleware', store.getState());
  return result;
};

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
