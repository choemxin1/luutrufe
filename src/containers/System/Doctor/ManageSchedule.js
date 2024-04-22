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
  getDetailInfoDoctorByIdApi,
  UpDateInfoDoctors,
  getAllCodeApi,
  createManageScheduleApi
} from "../../../services/userService";
import { toast } from "react-toastify";

import DatePicker from "react-datepicker";
import "./ManageSchedule.scss";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctors: [],
      listTime: [],
      selectedDoctor: "",
      selectedDate: new Date(),
    };
  }

  async componentDidMount() {
    // let res = await getAllCodeApi('TIME');
    // console.log('zzazazazazaaaz',res)
    this.props.fetchAllTimeActions();
    this.props.fetchAllDoctors();
    console.log("zzazazazazaaaz11111111111111111111", this.props.listTime);
  }
  componentDidUpdate(preProps, preState, snapshot) {
    if (preProps.allDoctors !== this.props.allDoctors) {
      let allDoctors = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        allDoctors: allDoctors,
      });
    }
    if (preProps.language !== this.props.language) {
      let allDoctors = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        allDoctors: allDoctors,
      });
    }

    if (preProps.listTime !== this.props.listTime) {

      this.setState({
        listTime: this.props.listTime.map(item => ({...item, isSelected :false})),
      });
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
  handleUpdateContentMarkdown = async () => {
    // let abc = 6 || 9 || 3;
    // let abcd = 6 && 9 && 3;
    let res = await UpDateInfoDoctors(this.state);
    if (res && res.errCode === 0) {
      toast.success(res.message);
    } else {
      toast.error("error save detail doctor");
    }
    // console.log('abc',abc);
    // console.log('abcd',abcd)
  };
  handleChangeDatezz = (date) => {
    this.setState({
      selectedDate: date,
    });
    console.log("datepickerabczz", date);
  };
  handleChange = async (selectedDoctor) => {
    console.log("select doctor", selectedDoctor);
    this.setState({ selectedDoctor });
    let res = await getDetailInfoDoctorByIdApi(selectedDoctor.value);
    if (res.errCode === 0 && res?.data?.Markdown) {
      let Markdown = res?.data?.Markdown;
      console.log("handleChange markdown", Markdown);
      this.setState({
        contentHTML: Markdown.contentHTML,
        contentMarkdown: Markdown.contentMarkdown,
        des: Markdown.des,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        hasOldData: false,
        des: "",
      });
    }
    console.log("selectdoctor value", res);
  };
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
  subonsever = async() => {
    console.log('showsubsss',this.state)
    let evenNumbers = this.state.listTime.filter(item => item.isSelected === true).map(user => ({ ...user, doctorId:this.state.selectedDoctor.value,date:moment(this.state.selectedDate).format("YYYY-MM-DD 00:00:00")}));
    console.log('check trước sub sever',evenNumbers)
     let res = await createManageScheduleApi(evenNumbers);
     console.log('kết quả tạo',res)
  }
  render() {
    console.log("wfieofose", this.state.listTime);
    return (
      <>
        <div className="Manage-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>Chọn bác sĩ</label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChange}
                  options={this.state.allDoctors}
                  className="form-control"
                />
              </div>
              <div className="col-6 form-group">
                <label>Chọn ngày</label>
                <div>
                  <DatePicker
                    selected={this.state.selectedDate}
                    onChange={this.handleChangeDatezz}
                    minDate={new Date()} // Hiển thị từ ngày hôm nay trở đi
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
              <div className="col-12 pick-hour-container">
                <ul>
                  {this.state.listTime.map((item, index) => {
                    console.log('check true false',item.isSelected)
                    return (
                      <li className={(item.isSelected) ? 'choice-item active' : 'choice-item'} 
                      key={index} value={item.keyMap}
                      onClick={() => this.handleClickChoice(item)}
                      >
                        {this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                          
                          
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="btn btn-primary" 
              onClick={() => this.subonsever()}
              >Lưu Thông tin</div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
