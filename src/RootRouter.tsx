import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

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
        <Switch>{/* <Route path='/' component={HomePage} /> */}</Switch>
      </BrowserRouter>
    );
  }
}

export default RootRouter;
