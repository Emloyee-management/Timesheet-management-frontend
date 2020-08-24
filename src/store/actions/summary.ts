import { Action, ActionCreator, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { IStoreState } from "../reducers";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "src/App";

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
const updateSummaryInfo: ActionCreator<SummaryAction> = (
  summary: ISummaryInfo[]
) => ({
  type: SummaryActionType.UPDATE_SUMMARY_INFO,
  payload: { summary },
});

export const getAllSummary: ActionCreator<ThunkAction<
  Promise<void>,
  IStoreState,
  null,
  SummaryAction
>> = (userId: string, token: string) => {
  return async (dispatch) => {
    // await ApiClient.auth.loginWithPhoneAndCode(phone, code);
    // alert(userId + "!!!!!!!!!!" + token);
    await axios
      .get(
        `${baseUrl}/view-time-sheet-service/timesheet/${userId}?token=${token}`
      )
      .then((res: AxiosResponse) => {
        // console.log("data:" + res.data.length);
        dispatch(updateSummaryInfo(res.data as ISummaryInfo[]));
      });
  };
};
