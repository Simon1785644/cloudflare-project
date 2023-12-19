import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LoginContextProvider } from './components/contexts/LoginContext';
import { OptionContextProvider } from './components/utils/OptionContext';
import { CartContextProvider } from './components/utils/CartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <OptionContextProvider>
      <LoginContextProvider>
        <CartContextProvider>
        <App />
        </CartContextProvider>
      </LoginContextProvider>
    </OptionContextProvider>
);
