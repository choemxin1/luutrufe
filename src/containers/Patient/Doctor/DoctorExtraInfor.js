import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DoctorExtraInfor.scss";
import { getDetailInfoDoctorByIdApi } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";

import NumberFormat from 'react-number-format';
import { getExtraInforDoctorById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {}
    };
  }
  async componentDidMount() {
    // if (this.props.match?.params?.id) {
    //   let res = await getDetailInfoDoctorByIdApi(this.props.match.params.id);
    //   console.log("res", res);
    //   if (res?.errCode === 0) {
    //     this.setState({
    //       DoctorInfo: res.data,
    //     });
    //   }
    // }
    if(this.props.doctorIdFromParent)
    {
      
        console.log('cheack chay doctorIdFromParentssssss')
        let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res?.errCode === 0) {
        
        this.setState({
          extraInfor: res.data
        })
      }
      
    }
  }
  showHideDetailInfor = () => {
    this.setState({ isShowDetailInfor: !this.state.isShowDetailInfor });
  }
  async componentDidUpdate(preProps, preState, snapshot) {
    if (this.props.doctorFromParent?.id !== preProps.doctorFromParent?.id) {
      console.log('cheack chay did updatessssssssssss', "props extra", this.props, "extra pre props", preProps)
      let res = await getExtraInforDoctorById(this.props.doctorFromParent.id);
      if (res?.errCode === 0) {
        console.log('cheack chay did update')
        this.setState({
          extraInfor: res.data
        })
      }
    }
    
  }
  render() {
    console.log("DoctorExtraInfor prop", this.props);
    console.log('show extra',this.state.extraInfor)
    let {  extraInfor } = this.state;
    let { language } = this.props;
    
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-infor-doctor.text-address" />
          </div>
          <div className="name-clinic">
            {this.state.extraInfor?.nameClinic ? this.state.extraInfor?.nameClinic : ''}
          </div>
          <div className="detail-address">
            {this.state.extraInfor?.addressClinic ? this.state.extraInfor?.addressClinic : ""}
          </div>
        </div>
        <div className="content-down">
          {this.state.isShowDetailInfor === false ? 
          (
            <div className="short-infor">
              <FormattedMessage id="patient.extra-infor-doctor.price" />
              {
                extraInfor?.priceTypeData && language === LANGUAGES.VI ?
                  (<>
                    <NumberFormat
                      className="currency"
                      value={extraInfor?.priceTypeData?.valueVi}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={'VND'} />
                  </>)
                  :
                  (
                    <NumberFormat
                      className="currency"
                      value={extraInfor?.priceTypeData?.valueEn}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={'$'} />
                  )

              }
              <span className="detail" onClick={() => this.showHideDetailInfor()}>
                <FormattedMessage id="patient.extra-infor-doctor.detail" />
              </span>
              
              )
            </div>) 
            : 
            (<><div className="title-price">
               <FormattedMessage id="patient.extra-infor-doctor.price" />

              </div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left"> 
                  <FormattedMessage id="patient.extra-infor-doctor.price" />

                  </span>
                  <span className="right"> 
                  {
                extraInfor?.priceTypeData && language === LANGUAGES.VI ?
                  (<>
                    <NumberFormat
                      className="currency"
                      value={extraInfor?.priceTypeData?.valueVi}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={'VND'} />
                  </>)
                  :
                  (
                    <NumberFormat
                      className="currency"
                      value={extraInfor?.priceTypeData?.valueEn}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={'$'} />
                  )

              }
                  </span> 
                  </div>
                <div className="note"> 
                {extraInfor?.note ? extraInfor.note :''} 
                </div>

              </div>
              <div className="payment"> 
              <FormattedMessage id="patient.extra-infor-doctor.payment" />
              
              {language === LANGUAGES.VI ? 
              (extraInfor?.paymentTypeData?.valueVi ? extraInfor?.paymentTypeData?.valueVi :'')
               : 
               ((extraInfor?.paymentTypeData?.valueEn ? extraInfor?.paymentTypeData?.valueEn : ''))}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor()}>
                  <FormattedMessage id="patient.extra-infor-doctor.hide-price" />

                </span>
              </div>
                
                </>)

          }
        </div>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
