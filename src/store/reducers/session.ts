import { SessionActionType } from "../actions/session";
import { AnyAction, Reducer } from "redux";

const initialState = {
  isAuthorized: undefined,
  userInfo: {} as IUserInfo,
};

export type ISessionStore = Readonly<typeof initialState>;

const reducer: Reducer<ISessionStore, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SessionActionType.UPDATE_SESSION_INFO:
      return { ...state, ...action.payload };
    case SessionActionType.UPDATE_USER_INFO:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

export default reducer;
