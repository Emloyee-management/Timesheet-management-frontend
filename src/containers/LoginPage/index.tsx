import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../../store/reducers";
import { DispatchFunction } from "../../store";
import { login } from "../../store/actions/session";
import axios from "axios";

const mapStateToProps = (state: IStoreState) => ({ session: state.session });

const mapDispatchToProps = (dispatch: DispatchFunction) =>
  bindActionCreators({ login }, dispatch);

type ILoginPageProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

const initialState = {};

type ILoginPageState = typeof initialState;

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
  constructor(props: ILoginPageProps) {
    super(props);
    this.state = initialState;
  }

  handleUsernameChange = (event: any) => {
    this.props.session.userInfo.username = event.target.value;

    console.log(this.props.session.userInfo)
  };

  handlePasswordChange = (event: any) => {
    this.props.session.userInfo.password = event.target.value;

    console.log(this.props.session.userInfo)
  };

  handleSubmit = (event:any) => {
    event.preventDefault();

    axios.post(`/login/`, {
      params: {
        username: this.props.session.userInfo.username,
        password: this.props.session.userInfo.password
      }
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <>
        <form>
          <div>
            <h1>Login</h1>
            <div>
              <h4>Username:</h4>
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                onChange={this.handleUsernameChange}
              />
              <h4>Password:</h4>
              <input
                type="text"
                placeholder="Enter Password"
                name="password"
                onChange={this.handlePasswordChange}
              />
            </div>
            <button type="submit" onClick={this.handleSubmit}>Login</button>
          </div>
        </form>
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
