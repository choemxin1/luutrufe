import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInfoDoctorByIdApi } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import ScheduleDoctor from "./ScheduleDoctor";
import DoctorExtraInfor from "./DoctorExtraInfor";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DoctorInfo: {},
    };
  }
  async componentDidMount() {
    if (this.props.match?.params?.id) {
      let res = await getDetailInfoDoctorByIdApi(this.props.match.params.id);
      
      if (res?.errCode === 0) {
        res.data.Doctor_Infor = res.abc;
        console.log("res", res);
        this.setState({
          DoctorInfo: res.data,
        });
      }
    }
  }
  componentDidUpdate(preState, preProps, snapshot) {}
  render() {
    console.log("show this.props detaildoctor",this.props.match.params.id);
    let { DoctorInfo } = this.state;
    let { language } = this.props;
    let nameVi = "",
      nameEn = "";
    if (DoctorInfo?.positionData) {
      nameVi = `${DoctorInfo.positionData.valueVi}, ${DoctorInfo.lastName} ${DoctorInfo.firstName}`;
      nameEn = `${DoctorInfo.positionData.valueEn}, ${DoctorInfo.firstName} ${DoctorInfo.lastName}`;
    }
    console.log('metmoiqua',DoctorInfo.Doctor_Infor)
    return (
      <>
        <HomeHeader />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div className="content-left">
              <img src={this.state?.DoctorInfo?.image} />
            </div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">{this.state.DoctorInfo?.Markdown?.des}</div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <ScheduleDoctor Doctor={this.props} />
            </div>
            <div className="content-right"><DoctorExtraInfor doctorFromParent={this.state.DoctorInfo} /></div>
          </div>
          <div className="detail-info-doctor">
            <div
              dangerouslySetInnerHTML={{
                __html: DoctorInfo.Markdown?.contentHTML,
              }}
            ></div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
