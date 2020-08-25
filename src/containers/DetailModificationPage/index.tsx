import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../../store/reducers";
import { DispatchFunction } from "../../store";
import moment from "moment";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "src/App";
import { getAllSummary } from "../../store/actions/summary";
import { updateUserInfo } from "../../store/actions/session";

const mapStateToProps = (state: IStoreState) => ({ session: state.session });

const mapDispatchToProps = (dispatch: DispatchFunction) =>
  bindActionCreators({ getAllSummary, updateUserInfo }, dispatch);

type IDetailModificationPageProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<{
    id: string;
    status: string;
  }>;

const initialState = {
  id: "",
  userId: "",
  totalBillingHours: 0,
  totalCompensatedHours: 0,
  submissionStatus: "",
  approvalStatus: "",
  day1: moment(new Date()).format("YYYY-MM-DD").toString(),
  day1Starttime: "09:00",
  day1Endtime: "18:00",
  day1Status: "n/a",
  day2: moment(moment(new Date()).format("YYYY-MM-DD"))
    .add(1, "days")
    .format("YYYY-MM-DD")
    .toString(),
  day2Starttime: "09:00",
  day2Endtime: "18:00",
  day2Status: "",
  day3: moment(moment(new Date()).format("YYYY-MM-DD"))
    .add(2, "days")
    .format("YYYY-MM-DD")
    .toString(),
  day3Starttime: "09:00",
  day3Endtime: "18:00",
  day3Status: "",
  day4: moment(moment(new Date()).format("YYYY-MM-DD"))
    .add(3, "days")
    .format("YYYY-MM-DD")
    .toString(),
  day4Starttime: "09:00",
  day4Endtime: "18:00",
  day4Status: "",
  day5: moment(moment(new Date()).format("YYYY-MM-DD"))
    .add(4, "days")
    .format("YYYY-MM-DD")
    .toString(),
  day5Starttime: "09:00",
  day5Endtime: "18:00",
  day5Status: "",
  day6: moment(moment(new Date()).format("YYYY-MM-DD"))
    .add(5, "days")
    .format("YYYY-MM-DD")
    .toString(),
  day6Starttime: "09:00",
  day6Endtime: "18:00",
  day6Status: "",
  day7: moment(moment(new Date()).format("YYYY-MM-DD"))
    .add(6, "days")
    .format("YYYY-MM-DD")
    .toString(),
  day7Starttime: "09:00",
  day7Endtime: "18:00",
  day7Status: "",
  comment: "",
};

type IDetailModificationPageState = typeof initialState;

class DetailModificationPage extends React.Component<
  IDetailModificationPageProps,
  IDetailModificationPageState
> {
  constructor(props: IDetailModificationPageProps) {
    super(props);
    this.state = initialState;
  }

  componentDidMount = async () => {
    if (!localStorage.getItem("username")) {
      this.props.history.push("/");
    }
    localStorage.getItem("username") &&
      localStorage.getItem("password") &&
      (await axios
        .get(
          `${baseUrl}/session-service/login/${localStorage.getItem(
            "username"
          )}/${localStorage.getItem("password")}`
        )
        .then((result: AxiosResponse) => {
          this.props.updateUserInfo(result.data as IUserInfo);
        })
        .then(() => {
          this.props.getAllSummary(
            this.props.session.userInfo.id,
            this.props.session.userInfo.token,
            this.props.session.userInfo.scope
          );
        })
        .then(() => {
          this.setState({
            totalBillingHours: this.getTotalBillingHours(),
            totalCompensatedHours: this.getTotalBillingHours() - 40,
            userId: this.props.session.userInfo.id,
          });
        }));
    const result: AxiosResponse = await axios.get(
      `${baseUrl}/view-time-sheet-service/getOneTimeSheet?id=${this.props.match.params.id}&token=${this.props.session.userInfo.token}`
    );
    const timesheet = result.data as ISummaryInfo;
    this.setState(
      {
        id: timesheet.id,
        userId: timesheet.userId,
        totalBillingHours: timesheet.totalBillingHours,
        totalCompensatedHours: timesheet.totalCompensatedHours,
        submissionStatus: timesheet.submissionStatus,
        approvalStatus: timesheet.approvalStatus,
        day1: timesheet.day1,
        day1Starttime: timesheet.day1Starttime,
        day1Endtime: timesheet.day1Endtime,
        day1Status: timesheet.day1Status,
        day2: timesheet.day2,
        day2Starttime: timesheet.day2Starttime,
        day2Endtime: timesheet.day2Endtime,
        day2Status: timesheet.day2Status,
        day3: timesheet.day3,
        day3Starttime: timesheet.day3Starttime,
        day3Endtime: timesheet.day3Endtime,
        day3Status: timesheet.day3Status,
        day4: timesheet.day4,
        day4Starttime: timesheet.day4Starttime,
        day4Endtime: timesheet.day4Endtime,
        day4Status: timesheet.day4Status,
        day5: timesheet.day5,
        day5Starttime: timesheet.day5Starttime,
        day5Endtime: timesheet.day5Endtime,
        day5Status: timesheet.day5Status,
        day6: timesheet.day6,
        day6Starttime: timesheet.day6Starttime,
        day6Endtime: timesheet.day6Endtime,
        day6Status: timesheet.day6Status,
        day7: timesheet.day7,
        day7Starttime: timesheet.day7Starttime,
        day7Endtime: timesheet.day7Endtime,
        day7Status: timesheet.day7Status,
        comment: timesheet.comment,
      },
      () => {
        console.info(this.state);

        if (this.state.day1Status === "floating") {
          this.setRadioButton(1, "floating");
        }
        if (this.state.day1Status === "holiday") {
          this.setRadioButton(1, "holiday");
        }
        if (this.state.day1Status === "vacation") {
          this.setRadioButton(1, "vacation");
        }
        if (this.state.day1Status === "") {
          this.setRadioButton(1, "none");
        }
        if (this.state.day2Status === "floating") {
          this.setRadioButton(2, "floating");
        }
        if (this.state.day2Status === "holiday") {
          this.setRadioButton(2, "holiday");
        }
        if (this.state.day2Status === "vacation") {
          this.setRadioButton(2, "vacation");
        }
        if (this.state.day2Status === "") {
          this.setRadioButton(2, "none");
        }
        if (this.state.day3Status === "floating") {
          this.setRadioButton(3, "floating");
        }
        if (this.state.day3Status === "holiday") {
          this.setRadioButton(3, "holiday");
        }
        if (this.state.day3Status === "vacation") {
          this.setRadioButton(3, "vacation");
        }
        if (this.state.day3Status === "") {
          this.setRadioButton(3, "none");
        }
        if (this.state.day4Status === "floating") {
          this.setRadioButton(4, "floating");
        }
        if (this.state.day4Status === "holiday") {
          this.setRadioButton(4, "holiday");
        }
        if (this.state.day4Status === "vacation") {
          this.setRadioButton(4, "vacation");
        }
        if (this.state.day4Status === "") {
          this.setRadioButton(4, "none");
        }
        if (this.state.day5Status === "floating") {
          this.setRadioButton(5, "floating");
        }
        if (this.state.day5Status === "holiday") {
          this.setRadioButton(5, "holiday");
        }
        if (this.state.day5Status === "vacation") {
          this.setRadioButton(5, "vacation");
        }
        if (this.state.day5Status === "") {
          this.setRadioButton(5, "none");
        }
        if (this.state.day6Status === "floating") {
          this.setRadioButton(6, "floating");
        }
        if (this.state.day6Status === "holiday") {
          this.setRadioButton(6, "holiday");
        }
        if (this.state.day6Status === "vacation") {
          this.setRadioButton(6, "vacation");
        }
        if (this.state.day6Status === "") {
          this.setRadioButton(6, "none");
        }
        if (this.state.day3Status === "floating") {
          this.setRadioButton(7, "floating");
        }
        if (this.state.day7Status === "holiday") {
          this.setRadioButton(7, "holiday");
        }
        if (this.state.day7Status === "vacation") {
          this.setRadioButton(7, "vacation");
        }
        if (this.state.day7Status === "") {
          this.setRadioButton(7, "none");
        }
      }
    );
  };

  private setRadioButton = (num: number, status: string) => {
    //@ts-ignore
    document.getElementById(`day${num}-${status}`)!.checked = true;
  };

  private getDay = (num: number) => {
    switch (num) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "";
    }
  };

  private handleWeekEndingChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    // console.info(moment(event.currentTarget.value).day());
    // if (moment(event.currentTarget.value).day() === 6) {
    this.setState({
      day7: moment(event.currentTarget.value).format("YYYY-MM-DD").toString(),
      day6: moment(event.currentTarget.value)
        .subtract(1, "days")
        .format("YYYY-MM-DD")
        .toString(),
      day5: moment(event.currentTarget.value)
        .subtract(2, "days")
        .format("YYYY-MM-DD")
        .toString(),
      day4: moment(event.currentTarget.value)
        .subtract(3, "days")
        .format("YYYY-MM-DD")
        .toString(),
      day3: moment(event.currentTarget.value)
        .subtract(4, "days")
        .format("YYYY-MM-DD")
        .toString(),
      day2: moment(event.currentTarget.value)
        .subtract(5, "days")
        .format("YYYY-MM-DD")
        .toString(),
      day1: moment(event.currentTarget.value)
        .subtract(6, "days")
        .format("YYYY-MM-DD")
        .toString(),
    });
    // }
    // else {
    //   alert("Weekend day should be Saturday!");
    //   return;
    // }
  };

  private handleDay1StartTime = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day1Starttime: event.currentTarget.value });
  };

  private handleDay2StartTime = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day2Starttime: event.currentTarget.value });
  };
  private handleDay3StartTime = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day3Starttime: event.currentTarget.value });
  };
  private handleDay4StartTime = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day4Starttime: event.currentTarget.value });
  };
  private handleDay5StartTime = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day5Starttime: event.currentTarget.value });
  };
  private handleDay6StartTime = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day6Starttime: event.currentTarget.value });
  };
  private handleDay7StartTime = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day7Starttime: event.currentTarget.value });
  };

  private handleDay1EndTime = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day1Endtime: event.currentTarget.value });
  };

  private handleDay2EndTime = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day2Endtime: event.currentTarget.value });
  };
  private handleDay3EndTime = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day3Endtime: event.currentTarget.value });
  };
  private handleDay4EndTime = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day4Endtime: event.currentTarget.value });
  };
  private handleDay5EndTime = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day5Endtime: event.currentTarget.value });
  };
  private handleDay6EndTime = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day6Endtime: event.currentTarget.value });
  };
  private handleDay7EndTime = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day7Endtime: event.currentTarget.value });
  };
  private handleDay1Status = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day1Status: event.currentTarget.value });
  };
  private handleDay2Status = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day2Status: event.currentTarget.value });
  };
  private handleDay3Status = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day3Status: event.currentTarget.value });
  };
  private handleDay4Status = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day4Status: event.currentTarget.value });
  };
  private handleDay5Status = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day5Status: event.currentTarget.value });
  };
  private handleDay6Status = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day6Status: event.currentTarget.value });
  };
  private handleDay7Status = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ day7Status: event.currentTarget.value });
  };

  private handleBillingHours = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "") {
      this.setState({
        totalBillingHours: 0,
      });
    } else {
      this.setState({ totalBillingHours: parseInt(event.currentTarget.value) });
    }
  };

  private handleCompensatedHours = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    if (event.currentTarget.value === "") {
      this.setState({
        totalCompensatedHours: 0,
      });
    } else {
      this.setState({
        totalCompensatedHours: parseInt(event.currentTarget.value),
      });
    }
  };

  private handleSubmit = async (event: any) => {
    event.preventDefault();
    if (moment(this.state.day7).day() !== 6) {
      alert("End day must be Saturday!");
      return;
    } else {
      this.setState(
        {
          totalBillingHours: this.getTotalBillingHours(),
          totalCompensatedHours: this.getTotalBillingHours() - 40,
        },
        async () => {
          await axios
            .post(
              `${baseUrl}/view-time-sheet-service/setTime?token=${this.props.session.userInfo.token}`,
              this.state
            )
            .then(() => {
              alert("Update successfully");
              this.props.history.goBack();
            })
            .catch(() => {
              alert("Update failed!");
            });
        }
      );
    }
  };

  private getTotalBillingHours = () => {
    const total =
      // moment(
      //   [
      //     this.state.day1Endtime.split(":")[0],
      //     this.state.day1Endtime.split(":")[1],
      //   ],
      //   "HH:mm"
      // ).diff(
      //   moment(
      //     [
      //       this.state.day1Starttime.split(":")[0],
      //       this.state.day1Starttime.split(":")[1],
      //     ],
      //     "HH:mm"
      //   ),
      //   "hours"
      // ) +
      moment(
        [
          this.state.day2Endtime.split(":")[0],
          this.state.day2Endtime.split(":")[1],
        ],
        "HH:mm"
      ).diff(
        moment(
          [
            this.state.day2Starttime.split(":")[0],
            this.state.day2Starttime.split(":")[1],
          ],
          "HH:mm"
        ),
        "hours"
      ) +
      moment(
        [
          this.state.day3Endtime.split(":")[0],
          this.state.day3Endtime.split(":")[1],
        ],
        "HH:mm"
      ).diff(
        moment(
          [
            this.state.day3Starttime.split(":")[0],
            this.state.day3Starttime.split(":")[1],
          ],
          "HH:mm"
        ),
        "hours"
      ) +
      moment(
        [
          this.state.day4Endtime.split(":")[0],
          this.state.day4Endtime.split(":")[1],
        ],
        "HH:mm"
      ).diff(
        moment(
          [
            this.state.day4Starttime.split(":")[0],
            this.state.day4Starttime.split(":")[1],
          ],
          "HH:mm"
        ),
        "hours"
      ) +
      moment(
        [
          this.state.day5Endtime.split(":")[0],
          this.state.day5Endtime.split(":")[1],
        ],
        "HH:mm"
      ).diff(
        moment(
          [
            this.state.day5Starttime.split(":")[0],
            this.state.day5Starttime.split(":")[1],
          ],
          "HH:mm"
        ),
        "hours"
      ) +
      moment(
        [
          this.state.day6Endtime.split(":")[0],
          this.state.day6Endtime.split(":")[1],
        ],
        "HH:mm"
      ).diff(
        moment(
          [
            this.state.day6Starttime.split(":")[0],
            this.state.day6Starttime.split(":")[1],
          ],
          "HH:mm"
        ),
        "hours"
      );
    // +
    // moment(
    //   [
    //     this.state.day7Endtime.split(":")[0],
    //     this.state.day7Endtime.split(":")[1],
    //   ],
    //   "HH:mm"
    // ).diff(
    //   moment(
    //     [
    //       this.state.day7Starttime.split(":")[0],
    //       this.state.day7Starttime.split(":")[1],
    //     ],
    //     "HH:mm"
    //   ),
    //   "hours"
    // );
    return total;
  };

  // private onFileChange = (event: any) => {
  //   this.setState({ selectedFile: event.target.files[0] });
  // };

  componentDidUpdate = () => {
    console.info(this.state);
  };

  render() {
    return (
      <div className="detail-page__container">
        <form className="detail-page__form" onSubmit={this.handleSubmit}>
          <div className="detail-page__form--first flex-align-center">
            <div className="flex-align-center">
              <p>Week Ending</p>
              <input
                type="date"
                id="start"
                value={this.state.day7}
                onChange={this.handleWeekEndingChange}
                disabled={
                  this.props.match.params.status === "view" ? true : false
                }
              />
            </div>
            <div className="flex-align-center">
              <p>Total billing hours</p>
              <input
                type="text"
                value={this.getTotalBillingHours()}
                onChange={this.handleBillingHours}
                disabled={true}
              />
            </div>
            <div className="flex-align-center">
              <p>Total Compensated Hours</p>
              <input
                type="text"
                value={this.getTotalBillingHours() - 40}
                onChange={this.handleCompensatedHours}
                disabled={true}
              />
            </div>
          </div>
          {/* <div className="default-button">
            <button onClick={this.setDefault}>SET DEFAULT</button>
          </div> */}
          <div className="detail-page__form--second flex-align-center">
            <div className="content flex">
              <div>
                <p>day</p>
                <p>{this.getDay(moment(this.state.day1).day())}</p>
                <p>{this.getDay(moment(this.state.day2).day())}</p>
                <p>{this.getDay(moment(this.state.day3).day())}</p>
                <p>{this.getDay(moment(this.state.day4).day())}</p>
                <p>{this.getDay(moment(this.state.day5).day())}</p>
                <p>{this.getDay(moment(this.state.day6).day())}</p>
                <p>{this.getDay(moment(this.state.day7).day())}</p>
              </div>
              <div>
                <p>Date</p>
                {/* moment(moment('15-06-2010', 'DD-MM-YYYY')).format('MM-DD-YYYY') */}
                <p>
                  {moment(moment(this.state.day1, "YYYY-MM-DD")).format(
                    "MM/DD/YYYY"
                  )}
                </p>
                <p>
                  {moment(moment(this.state.day2, "YYYY-MM-DD")).format(
                    "MM/DD/YYYY"
                  )}
                </p>
                <p>
                  {moment(moment(this.state.day3, "YYYY-MM-DD")).format(
                    "MM/DD/YYYY"
                  )}
                </p>
                <p>
                  {moment(moment(this.state.day4, "YYYY-MM-DD")).format(
                    "MM/DD/YYYY"
                  )}
                </p>
                <p>
                  {moment(moment(this.state.day5, "YYYY-MM-DD")).format(
                    "MM/DD/YYYY"
                  )}
                </p>
                <p>
                  {moment(moment(this.state.day6, "YYYY-MM-DD")).format(
                    "MM/DD/YYYY"
                  )}
                </p>
                <p>
                  {moment(moment(this.state.day7, "YYYY-MM-DD")).format(
                    "MM/DD/YYYY"
                  )}
                </p>
              </div>
            </div>
            <div className="content-time flex-align-center">
              <div className="startTime">
                <p>Starting time</p>
                <input
                  type="time"
                  value={this.state.day1Starttime}
                  onChange={this.handleDay1StartTime}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="time"
                  value={this.state.day2Starttime}
                  onChange={this.handleDay2StartTime}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="time"
                  value={this.state.day3Starttime}
                  onChange={this.handleDay3StartTime}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="time"
                  value={this.state.day4Starttime}
                  onChange={this.handleDay4StartTime}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="time"
                  value={this.state.day5Starttime}
                  onChange={this.handleDay5StartTime}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="time"
                  value={this.state.day6Starttime}
                  onChange={this.handleDay6StartTime}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="time"
                  value={this.state.day7Starttime}
                  onChange={this.handleDay7StartTime}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
              </div>
              <div className="endTime">
                <p>Ending time</p>
                <input
                  type="time"
                  value={this.state.day1Endtime}
                  onChange={this.handleDay1EndTime}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="time"
                  value={this.state.day2Endtime}
                  onChange={this.handleDay2EndTime}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="time"
                  value={this.state.day3Endtime}
                  onChange={this.handleDay3EndTime}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="time"
                  value={this.state.day4Endtime}
                  onChange={this.handleDay4EndTime}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="time"
                  value={this.state.day5Endtime}
                  onChange={this.handleDay5EndTime}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="time"
                  value={this.state.day6Endtime}
                  onChange={this.handleDay6EndTime}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="time"
                  value={this.state.day7Endtime}
                  onChange={this.handleDay7EndTime}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
              </div>
            </div>
            <div className="content">
              <p>Total Hours</p>
              <p>
                {moment(
                  [
                    this.state.day1Endtime.split(":")[0],
                    this.state.day1Endtime.split(":")[1],
                  ],
                  "HH:mm"
                ).diff(
                  moment(
                    [
                      this.state.day1Starttime.split(":")[0],
                      this.state.day1Starttime.split(":")[1],
                    ],
                    "HH:mm"
                  ),
                  "hours"
                )}
              </p>
              <p>
                {moment(
                  [
                    this.state.day2Endtime.split(":")[0],
                    this.state.day2Endtime.split(":")[1],
                  ],
                  "HH:mm"
                ).diff(
                  moment(
                    [
                      this.state.day2Starttime.split(":")[0],
                      this.state.day2Starttime.split(":")[1],
                    ],
                    "HH:mm"
                  ),
                  "hours"
                )}
              </p>
              <p>
                {moment(
                  [
                    this.state.day3Endtime.split(":")[0],
                    this.state.day3Endtime.split(":")[1],
                  ],
                  "HH:mm"
                ).diff(
                  moment(
                    [
                      this.state.day3Starttime.split(":")[0],
                      this.state.day3Starttime.split(":")[1],
                    ],
                    "HH:mm"
                  ),
                  "hours"
                )}
              </p>
              <p>
                {moment(
                  [
                    this.state.day4Endtime.split(":")[0],
                    this.state.day4Endtime.split(":")[1],
                  ],
                  "HH:mm"
                ).diff(
                  moment(
                    [
                      this.state.day4Starttime.split(":")[0],
                      this.state.day4Starttime.split(":")[1],
                    ],
                    "HH:mm"
                  ),
                  "hours"
                )}
              </p>
              <p>
                {moment(
                  [
                    this.state.day5Endtime.split(":")[0],
                    this.state.day5Endtime.split(":")[1],
                  ],
                  "HH:mm"
                ).diff(
                  moment(
                    [
                      this.state.day5Starttime.split(":")[0],
                      this.state.day5Starttime.split(":")[1],
                    ],
                    "HH:mm"
                  ),
                  "hours"
                )}
              </p>
              <p>
                {moment(
                  [
                    this.state.day6Endtime.split(":")[0],
                    this.state.day6Endtime.split(":")[1],
                  ],
                  "HH:mm"
                ).diff(
                  moment(
                    [
                      this.state.day6Starttime.split(":")[0],
                      this.state.day6Starttime.split(":")[1],
                    ],
                    "HH:mm"
                  ),
                  "hours"
                )}
              </p>
              <p>
                {moment(
                  [
                    this.state.day7Endtime.split(":")[0],
                    this.state.day7Endtime.split(":")[1],
                  ],
                  "HH:mm"
                ).diff(
                  moment(
                    [
                      this.state.day7Starttime.split(":")[0],
                      this.state.day7Starttime.split(":")[1],
                    ],
                    "HH:mm"
                  ),
                  "hours"
                )}
              </p>
            </div>
            <div className="options-content">
              <div className="options-content-first flex-align-center">
                <input value="Floating" disabled />
                <input value="Holiday" disabled />
                <input value="Vacation" disabled />
                <input value="N/A" disabled />
              </div>
              <div className="options top-solid flex">
                <input
                  type="radio"
                  name="day1"
                  value="floating"
                  // defaultChecked={
                  //   this.state.day1Status === "n/a" ? true : false
                  // }
                  id="day1-floating"
                  onChange={this.handleDay1Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />

                <input
                  type="radio"
                  name="day1"
                  value="holiday"
                  id="day1-holiday"
                  // defaultChecked={
                  //   this.state.day1Status === "holiday" ? true : false
                  // }
                  onChange={this.handleDay1Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />

                <input
                  type="radio"
                  name="day1"
                  value="vacation"
                  id="day1-vacation"
                  // defaultChecked={
                  //   this.state.day1Status === "vacation" ? true : false
                  // }
                  onChange={this.handleDay1Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />

                <input
                  type="radio"
                  name="day1"
                  value=""
                  id="day1-none"
                  // defaultChecked={this.state.day1Status === "" ? true : false}
                  onChange={this.handleDay1Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
              </div>
              <div className="options flex">
                <input
                  type="radio"
                  name="day2"
                  value="floating"
                  id="day2-floating"
                  // defaultChecked={
                  //   this.state.day2Status === "floating" ? true : false
                  // }
                  onChange={this.handleDay2Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day2"
                  value="holiday"
                  id="day2-holiday"
                  // defaultChecked={
                  //   this.state.day2Status === "holiday" ? true : false
                  // }
                  onChange={this.handleDay2Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day2"
                  value="vacation"
                  id="day2-vacation"
                  // defaultChecked={
                  //   this.state.day2Status === "vacation" ? true : false
                  // }
                  onChange={this.handleDay2Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day2"
                  value=""
                  id="day2-none"
                  // defaultChecked={this.state.day2Status === "" ? true : false}
                  onChange={this.handleDay2Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
              </div>
              <div className="options flex">
                <input
                  type="radio"
                  name="day3"
                  value="floating"
                  id="day3-floating"
                  // defaultChecked={
                  //   this.state.day3Status === "floating" ? true : false
                  // }
                  onChange={this.handleDay3Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day3"
                  value="holiday"
                  id="day3-holiday"
                  // defaultChecked={
                  //   this.state.day3Status === "holiday" ? true : false
                  // }
                  onChange={this.handleDay3Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day3"
                  value="vacation"
                  id="day3-vacation"
                  // defaultChecked={
                  //   this.state.day3Status === "vacation" ? true : false
                  // }
                  onChange={this.handleDay3Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day3"
                  value=""
                  id="day3-none"
                  // defaultChecked={this.state.day3Status === "" ? true : false}
                  onChange={this.handleDay3Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
              </div>
              <div className="options flex">
                <input
                  type="radio"
                  name="day4"
                  value="floating"
                  id="day4-floating"
                  // defaultChecked={
                  //   this.state.day4Status === "floating" ? true : false
                  // }
                  onChange={this.handleDay4Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day4"
                  value="holiday"
                  id="day4-holiday"
                  // defaultChecked={
                  //   this.state.day4Status === "holiday" ? true : false
                  // }
                  onChange={this.handleDay4Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day4"
                  value="vacation"
                  id="day4-vacation"
                  // defaultChecked={
                  //   this.state.day4Status === "vacation" ? true : false
                  // }
                  onChange={this.handleDay4Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day4"
                  value=""
                  id="day4-none"
                  // defaultChecked={this.state.day4Status === "" ? true : false}
                  onChange={this.handleDay4Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
              </div>
              <div className="options flex">
                <input
                  type="radio"
                  name="day5"
                  value="floating"
                  id="day5-floating"
                  // defaultChecked={
                  //   this.state.day5Status === "floating" ? true : false
                  // }
                  onChange={this.handleDay5Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day5"
                  value="holiday"
                  id="day5-holiday"
                  // defaultChecked={
                  //   this.state.day5Status === "holiday" ? true : false
                  // }
                  onChange={this.handleDay5Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day5"
                  value="vacation"
                  id="day5-vacation"
                  // defaultChecked={
                  //   this.state.day5Status === "vacation" ? true : false
                  // }
                  onChange={this.handleDay5Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day5"
                  value=""
                  id="day5-none"
                  // defaultChecked={this.state.day5Status === "" ? true : false}
                  onChange={this.handleDay5Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
              </div>
              <div className="options flex">
                <input
                  type="radio"
                  name="day6"
                  value="floating"
                  id="day6-floating"
                  // defaultChecked={
                  //   this.state.day6Status === "floating" ? true : false
                  // }
                  onChange={this.handleDay6Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day6"
                  value="holiday"
                  id="day6-holiday"
                  // defaultChecked={
                  //   this.state.day6Status === "holiday" ? true : false
                  // }
                  onChange={this.handleDay6Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day6"
                  value="vacation"
                  id="day6-vacation"
                  // defaultChecked={
                  //   this.state.day6Status === "vacation" ? true : false
                  // }
                  onChange={this.handleDay6Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day6"
                  value=""
                  id="day6-none"
                  // defaultChecked={this.state.day6Status === "" ? true : false}
                  onChange={this.handleDay6Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
              </div>
              <div className="options flex">
                <input
                  type="radio"
                  name="day7"
                  value="floating"
                  id="day7-floating"
                  // defaultChecked={
                  //   this.state.day7Status === "floating" ? true : false
                  // }
                  onChange={this.handleDay7Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day7"
                  value="holiday"
                  id="day7-holiday"
                  // defaultChecked={
                  //   this.state.day7Status === "holiday" ? true : false
                  // }
                  onChange={this.handleDay7Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day7"
                  value="vacation"
                  id="day7-vacation"
                  // defaultChecked={
                  //   this.state.day7Status === "vacation" ? true : false
                  // }
                  onChange={this.handleDay7Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
                <input
                  type="radio"
                  name="day7"
                  value=""
                  id="day7-none"
                  // defaultChecked={this.state.day7Status === "" ? true : false}
                  onChange={this.handleDay7Status}
                  disabled={
                    this.props.match.params.status === "view" ? true : false
                  }
                />
              </div>
            </div>
          </div>
          <div className="detail-page__form--third flex-align-center">
            <div className="save-button">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.props.history.goBack();
                }}
              >
                {this.props.match.params.status === "view" ? "BACK" : "CANCEL"}
              </button>
              {this.props.match.params.status === "view" ? (
                <></>
              ) : (
                <button>SAVE</button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailModificationPage)
);
