import React, { Component } from 'react';

import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import'./HomePage.scss'
import HomeFooter from './HomeFooter';
import HomeHeaderBanner from './HomeHeaderBanner';
class HomePage extends Component {

    render() {
        

        return (
            <>
            <HomeHeader/>
            <HomeHeaderBanner/>
            <Specialty/>
            <MedicalFacility/>
            <OutStandingDoctor/>
            <Handbook/>
            <About/>
            <HomeFooter/>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
