import { Action, ActionCreator, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { IStoreState } from "../reducers";
import axios, { AxiosResponse } from "axios";

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

