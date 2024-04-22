import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import React, { Component } from "react";
import { connect } from "react-redux";

import Select from "react-select";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import {
  getListPatientForDoctor,
  postSendRemedy
} from "../../../services/userService";
import { toast } from "react-toastify";
// import DatePicker from "react-flatpickr";
import DatePicker from "../../../components/Input/DatePicker";
import "./ManagePatient.scss";
import moment from "moment";
import LoadingOverlay from 'react-loading-overlay';
import RemedyModal from "./RemedyModal";
import "react-datepicker/dist/react-datepicker.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPatient: [],
      currentDate: moment(new Date()).format('YYYY-MM-DDTHH:00:00.000Z'),
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false
    };
  }

  async componentDidMount() {


    this.getDataPatient()
  }
  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let res = await getListPatientForDoctor({
      doctorId: user?.id,
      date: currentDate
    })
    if (res?.errCode === 0) {
      this.setState({ dataPatient: res.data })
    }

  }
  componentDidUpdate(preProps, preState, snapshot) {
    if (preProps.allDoctors !== this.props.allDoctors) {
      let allDoctors = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        allDoctors: allDoctors,
      });
    }
    if (preProps.language !== this.props.language) {

      this.setState({

      });
    }

    if (preState.currentDate !== this.state.currentDate) {


    }

  }
  handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);

    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleDateChange = (date) => {
    this.setState({
      selectedDate: date,
    });
  };
  handleSaveContentMarkdown = () => {
    // let abc = 6 || 9 || 3;
    // let abcd = 6 && 9 && 3;
    this.props.postSaveInfoDoctorsRedux(this.state);
    console.log("postSaveInfoDoctorsRedux", this.state);
    // console.log('abc',abc);
    // console.log('abcd',abcd)
  };

  handleChangeDatezz = (date) => {
    this.setState({
      selectedDate: date,
    });
    console.log("datepickerabczz", date);
  };
  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: new Date(date[0]).toISOString()
    }, () => {

      console.log('show date[0]', date[0]);


      this.getDataPatient()

    })
  }

  handleBtnConfirm = (item) => {
    console.log('check click', item)
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName
    }
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data
    })
  }
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      datamodal: {}
    })
  }
  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading:true
    })
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName
    })
    if (res?.errCode === 0) {
      this.setState({
        isShowLoading: false
      })
      toast.success('Send Remedy succeeds!');
      this.closeRemedyModal();
      await this.getDataPatient();
    } 
    else {
      this.setState({
        isShowLoading: false
      })
      toast.error('Something wrongs...');
      console.log('show errr res remely ', res)
    }
  }


  handleOnChangeDesc = (e) => {
    this.setState({
      des: e.target.value,
    });
  };
  buildDataInputSelect = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item, index) => {
        let obj = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
        obj.value = item.id;
        result.push(obj);
      });
    }
    return result;
  };
  handleClickChoice = (item) => {
    this.setState(prevState => ({
      listTime: prevState.listTime.map(timeItem =>
        timeItem.keyMap === item.keyMap ? { ...timeItem, isSelected: !timeItem.isSelected } : timeItem
      )
    }));
  }

  render() {

    let { dataPatient, isOpenRemedyModal, dataModal, isShowLoading } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay
          active={isShowLoading}
          spinner
          text='Loading...'>
          <div className="manage-patient-container">
            <div className="m-p-title">
              Quan 19 benh nh5n khan Wnh
            </div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label>Chon ngey khan:</label>
                <DatePicker
                  onChange={this.handleOnchangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manange-patient">
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th>Họ tên</th>
                      <th>Địa chỉ</th>
                      <th>Giới tính</th>
                      <th>Actions</th>
                    </tr>
                    {dataPatient?.length > 0 ?
                      dataPatient.map((item, index) => {
                        let time = language === LANGUAGES.VI ?
                          item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                        let gender = language === LANGUAGES.VI ?
                          item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                        return (
                          <tr key={index}>
                            <td >{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.patientData.firstName}</td>
                            <td> {item.patientData.address} </td>
                            <td> {gender}</td>
                            <td>
                              <button className='mp-btn-confirm'
                                onClick={() => this.handleBtnConfirm(item)}>Xác nhận</button>

                            </td>
                          </tr>)
                      }) :
                      <tr>
                        <td colSpan='6' style={{ textAlign: 'center' }}>no data</td>
                      </tr>
                    }
                  </tbody>


                </table>
              </div>
            </div>
          </div >
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy} />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.Doctors,
    isLoggedIn: state.user.isLoggedIn,
    listTime: state.admin.listTime,
    user: state.user.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //genderReduxStart: () => dispatch(fetchGenderStart()),
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
    fetchAllTimeActions: () => dispatch(actions.fetchAllTimeActions()),
    postSaveInfoDoctorsRedux: (data) =>
      dispatch(actions.postSaveInfoDoctorsActions(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
