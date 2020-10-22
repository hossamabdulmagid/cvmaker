import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, theme, ColorModeProvider, CSSReset } from '@chakra-ui/core';

import { Provider } from 'react-redux';


import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </ColorModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

