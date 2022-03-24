import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { getEnvProduction } from "../utils/env";
import user from "./user";
import rootSaga from "./saga";

// ---
// REDUCERS
// ---

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  // TODO: check to disable by default on prods
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
      })
    : compose;
  const enhancer = applyMiddleware(...middlewares);

  const rootReducer = combineReducers({
    user,
  })

  const store = createStore(rootReducer, composeEnhancers(enhancer));

  // to debug without proper extentions
  if (!getEnvProduction()) {
    window.store = store;
  }

  sagaMiddleware.run(rootSaga);

  return store;
}
