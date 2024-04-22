
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./VerifyEmail.scss";
import { FormattedMessage } from "react-intl";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        };
    }
    handleOnChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    };
    handleOnChangePassword = (e) => {
        this.setState({ password: e.target.value });
    };
   
    handleShowHidePassword = () => {
        this.setState({ isShowPassword: !this.state.isShowPassword });
    };
    async componentDidMount() {
        if (this.props.location?.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({ token: token, doctorId: doctorId })
            if (res?.errCode === 0) {
                this.setState({
                    statusVerify: true, errcode: res.errCode
                })
            } else {
                this.setState({
                    errcode: res?.errCode ? res.errCode : -1,
                    statusVerify: true
                })
            }
        }
    }

    render() {
        let { statusVerify, errcode } = this.state;
        return (
            <><HomeHeader />
                <div className="verify-email-container">
                    {statusVerify === false ?
                        <div> Loading data... </div>
                        :

                        <div>
                            {+errcode === 0 ?
                                <div className="infor-booking"> Xac nhO lich hen thành công</div>
                                :
                                <div className="infor-booking">lịch hẹn không tồn tại hoặc đã được xác nhận</div>
                            }
                        </div>

                    }
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
