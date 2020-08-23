declare interface IUserInfo {
  id: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  address: string;
  emergency1Name: string;
  emergency1Phone: string;
  emergency2Name: string;
  emergency2Phone: string;
  token: string;
}

declare interface ISummaryInfo{
  id: string;
  userId: string;
  totalBillingHours: int;
  totalCompensatedHours: int;
  submissionStatus: string;
  approvalStatus: string;
  day1: string;
  day1Starttime: string;
  day1Endtime: string;
  day1Status: string;
  day2: string;
  day2Starttime: string;
  day2Endtime: string;
  day2Status: string;
  day3: string;
  day3Starttime: string;
  day3Endtime: string;
  day3Status: string;
  day4: string;
  day4Starttime: string;
  day4Endtime: string;
  day4Status: string;
  day5: string;
  day5Starttime: string;
  day5Endtime: string;
  day5Status: string;
  day6: string;
  day6Starttime: string;
  day6Endtime: string;
  day6Status: string;
  day7: string;
  day7Starttime: string;
  day7Endtime: string;
  day7Status: string;
  comment: string;
}
