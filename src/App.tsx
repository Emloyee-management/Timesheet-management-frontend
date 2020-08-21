import React from "react";
import RootRouter from "./RootRouter";
import { Provider } from "react-redux";
import store from "../src/store";

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
