import { SessionActionType } from "../actions/session";
import { AnyAction, Reducer } from "redux";

const initialState = {
  isAuthorized: undefined,
  userInfo: {} as IUserInfo,
  summary: [] as ISummaryInfo[],
};

export type ISessionStore = Readonly<typeof initialState>;

const reducer: Reducer<ISessionStore, AnyAction> = (
  state = initialState,
  action
) => {
  // console.info(action.payload);
  switch (action.type) {
    case SessionActionType.UPDATE_SESSION_INFO:
      return { ...state, ...action.payload };
    case SessionActionType.UPDATE_USER_INFO:
      return { ...state, userInfo: action.payload };
    case SessionActionType.UPDATE_SUMMARY_INFO:
      return {...state, summary: action.payload}
    default:
      return state;
  }
};

export default reducer;
