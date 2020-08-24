import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../../store/reducers";
import { DispatchFunction } from "../../store";
import { getAllSummary } from "../../store/actions/summary";

import { Table } from "react-bootstrap";
import infoTag from "../../assets/infoTag.png";

const mapStateToProps = (state: IStoreState) => ({
  summary: state.summary,
  session: state.session,
});

const mapDispatchToProps = (dispatch: DispatchFunction) =>
  bindActionCreators({ getAllSummary }, dispatch);

type ISummaryPageProps = {
  handleSelect: (activedTab: string | null) => void;
  handleStatus: (status: string, timesheet: ISummaryInfo) => void;
} & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

const initialState = {
  userId: "5f407859e111306b4098f4fb",
  itemsToShow: 5,
  expanded: false,
  showBox: false,
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

  private handleHoverOver = (id: string) => {
    (document.getElementById(`${id}`) as HTMLElement).style.display = "block";
  };

  private handleHoverLeave = (id: string) => {
    (document.getElementById(`${id}`) as HTMLElement).style.display = "none";
  };

  private handleButton = (submissionStatus: string, id: string) => {
    if (submissionStatus === "Incomplete") {
      (document.getElementById(`${id}`) as HTMLElement).style.display = "block";
    }
  };

  private showMore = () => {
    this.state.itemsToShow === 5
      ? this.setState({
          itemsToShow: this.props.summary.summary.length,
          expanded: true,
        })
      : this.setState({ itemsToShow: 5, expanded: false });
  };
  componentDidMount = () => {
    // console.log("token:" + this.props.session.userInfo.token);
    this.props.getAllSummary(
      this.props.session.userInfo.id,
      this.props.session.userInfo.token
    );
  };

  private SubmissionStatusinfoTag = (props: any) => {
    return (
      <>
        {props.submissionStatus === "Incomplete" ? (
          <p>Items due: Proof of Approved TimeSheet</p>
        ) : props.approvalStatus === "unapproved" ? (
          <p>Approval denied by Admin, please contact your HR manager</p>
        ) : (
          <> </>
        )}
      </>
    );
  };

  private handleRedirectTimesheet = (type: string, timesheet: ISummaryInfo) => {
    this.props.handleSelect("timesheet");
    this.props.handleStatus(type, timesheet);
  };

  private Comment = (props: any) => {
    let floating = 0;
    let holiday = 0;
    let vacation = 0;

    props.weeklyStatus.forEach((element: string) => {
      if (element === "floating") {
        floating = floating + 1;
      } else if (element === "vacation") {
        vacation = vacation + 1;
      } else if (element === "holiday") {
        holiday = holiday + 1;
      }
    });

    return (
      <>
        {floating > 0 ? <p> '{floating}' floating day(s) required </p> : <></>}
        {vacation > 0 ? <p> '{vacation}' vacation day(s) required </p> : <></>}
        {holiday > 0 ? (
          <p> '{holiday}' holiday day(s) were included </p>
        ) : (
          <></>
        )}
      </>
    );
  };

  render() {
    return (
      <div className="summary-page__container">
        <Table className="summary-page__table" striped bordered hover>
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
              .map((item: ISummaryInfo, index: number) => {
                return (
                  <tr key={index}>
                    <td>{item.day7}</td>
                    <td>{item.totalBillingHours}</td>
                    <td>
                      {item.submissionStatus}
                      <img
                        src={infoTag}
                        onMouseEnter={() => this.handleHoverOver(item.id)}
                        onMouseLeave={() => this.handleHoverLeave(item.id)}
                      />
                      <div style={{ display: "none" }} id={item.id}>
                        <this.SubmissionStatusinfoTag
                          submissionStatus={item.submissionStatus}
                          approvalStatus={item.approvalStatus}
                        />
                      </div>
                    </td>

                    <td>{item.approvalStatus}</td>
                    <td className="view-tag">
                      {item.approvalStatus === "approved" ? (
                        <p
                          onClick={() =>
                            this.handleRedirectTimesheet("view", item)
                          }
                        >
                          View
                        </p>
                      ) : (
                        <p
                          onClick={() =>
                            this.handleRedirectTimesheet("edit", item)
                          }
                        >
                          Edit
                        </p>
                      )}
                    </td>
                    <td>
                      <this.Comment
                        weeklyStatus={[
                          item.day1Status,
                          item.day2Status,
                          item.day3Status,
                          item.day4Status,
                          item.day5Status,
                        ]}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <div className="show-button">
          <button onClick={this.showMore}>
            {this.state.expanded ? (
              <span>Show less</span>
            ) : (
              <span>Show more</span>
            )}
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SummaryPage)
);
