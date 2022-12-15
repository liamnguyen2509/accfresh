import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

// IMPORT CSS
import './assets/libs/bootstrap/dist/css/bootstrap.min.css'
import './assets/libs/owl.carousel/dist/assets/owl.carousel.css'
import './assets/libs/owl.carousel/dist/assets/owl.theme.default.css'
import './assets/libs/remixicon/fonts/remixicon.css'
import './assets/fonts/fonts.css'
import './assets/css/app.css'

import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './store/authContext';
import { CartContextProvider } from './store/cartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <CartContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartContextProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
