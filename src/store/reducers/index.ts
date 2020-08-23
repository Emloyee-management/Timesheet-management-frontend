import { combineReducers } from "redux";
import session, { ISessionStore } from "./session";
import summary,  { ISummaryStore } from "./summary";


export interface IStoreState {
  readonly session: ISessionStore;
  readonly summary: ISummaryStore;
   
}

export default combineReducers<IStoreState>({ session , summary});
