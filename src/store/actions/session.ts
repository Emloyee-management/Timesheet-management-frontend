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
export type SessionAsyncAction = ThunkAction<
  Promise<void>,
  IStoreState,
  null,
  AnyAction
>;

//updateUserInfo dispatch function
const updateUserInfo: ActionCreator<SessionAction> = (userInfo: IUserInfo) => ({
  type: SessionActionType.UPDATE_USER_INFO,
  payload: { ...userInfo },
});

export const login: ActionCreator<SessionAsyncAction> = (username: string, password: string) => 
   async (dispatch) => {

    axios.get(`http://localhost:8080/login/${username}/${password}`)
      .then((res:AxiosResponse) => {
        if(res.data.username==null){
          return false;
        }else{
          dispatch(updateUserInfo( res.data  as IUserInfo));
          return true;

        }
        
      })
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


