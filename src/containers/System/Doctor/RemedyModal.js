import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import "./RemedyModal.scss";
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';


import { toast } from 'react-toastify';

import _ from "lodash";
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {

  constructor(props) {
    super(props);
    this.state =
    {

      email: '',
      imgBase64: ''


    }

  }


  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email
      })
    }

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
    // if (this.props.genders !== preProps.genders) {
    //   this.setState({
    //     genders: this.buildDataGender(this.props.genders)
    //   })
    // }
    // if (this.props.dataTime !== preProps.dataTime) {
    //   if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
    //     let doctorId = this.props.dataTime.doctorId;
    //     let timeType = this.props.dataTime.timeType;
    //     this.setState({
    //       doctorId: doctorId,
    //       timeType: timeType
    //     })
    //   }
    // }
    if (preProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email
      })
    }
  }
  handleOnchangeEmail = (event) => {
    let valueInput = event.target.value;
    this.setState({
      email: valueInput
    })
  }
  //   handleOnchangeDatePicker = (date) => {
  //     this.setState({ birthday: date[0] })
  //   }
  //   handleChangeSelect = (selectedOption) => {
  //     this.setState({ selectedGender: selectedOption });
  //   }
  //   handleConfirmBooking = async () => {


  //     let date = new Date(this.state.birthday).getTime();
  //     console.log('check ngay sinh', this.state.birthday,'check date',date);
  //     console.log('check props booking',this.props)
  //     let time = this.props.dataTime.dateData;
  //     time.date = this.props.dataTime.date;
  //     let res = await postPatientBookAppointment({
  //       fullName: this.state.fullName,
  //       phoneNumber: this.state.phoneNumber,
  //       email: this.state.email,
  //       address: this.state.address,
  //       reason: this.state.reason,
  //       date: this.props.dataTime.date,
  //       birthday: date,
  //       selectedGender: this.state.selectedGender.value,
  //       doctorId: this.state.doctorId,
  //       timeType:this.props.dataTime.timeType,
  //       time: time,// ngày khám
  //       language: this.props.language,
  //       nameVi:this.state.nameVi,
  //       nameEn:this.state.nameEn
  //     })

  //     if (res?.errCode === 0) {
  //       toast.success("Booking a new appointment succeed")
  //       this.props.closeBookingClose();
  //     }
  //     else { toast.error('B00king a new appointment errorl') }
  //   }

  // checkValideInput = () => {
  //   let check = true;
  //   let arrInput = ['firstName', 'lastName', 'address'];
  //   for (let i = 0; i < arrInput.length; i++) {
  //     if (!this.state[arrInput[i]]) {
  //       check = false;
  //       alert('missing arr', arrInput[i]);
  //       break;
  //     }
  //   }
  //   return check;
  // }
  //  handleDoctorUpdate = (updatedDoctorData) => {
  //   this.setState({
  //     nameVi:updatedDoctorData.nameVi,
  //     nameEn:updatedDoctorData.nameEn,
  //     doctorId:updatedDoctorData.doctorId,


  //   })
  //   console.log('Cập nhật dữ liệu bác sĩ:', updatedDoctorData);
  //   // Sử dụng dữ liệu được gửi về
  // };
  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({ imgBase64: base64 })
    }
  }

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state)
  }

  render() {
    let { isOpenModal, dataModal, closeRemedyModal, sendRemedy } = this.props;

    
    return (

      <Modal isOpen={isOpenModal}
        className='booking-modal-container'

        size='md'
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title">ad hoa don khan' I*111 thanh tong. </h5>
          <button type="button" className="close" aria-label="Close"
            onClick={closeRemedyModal}>
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <ModalBody>
          <div className="row">
            <div className="col-6 form-group">
              <label>Email binh nhân</label>
              <input className="form-control"
                type="email"
                value={this.state.email}
                onChange={(event) => this.handleOnchangeEmail(event)}
              />
            </div>
            <div className="col-6 form-group">
              <label>Chọn file đơn thuốc</label>
              <input className='form-control-file' type='file'
                onChange={(event) => this.handleOnchangeImage(event)} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button color='primary' className='btn-lg btn-primary'
            onClick={() => this.handleSendRemedy()}
          >Send </button> {' '}
          <button color='secondary' onClick={closeRemedyModal}>Cancel</button>
        </ModalFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
