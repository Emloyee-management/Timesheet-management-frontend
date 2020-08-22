import React from "react";
import RootRouter from "./RootRouter";
import { Provider } from "react-redux";
import store from "../src/store";
import './App.scss';

function App() {
  return (
    <>
      <Provider store={store}>
        <RootRouter />
      </Provider>
    </>
  );
}

export default App;
