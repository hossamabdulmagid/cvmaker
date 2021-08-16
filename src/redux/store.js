import { applyMiddleware, createStore, compose } from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReduer from "./root-reducer";

import { persistStore } from "redux-persist";

const middlewares = [thunk, logger];

// hide action with state in console.log in deplyment app.

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReduer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
