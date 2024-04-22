import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import "./ProfileDoctor.scss";
import _ from 'lodash';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { getProfileDoctorById, } from '../../../services/userService';
import { LANGUAGES } from "../../../utils";
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
      dataProfile: {}



    }

  }


  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data
    })
    let nameVi = '', nameEn = '';
    if (data?.positionData) {
      nameVi = `${data.positionData.valueVi}, ${data.lastName} ${data.firstName}`
      nameEn = `${data.positionData.valueEn}, ${data.firstName} ${data.lastName}`
    }
    if (this.props.onDoctorUpdate) {
      this.props.onDoctorUpdate({ nameVi: nameVi, nameEn: nameEn, doctorId: data.id });
    }

  }
  componentDidUpdate(preProps, preState, snapshot) {
    if (preProps.language !== this.props.language) {

    }
  }


  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res?.errCode === 0) {
        result = res.data;
      }
    }
    return result;

  }


  handleOnChange = (e, id) => {
    this.setState({ [id]: e.target.value })
  }
  checkValideInput = () => {
    let check = true;
    let arrInput = ['firstName', 'lastName', 'address'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        check = false;
        alert('missing arr', arrInput[i]);
        break;
      }
    }
    return check;
  }
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      console.log('show datatime', dataTime)
      let time = language === LANGUAGES.VI ? dataTime.dateData?.valueVi : dataTime.dateData?.valueEn;

      let date = language === LANGUAGES.VI ?
        new Date(dataTime.date).toLocaleDateString("vi-VN", { weekday: "long" })
        : new Date(dataTime.date).toLocaleDateString("en-US", {
          weekday: "long",
        });
      let date1 =
        moment(new Date(dataTime.date)).format('DD/MM/YYYY')

      return (
        <>
          <div>{time} - {date}- {date1}</div>
          <div><FormattedMessage id="patient.booking-modal.priceBooking" /></div>
        </>)
    } return <></>
  }


  render() {
    let { dataProfile } = this.state;
    let { language, isShowDescriptionDoctor, dataTime,
      isShowPrice, isShowLinkDetail, doctorId } = this.props;

    console.log('hoi dan it channel check state: ', this.state)
    let nameVi = '', nameEn = '';
    if (dataProfile?.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
    }
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{ backgroundImage: `url(${dataProfile?.image ? dataProfile?.image : ''})` }}>
          </div>
          <div className="content right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescriptionDoctor === true ?
                <>
                  <span>{dataProfile?.Markdown?.des}</span>
                </>
                :
                <> {this.renderTimeBooking(dataTime)} </>
              }

            </div>
          </div>
        </div>
        {
          isShowLinkDetail === true &&
          <div className="view-detail doctor" >
            <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
          </div>
        }
        {isShowPrice === true &&
          <div className='price'>
            <FormattedMessage id="patient.booking-modal.price" />
            {language === LANGUAGES.VI ? (<>
              <NumberFormat
                className="currency"
                value={dataProfile?.Doctor_Infor?.priceTypeData?.valueVi}
                displayType={'text'}
                thousandSeparator={true}
                suffix={'VND'} />
            </>) :
              (
                <NumberFormat
                  className="currency"
                  value={dataProfile?.Doctor_Infor?.priceTypeData?.valueEn}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={'$'} />
              )}


          </div>


        }


      </div>
    )


  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
