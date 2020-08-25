import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../../store/reducers";
import { DispatchFunction } from "../../store";
import { login } from "../../store/actions/session";
import axios from "axios";
import { baseUrl } from "src/App";

const mapStateToProps = (state: IStoreState) => ({ session: state.session });

const mapDispatchToProps = (dispatch: DispatchFunction) =>
  bindActionCreators({ login }, dispatch);

type IFileProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

const initialState = { file: null };

type IFileState = typeof initialState;

class File extends React.Component<IFileProps, IFileState> {
  constructor(props: IFileProps) {
    super(props);
    this.state = initialState;
  }

  componentDidMount = () => {
    this.props.login("abc", "abc");
  };

  onFormSubmit = (e: any) => {
    e.preventDefault(); // Stop form submit
    // this.fileUpload(this.state.file).then((response) => {
    //   console.log(response.data);
    // });
    console.info(this.state.file);
    axios
      .post(
        `${baseUrl}/view-time-sheet-service/upload?id=${this.props.session.userInfo.id}&token=${this.props.session.userInfo.token}`,
        { file: this.state.file, id: 1243 }
      )
      .then((res) => {
        console.info(res);
      })
      .catch(() => {
        alert("fail!");
      });
  };

  private onChange = (selectorFiles: any) => {
    console.info(selectorFiles);
    this.setState({ file: selectorFiles[0] });
  };

  render() {
    return (
      <form className="file-page" onSubmit={this.onFormSubmit}>
        <input type="file" onChange={(e) => this.onChange(e.target.files)} />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(File));
