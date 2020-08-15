import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import { getAllData } from './DB/DB';
import appReducer from './redux/appReducer/appReducer';

(async function pointOfEntry() {
  const obj = {
    data: await getAllData(),
  };

  const store = createStore(appReducer, obj);

  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  ReactDOM.render(
    app,
    document.getElementById('root'),
  );
}());
