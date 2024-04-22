import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "123tk",
      password: "456mk",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };
  handleOnChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
        console.log(data);
      }
      if (data.errCode == 0) {
        this.props.userLoginSuccess(data.user);
        console.log(" login Success");
        console.log(data);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
      console.log(e.response.data.message);
      console.log(e.response.data);
      console.log(e);
    }
  };
  handleShowHidePassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>

            <div className="col-12 form-group login-input">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={this.state.username}
                onChange={(e) => this.handleOnChangeUsername(e)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password</label>
              <input
                type={this.state.isShowPassword ? "text" : "password"}
                className="form-control"
                value={this.state.password}
                onChange={(e) => this.handleOnChangePassword(e)}
              />
              <i
                onClick={() => this.handleShowHidePassword()}
                className={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"}
              ></i>
            </div>
            <div className="col-12" style={{ color:'red'}}>{this.state.errMessage}</div>
            <div className="col-12">
              <button  className="btn-login" onClick={() => this.handleLogin()}>Login</button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot password</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
