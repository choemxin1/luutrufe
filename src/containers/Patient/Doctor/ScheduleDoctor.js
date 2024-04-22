import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./ScheduleDoctor.scss";
import {
  getDetailInfoDoctorByIdApi,
  getScheduleDoctorApi,
} from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";
class ScheduleDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DoctorInfo: {},
      listTime: [],
      language: this.props.language,
      ScheduleTime: [],
      isOpenModalBooking:false,
      
      dataScheduleTimeModal: {}
    };
  }
  async componentDidMount() {
    this.getDayOfWeek();
    let res = {};
    if(this.props.doctorIdFromParent){
       res = await getScheduleDoctorApi( this.props.doctorIdFromParent,moment(new Date()).format("YYYY-MM-DD 00:00:00"))
    }
     else if (this.props.Doctor) {
       res = await getScheduleDoctorApi(
        this.props.Doctor?.match?.params?.id,
        moment(new Date()).format("YYYY-MM-DD 00:00:00")
      );
     }
    
    this.setState({
      ScheduleTime: res.data,
    });
    console.log('show props scheduleDoctor',this.props)
  }
  componentDidUpdate(preProps, preState, snapshot) {
    if (preProps.language !== this.props.language) {
      this.setState({
        language: this.props.language,
      });
    }
  }
  getDayOfWeek = () => {
    // let daysOfWeek = [
    //   "Chủ Nhật",
    //   "Thứ Hai",
    //   "Thứ Ba",
    //   "Thứ Tư",
    //   "Thứ Năm",
    //   "Thứ Sáu",
    //   "Thứ Bảy",
    // ];
    // let day = date.getDay();
    // return daysOfWeek[day];
    let time = [];

    for (let i = 1; i < 7; i++) {
      let obj = {};
      let date = new Date();

      date.setDate(date.getDate() + i); // Cộng thêm i ngày vào ngày hiện tại
      // console.log('show date',moment(date).format("DD/MM"))
      obj.time = moment(date).format("DD/MM");
      obj.time1 = moment(date).format("YYYY-MM-DD 00:00:00");
      obj.date = date;
      time[i] = obj;
    }
    this.setState({
      listTime: time,
    });
  };
  handleSelection = async (e) => {
    console.log("check select change ", e.target.value, this.props);
    let res = {};
    if(this.props.doctorIdFromParent){
       res = await getScheduleDoctorApi( this.props.doctorIdFromParent,e.target.value)
    }
     else if (this.props.Doctor) {
       res = await getScheduleDoctorApi(
        this.props.Doctor?.match?.params?.id,
        e.target.value
      );
     }
    console.log("res check schedule doctor", res);
    this.setState({
      ScheduleTime: res.data,
    });
  };
  handleClickScheduleTime = (time) => {
    this.setState({ 
      isOpenModalBooking: true, 
      dataScheduleTimeModal: time }) 
    console.log('show doctor infir: :', this.state.DoctorInfo) 
    }
closeBookingClose = () =>{ 
  this.setState({ 
  isOpenModalBooking: false})}

  render() {
    let { listTime, language, ScheduleTime,isOpenModalBooking,dataScheduleTimeModal } = this.state;
    return (
      <>
        <div className="Schedule-Doctor-container">
          <div className="all-schedule">
            <select onChange={this.handleSelection}>
              <option value={moment(new Date()).format("YYYY-MM-DD 00:00:00")}>
                {" "}
                {language === LANGUAGES.VI ? "Hôm nay" : "Today"} -
                {moment(new Date()).format("DD/MM")}
              </option>
              {listTime.map((item, index) => {
                let day =
                  language === LANGUAGES.VI
                    ? item.date.toLocaleDateString("vi-VN", { weekday: "long" })
                    : item.date.toLocaleDateString("en-US", {
                        weekday: "long",
                      });
                return (
                  <option key={index} value={item.time1}>
                    {day} - {item.time}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>
                  {" "}
                  <FormattedMessage id="patient.detail-doctor.schedule" />
                </span>
              </i>
            </div>
            <div className="time-content">
              {ScheduleTime?.length === 0 ? (
                <div className="no-schedule">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />{" "}
                </div>
              ) : (
                <>
                  <div className="time-content-btns">
                    {ScheduleTime.map((item, index) => {
                      let day =
                        language === LANGUAGES.VI
                          ? item.dateData.valueVi
                          : item.dateData.valueEn;
                      return <button key={index}
                      className={language === LANGUAGES.VI ?  "btn-vie" :"btn-en"}
                      onClick={()=> this.handleClickScheduleTime(item)}
                      >{day}</button>;
                    })}
                  </div>
                  <div className="book-free">
                    <span>
                      {" "}
                      <FormattedMessage id="patient.detail-doctor.choose" />
                      <i className="far fa-hand-point-up"></i>
                      <FormattedMessage id="patient.detail-doctor.book-free" />{" "}
                    </span>{" "}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <BookingModal 
        isOpenModal={isOpenModalBooking} 
        closeBookingClose={this.closeBookingClose} 
        dataTime={dataScheduleTimeModal}/> 
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DetailDoctorMenuPath: state.app.DetailDoctorMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
