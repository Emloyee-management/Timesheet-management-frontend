import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../../store/reducers";
import { DispatchFunction } from "../../store";
import { getAllSummary } from "../../store/actions/summary";
import { table } from "console";
import { Table } from "react-bootstrap";
const mapStateToProps = (state: IStoreState) => ({ summary: state.summary });

const mapDispatchToProps = (dispatch: DispatchFunction) =>
  bindActionCreators({ getAllSummary }, dispatch);
// bindActionCreators({ getAllSummary }, dispatch);

type ISummaryPageProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

const initialState = { userId: "5f407859e111306b4098f4fb" };

type ISummaryPageState = typeof initialState;

class SummaryPage extends React.Component<
  ISummaryPageProps,
  ISummaryPageState
> {
  constructor(props: ISummaryPageProps) {
    super(props);
    this.state = initialState;
  }
  componentDidMount = () => {
    //  this.props.getAllSummary(this.props.session.userInfo.id)
    this.props.getAllSummary(this.state.userId);
  };


  Action = (approvalStatus:any) =>{
    console.log(approvalStatus)
    if(approvalStatus === 'approved'){
      return <h3>No Edit</h3>
    } else {
      return <h3> Edit, View</h3>
    }
  }
  render() {
    // {JSON.stringify(this.props.summary.summary)}
    return (
      <>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>WeekEnding</th>
                <th>Total Hours</th>
                <th>Submission Status</th>
                <th>Approval Status</th>
                <th>Option</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {this.props.summary.summary.map((item: ISummaryInfo) => {
                return (
                  <tr>
                    <td>{item.day7}</td>
                    <td>{item.totalBillingHours}</td>
                    <td>{item.submissionStatus}</td>
                    <td>{item.approvalStatus}</td>
                    {/* <td><this.Action approvalStatus={item.approvalStatus} /></td> */}
                    <td>{item.comment}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <h2>
            Currently, we are using hardcoded UserID. This should be changed
            after Login Feature is enabled. Modify componentDidMount()
          </h2>
        </div>
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SummaryPage)
);
