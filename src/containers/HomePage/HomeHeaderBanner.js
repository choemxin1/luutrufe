import React, { Component } from 'react';

import { connect } from 'react-redux';
import  './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../utils";
import { changeLanguageApp } from '../../store/actions/appActions';
class HomeHeaderBanner extends Component {
    changeLanguage = (language) => {
        console.log('props',this.props)
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language;

        return (<React.Fragment>
            
            <div className='home-header-banner'>
                <div className='content-up'>
                <div className='title1'><FormattedMessage id="banner.Title1"/></div>
                <div className='title2'><FormattedMessage id="banner.Title2"/></div>
                <div className='search'>
                    <i className='fas fa-search'></i>
                    <input type='text' placeholder='Tìm chuyên khoa'/>
                </div>
                </div>
                <div className='content-down'>
                    <div className='options'>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className='far fa-hospital'></i>
                            </div>
                            <div className='text-child'>
                            <FormattedMessage id="banner.Child1"/>
                            </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className='far fa-hospital'></i>
                            </div>
                            <div className='text-child'>
                            <FormattedMessage id="banner.Child2"/> 
                            </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className='far fa-hospital'></i>
                            </div>
                            <div className='text-child'>
                            <FormattedMessage id="banner.Child3"/>
                            </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className='far fa-hospital'></i>
                            </div>
                            <div className='text-child'>
                            <FormattedMessage id="banner.Child4"/>
                            </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className='far fa-hospital'></i>
                            </div>
                            <div className='text-child'>
                            <FormattedMessage id="banner.Child5"/>
                            </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <i className='far fa-hospital'></i>
                            </div>
                            <div className='text-child'>
                            <FormattedMessage id="banner.Child6"/>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </React.Fragment>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language:state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeaderBanner);
