import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../../store/reducers";
import { DispatchFunction } from "../../store";

const mapStateToProps = (state: IStoreState) => ({});

const mapDispatchToProps = (dispatch: DispatchFunction) =>
  bindActionCreators({}, dispatch);

type ITemplatePageProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

const initialState = {};

type ITemplatePageState = typeof initialState;

class TemplatePage extends React.Component<
  ITemplatePageProps,
  ITemplatePageState
> {
  constructor(props: ITemplatePageProps) {
    super(props);
    this.state = initialState;
  }

  render() {
    return <></>;
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TemplatePage)
);
