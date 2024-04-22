import React, { Component } from 'react';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tuxaImg from "../../../assets/specialty/tuxa.jpg";
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from "react-router";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: []
    }

  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res?.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : []
      })
    }
  }
  handleViewDetailSpecialty = (item) => {
    this.props.history.push(`/detail-specialty/${item.id}`)
  }
  render() {
    let { dataSpecialty } = this.state;
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,

    };

    return (
      // react-slick
      <div className='section-specialty'>
        <div className='specialty-container'>
          <div className='specialty-header'>
            <span className='title-section'>
              <FormattedMessage id='homepage.specialty-poplular' />
            </span>
            <button className='btn-section'>
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className='specialty-body'>
            <Slider {...settings}>
              
              {dataSpecialty?.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div className="img-cus" key={index}
                    onClick={() => this.handleViewDetailSpecialty(item)}>
                      <img className="bg-image "
                        src={item.image} />
                      <div className="specialty-name">{item.name}</div>
                    </div>
                  )
                }
                )
              }
            </Slider>
          </div>

        </div>
      </div>

    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,

  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
