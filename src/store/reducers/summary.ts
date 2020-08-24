import { SummaryActionType } from "../actions/summary";
import { AnyAction, Reducer } from "redux";

const initialState = {
  summary: [] as ISummaryInfo[],
};

export type ISummaryStore = Readonly<typeof initialState>;

const reducer: Reducer<ISummaryStore, AnyAction> = (
  state = initialState,
  action
) => {
  console.info(action.payload);
  switch (action.type) {
    case SummaryActionType.UPDATE_SUMMARY_INFO:
      return { summary: action.payload.summary}
    default:
      return state;
  }
};

export default reducer;
