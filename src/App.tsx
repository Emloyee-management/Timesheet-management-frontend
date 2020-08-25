import React from "react";
import RootRouter from "./RootRouter";
import { Provider } from "react-redux";
import store from "../src/store";
import "./App.scss";

export const baseUrl = "http://localhost:7777";

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
