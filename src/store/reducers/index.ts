import { combineReducers } from "redux";
import session, { ISessionStore } from "./session";

export interface IStoreState {
  readonly session: ISessionStore;
}

export default combineReducers<IStoreState>({ session });
