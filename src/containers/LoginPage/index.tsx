import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../../store/reducers";
import { DispatchFunction } from "../../store";
import { login } from "../../store/actions/session";
import TemplatePage from "../TemplatePage";

const mapStateToProps = (state: IStoreState) => ({ session: state.session });

const mapDispatchToProps = (dispatch: DispatchFunction) =>
  bindActionCreators({ login }, dispatch);

type ITemplatePageProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

const initialState = {
    activeTab:1
};

type ITemplatePageState = typeof initialState;

class LoginPage extends React.Component<
  ITemplatePageProps,
  ITemplatePageState
> {
  constructor(props: ITemplatePageProps) {
    super(props);
    this.state = initialState;
  }
  
  handleSelect = (selectedTab:any) =>{
    // The active tab must be set into the state so that
    // the Tabs component knows about the change and re-renders.
    this.setState({
      activeTab: selectedTab
    });
  }

  render() {
    return (
      <>
     <h1>LoginPage!</h1>
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
