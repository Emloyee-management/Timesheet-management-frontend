import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../../store/reducers";
import { DispatchFunction } from "../../store";
import { login } from "../../store/actions/session";
import { Tabs, Tab } from "react-bootstrap";
import TemplatePage from "../TemplatePage";

const mapStateToProps = (state: IStoreState) => ({ session: state.session });

const mapDispatchToProps = (dispatch: DispatchFunction) =>
  bindActionCreators({ login }, dispatch);

type IHomePageProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

const initialState = {
  activeTab: "summary" as string | null,
};

type IHomePageState = typeof initialState;

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = initialState;
  }

  handleSelect = (selectedTab: string | null) => {
    // The active tab must be set into the state so that
    // the Tabs component knows about the change and re-renders.
    this.setState({
      activeTab: selectedTab,
    });
  };

  render() {
    return (
      <>
        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
          <Tab eventKey="summary" title="Summary">
            Summary Tab. Go to HomePage/index.tsx and change this into a custom
            Component. Sample:
            <TemplatePage />
          </Tab>
          <Tab eventKey="timesheet" title="Timesheet">
            Timesheet Tab. Go to HomePage/index.tsx and change this into a custom
            Component.
          </Tab>

          <Tab eventKey="profile" title="Profile">
            Profile Tab. Go to HomePage/index.tsx and change this into a custom
            Component.
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
