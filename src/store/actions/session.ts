import { Action, ActionCreator, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { IStoreState } from "../reducers";

export enum SessionActionType {
  UPDATE_SESSION_INFO = "UPDATE_SESSION_INFO",
  UPDATE_USER_INFO = "UPDATE_USER_INFO",
}

export type SessionAction = Action<SessionActionType>;
export type SessionAsyncAction = ThunkAction<
  Promise<void>,
  IStoreState,
  null,
  AnyAction
>;

const updateUserInfo: ActionCreator<SessionAction> = (userInfo: IUserInfo) => ({
  type: SessionActionType.UPDATE_USER_INFO,
  payload: { ...userInfo },
});

export const login: ActionCreator<ThunkAction<
  Promise<void>,
  IStoreState,
  null,
  SessionAction
>> = (username: string, password: string) => {
  return async (dispatch) => {
    // await ApiClient.auth.loginWithPhoneAndCode(phone, code);
    dispatch(updateUserInfo({ username: "abc", password: "abc" } as IUserInfo));
  };
};
