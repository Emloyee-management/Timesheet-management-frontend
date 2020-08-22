import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import TemplatePage from "./containers/TemplatePage";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import SummaryPage from "./containers/SummaryPage";

type IRoutRouterProps = {};

interface IRoutRouterState {}

class RootRouter extends React.Component<IRoutRouterProps, IRoutRouterState> {
  constructor(props: IRoutRouterProps) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/template" component={TemplatePage} />
          <Route path="/home" component={HomePage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/summary" component={SummaryPage}/>
          <Route path="/" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RootRouter;
