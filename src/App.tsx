import React, { Fragment } from "react";
import "./App.css";
import RoutesSPA from "./route";
import configureStore from "./store";
import { Provider } from 'react-redux'

const store = configureStore()

function App() {


  return (
      <Fragment>
        <Provider store={store}>
          <RoutesSPA />
        </Provider>
      </Fragment>
  );
}

export default App;
