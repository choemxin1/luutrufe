
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import "./DetailSpecialty.scss";
import { FormattedMessage } from "react-intl";
import ScheduleDoctor from "../Doctor/ScheduleDoctor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import HomeHeader from "../../HomePage/HomeHeader";
import { getAllDoctors } from "../../../services/userService";
import { getAllCodeApi, getAllDetailSpecialtyById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import _ from "lodash";
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: [],
            listProvince: [],

        };
    }
    async componentDidMount() {
        if (this.props.match?.params?.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });
            let resProvince = await getAllCodeApi("PROVINCE");
            if (res?.errCode === 0 && resProvince?.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr?.length > 0) {
                        arr.map((item, index) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince?.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn quốc",
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })



            }
        }
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
    handleOnChangeSelect = async (event) => {
        if (this.props.match?.params?.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: location
            });
            if (res?.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                });
            }
        }
    }
    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="detail-specialty-container" >
                    <HomeHeader />
                    <div className="detail-specialty-body">
                        <div className="description-spceialty">
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>
                                </div>
                            }
                        </div>
                        <div className="search-sp-doctor">
                            <select
                            onChange={(event) => this.handleOnChangeSelect(event)}
                            >
                                {listProvince?.length > 0 && listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>)
                                })
                                }
                            </select>
                        </div>
                        {arrDoctorId.length > 0 && arrDoctorId.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                            isShowPrice = {false}
                                            isShowLinkDetail = {true}
                                                doctorId={item}
                                                isShowDescriptionDoctor={true} />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schdule">
                                            <ScheduleDoctor
                                                doctorIdFromParent={item} />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item} />
                                        </div>
                                    </div>
                                </div>)
                        })}
                    </div>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
