import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../../store/reducers";
import { DispatchFunction } from "../../store";
import { getAllSummary } from "../../store/actions/summary";
import { table } from "console";
import { Table } from "react-bootstrap";
import infoTag from "../../assets/infoTag.png";

{
  /* <button
onMouseEnter={() =>
  this.handleHoverOver(
    item.id,
    item.submissionStatus,
    item.approvalStatus
  )
}
onMouseLeave={() =>
  this.handleHoverLeave(
    item.id,
    item.submissionStatus,
    item.approvalStatus
  )
}
>
Info
</button>
<p style={{ display: "none" }} id={item.id}>
{item.submissionStatus === "Incomplete" ? (
  <p>‘Items due: Proof of Approved TimeSheet’</p>
) : (
  <p></p>
)}
</p> */
}

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

  handleHoverOver = (id: string) => {
    //@ts-ignore
    (document.getElementById(`${id}`) as HTMLElement).style.display = "block";
  };

  handleHoverLeave = (id: string) => {
    //@ts-ignore
    (document.getElementById(`${id}`) as HTMLElement).style.display = "none";
  };

  handleButton = (submissionStatus: string, id: string) => {
    //@ts-ignore
    if (submissionStatus === "Incomplete") {
      (document.getElementById(`${id}`) as HTMLElement).style.display = "block";
    }
  };

  showMore = () => {
    this.state.itemsToShow === 5
      ? this.setState({
          itemsToShow: this.props.summary.summary.length,
          expanded: true,
        })
      : this.setState({ itemsToShow: 5, expanded: false });
  };
  componentDidMount = () => {
    //  this.props.getAllSummary(this.props.session.userInfo.id)
    this.props.getAllSummary(this.state.userId);
  };

  SubmissionStatusinfoTag = (props: any) => {
    return (
      <p>
        {props.submissionStatus === "Incomplete" ? (
          <p>Items due: Proof of Approved TimeSheet</p>
        ) : props.approvalStatus === "unapproved" ? (
          <p>Approval denied by Admin, please contact your HR manager</p>
        ) : (
          <p> </p>
        )}
      </p>
    );
  };

  Comment = (props: any) => {
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
      <p>
        {floating > 0 ? (
          <p> '{floating}' floating day(s) required </p>
        ) : (
          <p></p>
        )}
        {vacation > 0 ? (
          <p> '{vacation}' vacation day(s) required </p>
        ) : (
          <p></p>
        )}
        {holiday > 0 ? (
          <p> '{holiday}' holiday day(s) were included </p>
        ) : (
          <p></p>
        )}
      </p>
    );
  };

  render() {
    // {JSON.stringify(this.props.summary.summary)}
    return (
      <div className="summary-page__container">
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
              .map((item: ISummaryInfo, index: number) => {
                return (
                  <tr key={index}>
                    <td>{item.day7}</td>
                    <td>{item.totalBillingHours}</td>
                    <td>
                      {item.submissionStatus}{" "}
                      <img
                        src={infoTag}
                        onMouseEnter={() => this.handleHoverOver(item.id)}
                        onMouseLeave={() => this.handleHoverLeave(item.id)}
                      />
                      <p style={{ display: "none" }} id={item.id}>
                        <this.SubmissionStatusinfoTag
                          submissionStatus={item.submissionStatus}
                          approvalStatus={item.approvalStatus}
                        />
                      </p>
                    </td>

                    <td>{item.approvalStatus}</td>
                    <td>
                      {item.approvalStatus === "approved" ? (
                        <p>View</p>
                      ) : (
                        <p>Edit | View</p>
                      )}
                    </td>
                    <td>
                      {/* {item.comment} */}
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
        <h2>
          Currently, we are using hardcoded UserID. This should be changed after
          Login Feature is enabled. Check componentDidMount()
        </h2>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SummaryPage)
);
