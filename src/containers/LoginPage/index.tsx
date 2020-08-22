import React, { FormEvent } from "react";
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

const initialState = {username:'', password:''};

type ILoginPageState = typeof initialState;

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
  constructor(props: ILoginPageProps) {
    super(props);
    this.state = initialState;
  }

  handleUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {

    this.setState({
      username: event.currentTarget.value

    });
    // console.log(this.state)
  };

  handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {

    this.setState({
      password: event.currentTarget.value
      
    });
    // console.log(this.state)
  };

  handleSubmit = async (event: any) => {

    event.preventDefault();
    await this.props.login(this.state.username, this.state.password).
    
    
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
