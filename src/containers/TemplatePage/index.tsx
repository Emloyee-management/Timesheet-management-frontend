import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../../store/reducers";
import { DispatchFunction } from "../../store";
import { login } from "../../store/actions/session";

const mapStateToProps = (state: IStoreState) => ({ session: state.session });

const mapDispatchToProps = (dispatch: DispatchFunction) =>
  bindActionCreators({ login }, dispatch);

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

  componentDidMount = () => {
    // console.log(this.props.session);
    this.props.login("abc", "abc");
  };

  render() {
    return (
      <>
        <h1>
          {this.props.session.userInfo.username} -{" "}
          {this.props.session.userInfo.password}
        </h1>
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TemplatePage)
);
