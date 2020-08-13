import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import { getAllData } from './db/DB';
import appReducer from './redux/appReducer/appReducer';

(async function pointOfEntry() {
  const db = await getAllData();

  const obj = {
    data: db,
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
