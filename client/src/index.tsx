import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import './styles/style.scss';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate persistor={store.persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
