import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import './styles/style.scss';
import { PersistGate } from 'redux-persist/integration/react';
import { LoaderProvider } from 'react-loader-ts';

ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate persistor={store.persistor}>
      <React.StrictMode>
        <LoaderProvider>
          <App />
        </LoaderProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
