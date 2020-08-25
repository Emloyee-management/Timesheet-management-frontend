import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../../store/reducers";
import { DispatchFunction } from "../../store";
import { updateUserInfo } from "../../store/actions/session";
import axios from "axios";
import { baseUrl } from "src/App";

const mapStateToProps = (state: IStoreState) => ({ session: state.session });

const mapDispatchToProps = (dispatch: DispatchFunction) =>
  bindActionCreators({ updateUserInfo }, dispatch);

type IprofilePageProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

const initialState = {
  phone: "",
  email: "",
  address: "",
  emergencyContact1: "",
  emergencyContact1Phone: "",
  emergencyContact2: "",
  emergencyContact2Phone: "",
  newUser: {} as IUserInfo,
};

type IprofilePageState = typeof initialState;

class ProfilePage extends React.Component<
  IprofilePageProps,
  IprofilePageState
> {
  constructor(props: IprofilePageProps) {
    super(props);
    this.state = initialState;
  }

  componentDidMount = () => {
    this.setState({
      phone: this.props.session.userInfo.phone,
      email: this.props.session.userInfo.email,
      address: this.props.session.userInfo.address,
      emergencyContact1: this.props.session.userInfo.emergency1Name,
      emergencyContact1Phone: this.props.session.userInfo.emergency1Phone,
      emergencyContact2: this.props.session.userInfo.emergency2Name,
      emergencyContact2Phone: this.props.session.userInfo.emergency2Phone,
    });
  };

  private handlePhoneChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      phone: event.currentTarget.value,
    });
  };

  private handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      email: event.currentTarget.value,
    });
  };

  private handleAddressChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      address: event.currentTarget.value,
    });
  };

  private handleEmergencyContact1Change = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    this.setState({
      emergencyContact1: event.currentTarget.value,
    });
  };

  private handleEmergencyContact1PhoneChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    this.setState({
      emergencyContact1Phone: event.currentTarget.value,
    });
  };
  private handleEmergencyContact2Change = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    this.setState({
      emergencyContact2: event.currentTarget.value,
    });
  };
  private handleEmergencyContact2PhoneChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    this.setState({
      emergencyContact2Phone: event.currentTarget.value,
    });
  };

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const newUser = {
      id: this.props.session.userInfo.id,
      username: this.props.session.userInfo.username,
      password: this.props.session.userInfo.password,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      emergency1Name: this.state.emergencyContact1,
      emergency1Phone: this.state.emergencyContact1Phone,
      emergency2Name: this.state.emergencyContact2,
      emergency2Phone: this.state.emergencyContact2Phone,
      token: this.props.session.userInfo.token,
      scope: this.props.session.userInfo.scope,
    } as IUserInfo;
    axios
      .post(
        `${baseUrl}/personal-info-service/userprofile?token=${this.props.session.userInfo.token}`,
        newUser
      )
      .then(() => {
        alert("update succeeded!");
        this.props.updateUserInfo(newUser);
      })
      .catch(() => {
        alert("update failed!");
      });
  };

  componentDidUpdate = () => {};

  render() {
    return (
      <div className="profile-page__container">
        {/* {JSON.stringify(this.props.session.userInfo)} */}
        <form onSubmit={this.handleSubmit}>
          <p>Contact</p>
          <input
            type="text"
            defaultValue={this.props.session.userInfo.phone}
            onChange={this.handlePhoneChange}
          />
          <input
            type="text"
            defaultValue={this.props.session.userInfo.email}
            onChange={this.handleEmailChange}
          />
          <input
            type="text"
            defaultValue={this.props.session.userInfo.address}
            onChange={this.handleAddressChange}
          />

          <p>Emergency Contact 1</p>
          <input
            type="text"
            defaultValue={this.props.session.userInfo.emergency1Name}
            onChange={this.handleEmergencyContact1Change}
          />
          <input
            type="text"
            defaultValue={this.props.session.userInfo.emergency1Phone}
            onChange={this.handleEmergencyContact1PhoneChange}
          />

          <p>Emergency Contact 2</p>
          <input
            type="text"
            defaultValue={this.props.session.userInfo.emergency2Name}
            onChange={this.handleEmergencyContact2Change}
          />
          <input
            type="text"
            defaultValue={this.props.session.userInfo.emergency2Phone}
            onChange={this.handleEmergencyContact2PhoneChange}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
);
