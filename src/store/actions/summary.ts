import { Action, ActionCreator, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { IStoreState } from "../reducers";
import axios, { AxiosResponse } from "axios";

export enum SummaryActionType {
  UPDATE_SUMMARY_INFO = "UPDATE_SUMMARY_INFO",
}

export type SummaryAction = Action<SummaryActionType>;
export type SummaryAsyncAction = ThunkAction<
  Promise<void>,
  IStoreState,
  null,
  AnyAction
>;

  //getAllSummaryInfo dispatch function
const updateSummaryInfo: ActionCreator<SummaryAction> = (summary: ISummaryInfo[]) => ({
  type: SummaryActionType.UPDATE_SUMMARY_INFO,
  payload: { summary},
});

export const getAllSummary: ActionCreator<ThunkAction<
  Promise<void>,
  IStoreState,
  null,
  SummaryAction
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


