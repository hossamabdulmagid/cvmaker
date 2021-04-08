import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { unregister } from "./registerServiceWorker";

unregister();

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <PersistGate persistor={persistor}>
          <CSSReset />
          <Provider store={store}>
            <App />
          </Provider>
        </PersistGate>
      </ColorModeProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
