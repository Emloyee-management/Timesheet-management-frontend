import {
  createStore,
  applyMiddleware,
  Action,
  Store,
  AnyAction,
  Middleware,
} from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import rootReducer, { IStoreState } from "./reducers";

let middleware: Middleware[] = [thunkMiddleware];

const store: Store<IStoreState, AnyAction> = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export type DispatchFunction = ThunkDispatch<IStoreState, null, Action>;
export default store;
