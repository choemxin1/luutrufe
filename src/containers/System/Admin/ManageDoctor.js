import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import Select from "react-select";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import {
  getDetailInfoDoctorByIdApi,
  UpDateInfoDoctors,
  getAllCodeApi,
} from "../../../services/userService";
import { toast } from "react-toastify";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      des: "",
      allDoctors: [],
      hasOldData: false,

      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic:[],
      listSpecialty:[],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic:'',
      selectedSpecialty:'',

      nameClinic: "",
      addressClinic: "",
      note: "",
      ClinicId:'',
      SpecialtyId:'',
    };
  }

  async componentDidMount() {
    // let res = await getAllCodeApi('GENDER');
    //     if (res && res.errCode === 0) {
    //         this.setState({
    //             arrGender: res.data
    //         })
    //     }
    //     console.log("gender",res)

    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
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
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice);
      let dataSelectPayment = this.buildDataInputSelect(resPayment);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);
      this.setState({
        allDoctors: allDoctors,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });

    }
    if (preProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let { resPayment, resPrice, resProvince ,resSpecialty,resClinic} =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice);
      let dataSelectPayment = this.buildDataInputSelect(resPayment);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);
      let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty);
      let dataSelectClinic = this.buildDataInputSelect(resClinic);
      console.log('checkccccccccccccccc', this.props)
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic : dataSelectClinic
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

  handleInforDoctor = () => {
    // let abc = 6 || 9 || 3;
    // let abcd = 6 && 9 && 3;
    let updatedState = {
      ...this.state,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      specialtyId: this.state.selectedSpecialty.value,
      clinicId: this.state.selectedClinic.value,
      
    };
    this.props.postSaveInfoDoctorsRedux(updatedState);
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
  handleChange = async (selectedDoctor) => {
    console.log("select doctor", selectedDoctor);
    this.setState({ selectedDoctor });
    let { listPrice,
      listPayment,
      listProvince,listSpecialty,listClinic } = this.state
    let res = await getDetailInfoDoctorByIdApi(selectedDoctor.value);
    console.log('check  api listpayment', listPayment);
    if (res.errCode === 0 && res?.data?.Markdown) {
      let Markdown = res?.data?.Markdown;
      let addressClinic = '', nameClinic = '', note = '', 
      paymentId = '', priceId = '', provinceId =  '', 
      selectedPayment = '', selectedPrice = '' , selectedProvince= '',
      selectedSpecialty='',specialtyId ='',selectedClinic='',clinicId ='';
if (res.data.Doctor_Infor) { 
  addressClinic = res.data.Doctor_Infor.addressClinic; 
  nameClinic = res.data.Doctor_Infor.nameClinic; 
  note = res.data.Doctor_Infor.note; 
  paymentId = res.data.Doctor_Infor.paymentId; 
  priceId = res.data.Doctor_Infor.priceId; 
  provinceId = res.data.Doctor_Infor.provinceId;
  specialtyId = res.data.Doctor_Infor.specialtyId;
  clinicId = res.data.Doctor_Infor.clinicId;
selectedPayment = listPayment.find(item => { return item && item.value === paymentId }) 
selectedPrice = listPrice.find(item => { return item && item.value === priceId }) 
selectedProvince = listProvince.find(item => { return item && item.value === provinceId })} 
selectedSpecialty = listSpecialty.find(item => { return item && item.value === specialtyId})
selectedClinic = listClinic.find(item => { return item && item.value === clinicId})

      console.log("handleChange markdown", Markdown);
      this.setState({
        contentHTML: Markdown.contentHTML,
        contentMarkdown: Markdown.contentMarkdown,
        des: Markdown.des,
        hasOldData: true,
        addressClinic: addressClinic, 
        nameClinic: nameClinic, 
        note: note, 
        selectedPayment: selectedPayment, 
        selectedPrice: selectedPrice, 
        selectedProvince: selectedProvince,
        selectedSpecialty:selectedSpecialty ,
        selectedClinic:selectedClinic
      });
    } else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        hasOldData: false,
        des: "",
        nameClinic: "",
      addressClinic: "",
      note: "",
      });
    }
    console.log("selectdoctor value", res);
  };
  handleOnChangeText = (e, id) => {
    this.setState({
      [id]: e.target.value,
    });
  };
  handleChangeSelectDoctorInfor = async (select, name) => {
    console.log(select, "select");
    console.log(name, "name");
    this.setState({
      [name.name]: select,

    })
  }
  buildDataInputSelect = (data) => {
    let result = [];
    let language = this.props.language;
console.log('check build',data)
    if (data && data.length > 0) {
      if (data[0].lastName) {
        data.map((item, index) => {
          let obj = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.id;
          result.push(obj);
        });
      }
      else if (data[0].image) {
        data.map((item, index) => {
          let obj = {};

          obj.label = item.name;
          obj.value = item.id;
          result.push(obj);
        });
      } else {
        data.map((item, index) => {
          let obj = {};

          obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      }

    }
    return result;
  };
  render() {
    return (
      <>
        {/* {console.log("alldoctors", this.state.allDoctors)} */}
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">
            <FormattedMessage id="admin.manage-doctor.title" />
          </div>
          <div className="more-info">
            <div className="content-left-doctor from-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.allDoctors}
                className="form-control"
                placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />
                }
              />
            </div>
            <div className="content-right-doctor">
              <label>
                <FormattedMessage id="admin.manage-doctor.intro" />
              </label>
              <textarea
                className="form-control"
                rows="4"
                value={this.state.des}
                onChange={(e) => this.handleOnChangeText(e, "des")}
              ></textarea>
            </div>
          </div>
          <div className="more-infor-extra row">
            <div className="col-4 form-group">

              <label><FormattedMessage id="admin.manage-doctor.price" /></label>
              <Select
                options={this.state.listPrice}
                placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                value={this.state.selectedPrice}
                onChange={this.handleChangeSelectDoctorInfor}
                name='selectedPrice'
              />
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
              <Select
                options={this.state.listPayment}
                placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                value={this.state.selectedPayment}
                onChange={this.handleChangeSelectDoctorInfor}
                name='selectedPayment'
              />
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.province" /></label>
              <Select
                options={this.state.listProvince}
                placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                value={this.state.selectedProvince}
                onChange={this.handleChangeSelectDoctorInfor}
                name='selectedProvince'
              />
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
              <input className="form-control"
                value={this.state.nameClinic}
                onChange={(e) => this.handleOnChangeText(e, "nameClinic")}
              />
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
              <input className="form-control"
                onChange={(e) => this.handleOnChangeText(e, "addressClinic")}
                value={this.state.addressClinic} />
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.note" /></label>
              <input className="form-control"
                value={this.state.note}
                onChange={(e) => this.handleOnChangeText(e, "note")}
              />
            </div>
          </div>
          <div className="row"> 
          <div className="col-4 form group">
             <label><FormattedMessage id="admin.manage-doctor.specialty"/> </label>
             <Select 
             value= {this.state.selectedSpecialty} 
             options={this.state.listSpecialty} 
             placeholder={<FormattedMessage id="admin.manage-doctor.specialty"/>} 
             onChange={this.handleChangeSelectDoctorInfor} 
             name="selectedSpecialty" /></div>

<div className="col-4 form-group">
  <label><FormattedMessage id="admin.manage-doctor.select-clinic"/></label> 
  <Select value={this.state.selectedClinic} 
  options={this.state.listClinic} 
  placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic"/>}
   onChange={this.handleChangeSelectDoctorInfor}
   name="selectedClinic"
   />
</div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
        </div>

        <button
          className="Create-content-doctor"
          onClick={() => this.handleInforDoctor()}
        >{this.state.hasOldData ? <FormattedMessage id="admin.manage-doctor.save" /> : <FormattedMessage id="admin.manage-doctor.add" />}

        </button>

      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.Doctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //genderReduxStart: () => dispatch(fetchGenderStart()),
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
    postSaveInfoDoctorsRedux: (data) =>
      dispatch(actions.postSaveInfoDoctorsActions(data)),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
