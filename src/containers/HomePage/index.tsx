import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../../store/reducers";
import { DispatchFunction } from "../../store";
import { login } from "../../store/actions/session";
import { Tabs, Tab } from "react-bootstrap";

import SummaryPage from "../SummaryPage";
import ProfilePage from "../ProfilePage";
import DetailPage from "../DetailPage";

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

  private handleSelect = (selectedTab: string | null) => {
    this.setState({
      activeTab: selectedTab,
    });
  };

  render() {
    return (
      <div className="home-page__container">
        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
          <Tab eventKey="summary" title="Summary">
            <SummaryPage handleSelect={() => this.handleSelect("timesheet")} />
          </Tab>
          <Tab eventKey="timesheet" title="Timesheet">
            <DetailPage />
          </Tab>
          <Tab eventKey="profile" title="Profile">
            <ProfilePage />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
