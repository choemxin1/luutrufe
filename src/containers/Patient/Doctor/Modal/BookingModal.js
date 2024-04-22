import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from "../ProfileDoctor";
import "./BookingModal.scss";
import * as actions from './../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import DatePicker from '../../../../components/Input/DatePicker';
import { toast } from 'react-toastify';

import _ from "lodash"
class BookingModal extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      reason: '',
      birthday: '',
      selectedGender: '',
      doctorId: '',
      genders: '',
      timeType: '',
      nameVi:'',
      nameEn:''


    }

  }


  componentDidMount() {
    this.props.getGenders();

  }
  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map(item => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object)
      })
    }

    return result;
  }

  
  handleOnChange = (e, id) => {
    this.setState({ [id]: e.target.value })
  }
  async componentDidUpdate(preProps, preState, snapshot) {
    if (this.props.language !== preProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders)
      })
    }
    if (this.props.genders !== preProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders)
      })
    }
    if (this.props.dataTime !== preProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType
        })
      }
    }
  }
  handleonchangeInput = (event, id) => {
    let valueInput = event.target.value;
    this.setState({
      [id]: valueInput
    })
  }
  handleOnchangeDatePicker = (date) => {
    this.setState({ birthday: date[0] })
  }
  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  }
  handleConfirmBooking = async () => {


    let date = new Date(this.state.birthday).getTime();
    console.log('check ngay sinh', this.state.birthday,'check date',date);
    console.log('check props booking',this.props)
    let time = this.props.dataTime.dateData;
    time.date = this.props.dataTime.date;
    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType:this.props.dataTime.timeType,
      time: time,// ngày khám
      language: this.props.language,
      nameVi:this.state.nameVi,
      nameEn:this.state.nameEn
    })

    if (res?.errCode === 0) {
      toast.success("Booking a new appointment succeed")
      this.props.closeBookingClose();
    }
    else { toast.error('B00king a new appointment errorl') }
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
 handleDoctorUpdate = (updatedDoctorData) => {
  this.setState({
    nameVi:updatedDoctorData.nameVi,
    nameEn:updatedDoctorData.nameEn,
    doctorId:updatedDoctorData.doctorId,
    

  })
  console.log('Cập nhật dữ liệu bác sĩ:', updatedDoctorData);
  // Sử dụng dữ liệu được gửi về
};
render() {
  let { isOpenModal, closeBookingClose, dataTime } = this.props;
  console.log('show data time props',dataTime)
  let doctorId = '';
  if (dataTime && !_.isEmpty(dataTime)) {
    doctorId = dataTime.doctorId
  }
  return (

    <Modal isOpen={isOpenModal}
      className='booking-modal-container'
      
      size='lg'
      centered
    >
      <div className="booking-modal-content">
        <div className="booking-modal-header">
          <span classmame="left">
            <FormattedMessage id="patient.booking-modal.title" />
          </span>
          <span className="right"
            onClick={closeBookingClose}
          ><i className="fas fa-times"></i> </span>
          <div className="booking-modal-body">
            <div className="doctor-infor">
              <ProfileDoctor 
              doctorId={doctorId}
                isShowDescriptionDoctor={true}
                dataTime={dataTime}
                isShowPrice = {true}
                isShowLinkDetail = {false}
                onDoctorUpdate={ this.handleDoctorUpdate}
              />
            </div>

          </div>
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.fullName" />
              </label>
              <input className="form-control"
                value={this.state.fullName}
                onChange={(e) => this.handleonchangeInput(e, 'fullName')}
              ></input> </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.phoneNumber" />
              </label>
              <input className="form-control"
                value={this.state.phoneNumber}
                onChange={(e) => this.handleonchangeInput(e, 'phoneNumber')}

              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.email" />
              </label>
              <input className="form-control"
                value={this.state.email}
                onChange={(e) => this.handleonchangeInput(e, 'email')} />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.address" />
              </label>
              <input className="form-control"
                value={this.state.address}
                onChange={(e) => this.handleonchangeInput(e, 'address')} />
            </div>
            <div className="col-12 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.reason" />
              </label>
              <input className="form-control"
                value={this.state.reason}
                onChange={(e) => this.handleonchangeInput(e, 'reason')} />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.birthday" />
              </label>
              <DatePicker
                onChange={this.handleOnchangeDatePicker}
                className="form-control"
                value={this.state.birthday}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.gender" />
              </label>
              <Select
                value={this.state.selectedGender}
                onChange={this.handleChangeSelect}
                options={this.state.genders}
              />
            </div>
          </div>
        </div>
        <div className="booking-modal-footer">
          <button className="btn-booking-confirm"
            onClick={() => this.handleConfirmBooking()}>
            <FormattedMessage id="patient.booking-modal.btnconfirm" />

          </button>
          <button className="btn-booking-cancel"
            onClick={closeBookingClose}>
            <FormattedMessage id="patient.booking-modal.btnCancel" />

          </button> </div> </div>
    </Modal>

  )
}

  }

const mapStateToProps = state => {
  return {
    language: state.app.language,
    genders: state.admin.genders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
