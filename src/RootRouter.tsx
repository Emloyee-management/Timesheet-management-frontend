import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import TemplatePage from "./containers/TemplatePage";

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
          <Route path="/" component={TemplatePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RootRouter;
