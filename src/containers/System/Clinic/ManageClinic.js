import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./ManageClinic.scss";
import {
  createNewClinic
} from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import { CommonUtils } from '../../../utils';
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: ''
    };
  }
  async componentDidMount() {


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

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time
    })
    console.log('show doctor infir: :', this.state.DoctorInfo)
  }

  handleOnChangeInput = (e, id) => {
    this.setState({ [id]: e.target.value })
  }
  handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);

    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };
  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({ imageBase64: base64 })
    }
  }
  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state)
    if (res?.errCode === 0) {
      toast.success('Add new clinic succeeds!')
      this.setState({
        name: '',
        imageBase64: '',
        address: '',
        descriptionHTML: '',
        descriptionMarkdown: ''
      })
    }
    else {
      toast.error('something wrongs....')
      console.log('» hoi dan it check res:', res)
    }
  }
  render() {

    return (
      <>
        <div className="manage-specialty-container">
          <div className="ms-title">Quan lí phòng khám </div>
          <div className="add-new-specialty row">
            <div className="col-6 form-group">
              <label>Tin chuyen khoa</label>
              <input className="form-control" type="text" value={this.state.name}
                onChange={(event) => this.handleOnChangeInput(event, 'name')} />

            </div>
            <div className="col-6 form-group">
              <label>Anh chuyen khoa</label>
              <input className="form-control-file" type="file"
                onChange={(event) => this.handleOnchangeImage(event)} />
            </div>
            <div className="col-6 form-group">
              <label>Địa chỉ phòng khám</label>
              <input className="form-control" type="text" value={this.state.address}
                onChange={(event) => this.handleOnChangeInput(event, 'address')} />
            </div>
            <div className=" col-12">
              <MdEditor
                style={{ height: '300px' }}
                renderHTML={text => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
            <div className="col-12">
              <button className="btn-save-specialty"
                onClick={() => this.handleSaveNewClinic()}
              >Save</button>
            </div>
          </div>
        </div> </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
