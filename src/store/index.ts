import { createStore, applyMiddleware, Action, Store, AnyAction } from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import rootReducer, { IStoreState } from "./reducers";

export type DispatchFunction = ThunkDispatch<IStoreState, null, Action>;

const store: Store<IStoreState, AnyAction> = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

export default store;
