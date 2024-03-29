import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { GNES_STORE } from './Store/store.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={GNES_STORE}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
