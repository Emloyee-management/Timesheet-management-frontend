import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../../store/reducers";
import { DispatchFunction } from "../../store";
import moment from "moment";

const mapStateToProps = (state: IStoreState) => ({ session: state.session });

const mapDispatchToProps = (dispatch: DispatchFunction) =>
  bindActionCreators({}, dispatch);

type IDetailPageProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

const initialState = {
  id: "5f42d82260458405d2e42980",
  userId: "5f407859e111306b4098f4fb",
  totalBillingHours: 32,
  totalCompensatedHours: 40,
  submissionStatus: "Incomplete",
  approvalStatus: "approved",
  day1: "03/25/2018",
  day1Starttime: "9:00",
  day1Endtime: "18:00",
  day1Status: "floating",
  day2: "03/26/2018",
  day2Starttime: "9:00",
  day2Endtime: "18:00",
  day2Status: "",
  day3: "03/27/2018",
  day3Starttime: "9:00",
  day3Endtime: "18:00",
  day3Status: "",
  day4: "03/28/2018",
  day4Starttime: "9:00",
  day4Endtime: "18:00",
  day4Status: "",
  day5: "03/29/2018",
  day5Starttime: "9:00",
  day5Endtime: "18:00",
  day5Status: "",
  day6: "03/30/2018",
  day6Starttime: "9:00",
  day6Endtime: "18:00",
  day6Status: "",
  day7: "03/31/2018",
  day7Starttime: "9:00",
  day7Endtime: "18:00",
  day7Status: "",
  comment: "sucks",
};

type IDetailPageState = typeof initialState;

class DetailPage extends React.Component<IDetailPageProps, IDetailPageState> {
  constructor(props: IDetailPageProps) {
    super(props);
    this.state = initialState;
  }

  componentDidMount = () => {
    this.setState({});
  };

  handlePhoneChange = (event: React.FormEvent<HTMLInputElement>) => {};

  handleSubmit = (event: any) => {
    event.preventDefault();
  };

  componentDidUpdate = () => {};

  render() {
    return (
      <div className="detail-page__container">
        <form onSubmit={this.handleSubmit}>
          <div className="detail-page__form--first flex-align-center">
            <div className="flex-align-center">
              <p>Week Ending</p>
              <input type="text" defaultValue={this.state.day7} />
            </div>
            <div className="flex-align-center">
              <p>Total billing hours</p>
              <input type="text" defaultValue={this.state.totalBillingHours} />
            </div>
            <div className="flex-align-center">
              <p>Total Compensated Hours</p>
              <input type="text" defaultValue={this.state.totalBillingHours} />
            </div>
          </div>
          <div className="default-button">
            <button>SET DEFAULT</button>
          </div>
          <div className="detail-page__form--second flex-align-center">
            <div className="content flex-align-center">
              <div>
                <p>day</p>
                <p>Sunday</p>
                <p>Monday</p>
                <p>Tuesday</p>
                <p>Wednesday</p>
                <p>Thursday</p>
                <p>Friday</p>
                <p>Saturday</p>
              </div>
              <div>
                <p>Date</p>
                <p>{this.state.day1}</p>
                <p>{this.state.day2}</p>
                <p>{this.state.day3}</p>
                <p>{this.state.day4}</p>
                <p>{this.state.day5}</p>
                <p>{this.state.day6}</p>
                <p>{this.state.day7}</p>
              </div>
            </div>
            <div className="content flex-align-center">
              <div>
                <p>Starting time</p>
                <p>{this.state.day1Starttime}</p>
                <p>{this.state.day2Starttime}</p>
                <p>{this.state.day3Starttime}</p>
                <p>{this.state.day4Starttime}</p>
                <p>{this.state.day5Starttime}</p>
                <p>{this.state.day6Starttime}</p>
                <p>{this.state.day7Starttime}</p>
              </div>
              <div>
                <p>Ending time</p>
                <p>{this.state.day1Endtime}</p>
                <p>{this.state.day2Endtime}</p>
                <p>{this.state.day3Endtime}</p>
                <p>{this.state.day4Endtime}</p>
                <p>{this.state.day5Endtime}</p>
                <p>{this.state.day6Endtime}</p>
                <p>{this.state.day7Endtime}</p>
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
            <div className="content flex-align-center">
              <div className="floating">
                <p>Floating day</p>
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day1Status === "floating" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day2Status === "floating" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day3Status === "floating" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day4Status === "floating" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day5Status === "floating" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day6Status === "floating" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day7Status === "floating" ? true : false
                  }
                />
              </div>
              <div className="holiday">
                <p>Holiday</p>
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day1Status === "holiday" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day2Status === "holiday" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day3Status === "holiday" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day4Status === "holiday" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day5Status === "holiday" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day6Status === "holiday" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day7Status === "holiday" ? true : false
                  }
                />
              </div>
              <div className="vacation">
                <p>Vacation</p>
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day1Status === "vacation" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day2Status === "vacation" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day3Status === "vacation" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day4Status === "vacation" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day5Status === "vacation" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day6Status === "vacation" ? true : false
                  }
                />
                <input
                  type="checkbox"
                  name="day1status"
                  defaultChecked={
                    this.state.day7Status === "vacation" ? true : false
                  }
                />
              </div>
            </div>
          </div>
          <div className="detail-page__form--third flex-align-center">
            <select>
              <option>Approved timesheet</option>
              <option>Unapproved timesheet</option>
            </select>
            <input type="file" />
            <button className="save-button">SAVE</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailPage)
);
