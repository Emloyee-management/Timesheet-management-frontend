import React, { FormEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../../store/reducers";
import { DispatchFunction } from "../../store";
import { login, updateUserInfo } from "../../store/actions/session";
import { AxiosResponse } from "axios";
import axios from "axios";
import { baseUrl } from "src/App";

const mapStateToProps = (state: IStoreState) => ({ session: state.session });

const mapDispatchToProps = (dispatch: DispatchFunction) =>
  bindActionCreators({ login, updateUserInfo }, dispatch);

type ILoginPageProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

const initialState = { username: "", password: "" };

type ILoginPageState = typeof initialState;

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
  constructor(props: ILoginPageProps) {
    super(props);
    this.state = initialState;
  }

  handleUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      username: event.currentTarget.value,
    });
  };

  handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      password: event.currentTarget.value,
    });
  };

  handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: any
  ) => {
    event.preventDefault();
    const result: AxiosResponse = await axios.get(
      `${baseUrl}/session-service/login/${this.state.username}/${this.state.password}`
    );
    localStorage.setItem("username", (result.data as IUserInfo).username);
    localStorage.setItem("password", (result.data as IUserInfo).password);
    this.props.updateUserInfo(result.data as IUserInfo);
    if ((result.data as IUserInfo).id == null) {
      alert("wrong username or password!");
      return;
    } else {
      this.props.history.push("/home");
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="login-page__container">
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
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={this.handlePasswordChange}
              />
            </div>
            <div className="login-page__button">
              <br></br>
              <button type="submit">Login</button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
