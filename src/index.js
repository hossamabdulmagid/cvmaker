import React from "react";
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

import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { unregister } from "./registerServiceWorker";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
unregister();

Sentry.init({
  dsn:
    "https://f9f6d0fe72c24f0daaacd3b8ad1db0cb@o497996.ingest.sentry.io/5574928",
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <PersistGate persistor={persistor}>
            <CSSReset />
            <App />
          </PersistGate>
        </ColorModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
