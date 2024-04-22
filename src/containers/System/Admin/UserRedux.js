import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeApi } from "../../../services/userService";
import { LANGUAGES, CommonUtils } from "../../../utils";
//import { changeLanguageApp } from '../../store/actions/appActions';
import { fetchGenderStart, fetchPositionStart, fetchRoleStart } from "../../../store/actions";
import "./UserRedux.scss"
import * as actions from "../../../store/actions"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';





const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrGender: [],
      arrPosition: [],
      arrRole: [],
      previewImgURL: '',
      isOpen: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phonenumber: '',
      address: '',
      gender: '',
      positionID: '',
      roleId: '',
      image: '',
      arrUsers: [],
      isEditUser: false,
      user: {}
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
    await this.props.genderReduxStart();
    await this.props.fetchPositionStart();
    await this.props.fetchRoleStart();
    await this.props.readUserRedux();// có chức năng cập nhật giá trị state.admin.user trong redux
    
  }
  componentDidUpdate(preProps, preState, snapshot) {
    if (preProps.genderRedux !== this.props.genderRedux) {// có chức năng kiểm tra khi  nào props cập nhật giá trị
      this.setState({
        arrGender: this.props.genderRedux
      })
    }
    if (preProps.positionRedux !== this.props.positionRedux) {// có chức năng kiểm tra khi  nào props cập nhật giá trị
      this.setState({
        arrPosition: this.props.positionRedux
      })
    }
    if (preProps.roleRedux !== this.props.roleRedux) {// có chức năng kiểm tra khi  nào props cập nhật giá trị
      this.setState({
        arrRole: this.props.roleRedux,

      })
    }
    if (preProps.arrUsers !== this.props.arrUsers) {
      this.setState({
        arrUsers: this.props.arrUsers,
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phonenumber: '',
        address: '',
        gender: '',
        positionID: '',
        roleId: '',
        previewImgURL: '',
        isEditUser: false
      })
    }
  }
  
  handleOnchangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log('file chưa đổi',file)
      console.log('file hình ảnh', base64)
      let Object = URL.createObjectURL(file);
      if(this.state.isEditUser) {
        this.setState(preState => ({
          previewImgURL: Object,
          user: {
            ...preState.user,
            image: base64
          }
        }))
      } else {
        this.setState({
          previewImgURL: Object,
          image: base64
        })
      }
      
    }
  }
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true
    })
  }
  handleOnChange = (e, id) => {
    if (this.state.isEditUser) {
      this.setState(preState => ({
        user: {
          ...preState.user,
          [id]: e.target.value
        }
      }))
    } else {
      this.setState({ [id]: e.target.value })

    }

  }
  checkValideInput = () => {
    let check = true;
    let arrInput = ['email', 'password', 'firstName', 'lastName', 'phonenumber', "address", 'gender', 'positionID', 'roleId']
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        check = false;
        alert('missing ' + arrInput[i]);
        break;
      }
    }
    return check;
  }
  test = () => {


    if (this.state.isEditUser) {
      console.log('test nộp update', this.state.user);
      this.props.editUserRedux(this.state.user);

      this.setState({
        isEditUser: false

      })

    } else {
      let check = this.checkValideInput();
      if (check) {
        console.log('test tạo',this.state)
        this.props.createNewUserRedux(this.state);
        this.setState({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phonenumber: '',
          address: '',
          gender: '',
          positionID: '',
          roleId: ''
        })

      }
    }

  }
  handleModalEditUser = () => {
    this.setState({
      isOpenModalEdit: !this.state.isOpenModalEdit
    })
  }
  handleDeleteUser = async (userId) => {
    await this.props.deleteUserRedux(userId);
  }
  handleEditUserBtn = (userInfo) => {//nhấn vào nút edit
    let imageBase64 = '';
    if (userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, 'base64').toString('binary');
    }
    this.setState({
      user: {
        ...userInfo,
        image: imageBase64
      },
      isEditUser: true,
      previewImgURL: imageBase64
    })
    console.log("editRedux", userInfo)
    
  }
  
  render() {
    let language = this.props.language;

    let { arrGender, arrPosition, arrRole, arrUsers } = this.state
    return (

      <>
        
        <div className="text-center">Manage products</div>

        <div className="user-redux-body">
          <div className="container">
            {this.state.isEditUser ? (
              <div className="row">
                <div className="form-row">
                  <div className="form-group col-3">
                    <label for="inputEmail4"><FormattedMessage id='manage-user.email' /></label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Email"
                      value={this.state.user.email}
                      disabled
                    />
                  </div>
                  <div className="form-group col-3">
                    <label for="inputPassword4"><FormattedMessage id='manage-user.password' /></label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Password"
                      value={'abc'}
                      disabled
                    />
                  </div>
                  <div className="form-group col-3">
                    <label for="inputPassword4"><FormattedMessage id='manage-user.first-name' /></label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.user.firstName}
                      onChange={(e) => { this.handleOnChange(e, 'firstName') }}

                    />
                  </div>
                  <div className="form-group col-3">
                    <label for="inputPassword4"><FormattedMessage id='manage-user.last-name' /></label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.user.lastName}
                      onChange={(e) => { this.handleOnChange(e, 'lastName') }}

                    />
                  </div>
                  <div className="form-group col-3">
                    <label for="inputPassword4"><FormattedMessage id='manage-user.Phone-number' /></label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.user.phonenumber}
                      onChange={(e) => { this.handleOnChange(e, 'phonenumber') }}

                    />
                  </div>
                  <div className="form-group col-9">
                    <label for="inputPassword4"><FormattedMessage id='manage-user.address' /></label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.user.address}
                      onChange={(e) => { this.handleOnChange(e, 'address') }}

                    />
                  </div>

                  <div className="form-group col-3">
                    <label for="inputState"><FormattedMessage id='manage-user.gender' /></label>
                    <select id="inputState" className="form-control"

                      onChange={(e) => { this.handleOnChange(e, 'gender') }}
                      value={this.state.user.gender}
                    >

                      <option>choose....</option>
                      {arrGender && arrGender.map((item, index) => {
                        return (

                          <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                        )
                      })}


                    </select>
                  </div>
                  <div className="form-group col-3">
                    <label for="inputState"><FormattedMessage id='manage-user.position' /></label>
                    <select className="form-control "
                      onChange={(e) => { this.handleOnChange(e, 'positionID') }}
                      value={this.state.user.positionID}
                    >
                      <option>choose....</option>
                      {arrPosition && arrPosition.map((item, index) => {
                        return (

                          <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                        )
                      })}

                    </select>
                  </div>
                  <div className="form-group col-3">
                    <label for="inputState"><FormattedMessage id='manage-user.role' /></label>
                    <select className="form-control"
                      onChange={(e) => { this.handleOnChange(e, 'roleId') }}
                      value={this.state.user.roleId}
                    >
                      <option>choose....</option>
                      {arrRole && arrRole.map((item, index) => {
                        return (

                          <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                        )
                      })}

                    </select>
                  </div>
                  <div className="form-group col-3">
                    <label for="inputPassword4"><FormattedMessage id='manage-user.image' /></label>
                    <div className="preview-img-container">
                      <input
                        type="file"
                        className="form-control"
                        hidden
                        onChange={(e) => this.handleOnchangeImage(e)}
                        id="previewImg"
                      />
                      <label className="label-upload" htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                      <div className="preview-image"
                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                        onClick={() => this.openPreviewImage()}></div>
                    </div>

                  </div>
                </div>

                <button type="submit" className="btn btn-warning mt-3 width-btn"
                  onClick={() => { this.test() }}
                >
                  {/* <FormattedMessage id='manage-user.Save' /> */} Lưu thay đổi
                </button>

              </div>) : (
              <div className="row">
                <div className="form-row">
                  <div className="form-group col-3">
                    <label for="inputEmail4"><FormattedMessage id='manage-user.email' /></label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={(e) => { this.handleOnChange(e, 'email') }}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label for="inputPassword4"><FormattedMessage id='manage-user.password' /></label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(e) => { this.handleOnChange(e, 'password') }}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label for="inputPassword4"><FormattedMessage id='manage-user.first-name' /></label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={(e) => { this.handleOnChange(e, 'firstName') }}

                    />
                  </div>
                  <div className="form-group col-3">
                    <label for="inputPassword4"><FormattedMessage id='manage-user.last-name' /></label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={(e) => { this.handleOnChange(e, 'lastName') }}

                    />
                  </div>
                  <div className="form-group col-3">
                    <label for="inputPassword4"><FormattedMessage id='manage-user.Phone-number' /></label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.phonenumber}
                      onChange={(e) => { this.handleOnChange(e, 'phonenumber') }}

                    />
                  </div>
                  <div className="form-group col-9">
                    <label for="inputPassword4"><FormattedMessage id='manage-user.address' /></label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.address}
                      onChange={(e) => { this.handleOnChange(e, 'address') }}

                    />
                  </div>

                  <div className="form-group col-3">
                    <label for="inputState"><FormattedMessage id='manage-user.gender' /></label>
                    <select id="inputState" className="form-control"
                      value={this.state.gender}
                      onChange={(e) => { this.handleOnChange(e, 'gender') }}
                    >

                      <option>choose....</option>
                      {arrGender && arrGender.map((item, index) => {
                        return (

                          <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                        )
                      })}


                    </select>
                  </div>
                  <div className="form-group col-3">
                    <label for="inputState"><FormattedMessage id='manage-user.position' /></label>
                    <select className="form-control "
                      onChange={(e) => { this.handleOnChange(e, 'positionID') }}
                      value={this.state.positionID}
                    >
                      <option>choose....</option>
                      {arrPosition && arrPosition.map((item, index) => {
                        return (

                          <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                        )
                      })}

                    </select>
                  </div>
                  <div className="form-group col-3">
                    <label for="inputState"><FormattedMessage id='manage-user.role' /></label>
                    <select className="form-control"
                      onChange={(e) => { this.handleOnChange(e, 'roleId') }}
                      value={this.state.roleId}
                    >
                      <option>choose....</option>
                      {arrRole && arrRole.map((item, index) => {
                        return (

                          <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                        )
                      })}

                    </select>
                  </div>
                  <div className="form-group col-3">
                    <label for="inputPassword4"><FormattedMessage id='manage-user.image' /></label>
                    <div className="preview-img-container">
                      <input
                        type="file"
                        className="form-control"
                        hidden
                        onChange={(e) => this.handleOnchangeImage(e)}
                        id="previewImg"
                      />
                      <label className="label-upload" htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                      <div className="preview-image"
                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                        onClick={() => this.openPreviewImage()}></div>
                    </div>

                  </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3 width-btn"
                  onClick={() => { this.test() }}
                >
                  <FormattedMessage id='manage-user.Save' />
                </button>

              </div>)}

          </div>
        </div>
        {this.state.isOpen === true &&
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}></Lightbox>
        }
        <div className='mt-3 mx-1'>

          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Id</th>
              <th>Action</th>
            </tr>

            {arrUsers && arrUsers.map((item, index) => {
              return (
                <tr>
                  <td>{item.email}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td>{item.id}</td>
                  <td>
                    <button className="btn-edit"
                      onClick={() => this.handleEditUserBtn(item)}
                    >Edit</button>
                    <button className="btn-edit"
                      onClick={() => this.handleDeleteUser(item.id)}
                    >Delete</button>
                  </td>
                </tr>
              )
            })}
          </table>
        </div>
        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
      </>
    );
  }
  // render ( ) {
  //   return (
  //     <h1>abc</h1>
  //   )
  // }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    arrUsers: state.admin.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    genderReduxStart: () => dispatch(fetchGenderStart()),
    fetchPositionStart: () => dispatch(fetchPositionStart()),
    fetchRoleStart: () => dispatch(fetchRoleStart()),
    createNewUserRedux: (data) => dispatch(actions.createNewUserReduxActions(data)),
    readUserRedux: () => dispatch(actions.readUserReduxActions()),
    deleteUserRedux: (userId) => dispatch(actions.deleteUserReduxActions(userId)),
    editUserRedux: (user) => dispatch(actions.editUserReduxActions(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);








