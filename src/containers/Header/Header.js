import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu,doctorMenu } from './menuApp';
import './Header.scss';
import {LANGUAGES,USER_ROLE} from "../../utils";
import { changeLanguageApp } from '../../store/actions/appActions';
import { FormattedMessage } from 'react-intl';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp :[]
        }
    }
    changeLanguage = (language) => {
        // console.log('props',this.props)
        this.props.changeLanguageAppRedux(language)
    }
    componentDidMount() {
        console.log('sdfsdfsdf',this.props.userInfo)
        let {userInfo} = this.props;
        if ( userInfo?.roleId === USER_ROLE.Admin) {
            this.setState({
                menuApp:adminMenu
            })
        } else if( userInfo?.roleId === USER_ROLE.Doctor) {
            this.setState({
                menuApp:doctorMenu
            })
        }
    }
    render() {
        const { processLogout ,language,userInfo } = this.props;
        
        return (
            <div className="header-container">
                {/* thanh navigator */}
                {/* {console.log('header',this.props.userInfo)} */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
            <div className='languages'>
                <span className='welcome'><FormattedMessage id="homeheader.welcome"/>,
                {userInfo && userInfo.firstName ? userInfo.firstName: ''}!</span>
            <span className={language === LANGUAGES.VI ? 'language-vi active' :'language-vi'}>
                <span onClick={() =>this.changeLanguage(LANGUAGES.VI)}>VN</span>
            </span>
            <span className={language === LANGUAGES.EN ? 'language-en active' :'language-en'}>
                <span onClick={() =>this.changeLanguage(LANGUAGES.EN)}>EN</span>
            </span>
             {/* nút logout */}
             <div className="btn btn-logout" onClick={processLogout} title='log out'>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
               
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language:state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
