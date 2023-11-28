import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartApp } from './CartApp';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
      <CartApp />
    </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
