import React, { Component } from "react";
import { LANGUAGES } from "../../../utils";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import doctor from "../../../assets/doctor/doctor.jpg";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrDoctors:[]
    }
  }
  componentDidUpdate(preProps, preState,snapshot){
    if(preProps.topDoctorsRedux !== this.props.topDoctorsRedux){
      this.setState({
        arrDoctors:this.props.topDoctorsRedux
      })
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }
  handleViewDetailDoctor = (doctor) => {
console.log(doctor);
this.props.history.push(`/detail-doctor/${doctor.id}`)
  }
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    let arrDoctors = this.state.arrDoctors;
    let language = this.props.language;
    
    
    return (
      // react-slick
      <div className="section-specialty">
        <div className="specialty-container">
          <div className="specialty-header">
            <span className="title-section"> Bác sĩ nổi bật</span>
            <button className="btn-section">xem thêm</button>
          </div>
          <div className="specialty-body">
            <Slider {...settings}>
              
              {arrDoctors && arrDoctors.length > 0
                && arrDoctors.map((item, index) => {
                  let image64 = '';
                  if(item.image) {
                    image64 = new Buffer(item.image, 'base64').toString('binary');
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                  return (
                    <div className="img-cus OutStandingDoctor" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                <img className="OutStandingDoctorImg" src={image64} />
                <div className="OutStandingDoctorText text-center">
                  <div>{language === LANGUAGES.VI ? nameVi : nameEn }</div>
                </div>
                <div className="OutStandingDoctorText text-center">
                  khoa xương khớp 
                </div>
              </div>
                  )
                })
              }
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux:state.admin.topDoctors,
    language: state.app.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
  };
};

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
