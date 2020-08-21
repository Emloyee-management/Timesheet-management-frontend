import { SessionActionType } from "../actions/session";
import { AnyAction, Reducer } from "redux";

const initialState = {
  isAuthorized: undefined,
};

export type ISessionStore = Readonly<typeof initialState>;

const reducer: Reducer<ISessionStore, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SessionActionType.UPDATE_SESSION_INFO:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default reducer;
