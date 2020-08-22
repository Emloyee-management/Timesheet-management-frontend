import { Action, ActionCreator, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { IStoreState } from "../reducers";
import axios, { AxiosResponse } from "axios";

export enum SessionActionType {
  UPDATE_SESSION_INFO = "UPDATE_SESSION_INFO",
  UPDATE_USER_INFO = "UPDATE_USER_INFO",
  UPDATE_SUMMARY_INFO = "UPDATE_SUMMARY_INFO",
}

export type SessionAction = Action<SessionActionType>;
export type SessionAsyncAction<T> = ThunkAction<
  Promise<T>,
  IStoreState,
  null,
  AnyAction
>;

//updateUserInfo dispatch function
export const updateUserInfo: ActionCreator<SessionAction> = (
  userInfo: IUserInfo
) => ({
  type: SessionActionType.UPDATE_USER_INFO,
  payload: { ...userInfo },
});

export const login: ActionCreator<SessionAsyncAction<boolean>> = (
  username: string,
  password: string
) => {
  return async (dispatch) => {
    //   const result: AxiosResponse = await axios.get(
    //     `http://localhost:8080/login/${username}/${password}`
    //   );
    //   dispatch(updateUserInfo(result.data as IUserInfo));
    //   if ((result.data as IUserInfo).id == null) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // };
    return true;
  };
};

  //getAllSummaryInfo dispatch function
const updateSummaryInfo: ActionCreator<SessionAction> = (summary: ISummaryInfo) => ({
  type: SessionActionType.UPDATE_SUMMARY_INFO,
  payload: {summary},
});

export const getAllSummary: ActionCreator<ThunkAction<
  Promise<void>,
  IStoreState,
  null,
  SessionAction
>> = (userId: string) => {
  return async (dispatch) => {
    // await ApiClient.auth.loginWithPhoneAndCode(phone, code);
    await axios.get(`http://localhost:8080/timesheet/${userId}`)
    .then((res:AxiosResponse) => {
      console.log(res.data);
      dispatch(updateSummaryInfo( res.data  as ISummaryInfo[]));
      
    })
  };
};


