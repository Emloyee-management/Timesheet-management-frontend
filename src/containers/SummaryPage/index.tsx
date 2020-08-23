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

const initialState = {
  userId: "5f407859e111306b4098f4fb",
  itemsToShow: 5,
  expanded: false,
};

type ISummaryPageState = typeof initialState;

class SummaryPage extends React.Component<
  ISummaryPageProps,
  ISummaryPageState
> {
  constructor(props: ISummaryPageProps) {
    super(props);
    this.state = initialState;
  }

  showMore = () => {
    this.state.itemsToShow === 5
      ? this.setState({ itemsToShow: this.props.summary.summary.length, expanded: true })
      : this.setState({ itemsToShow: 5, expanded: false });
  };
  componentDidMount = () => {
    //  this.props.getAllSummary(this.props.session.userInfo.id)
    this.props.getAllSummary(this.state.userId);
  };

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
              {this.props.summary.summary
                .slice(0, this.state.itemsToShow)
                .map((item: ISummaryInfo) => {
                  return (
                    <tr>
                      <td>{item.day7}</td>
                      <td>{item.totalBillingHours}</td>
                      <td>{item.submissionStatus}</td>
                      <td>{item.approvalStatus}</td>
                      <td>
                        {item.approvalStatus === "approved" ? (
                          <p>View: need be modified. Link to Child Component</p>
                        ) : (
                          <p>
                            Edit, View: need to be modified. Link to Child
                            Component
                          </p>
                        )}
                      </td>
                      {/* <td>Edit, View</td> */}
                      <td>{item.comment}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>

          <button onClick={this.showMore}>
            {this.state.expanded ? (
              <span>Show less</span>
            ) : (
              <span>Show more</span>
            )}
          </button>
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
