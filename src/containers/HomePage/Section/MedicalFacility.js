import React, { Component } from 'react';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import medical from '../../../assets/medical/medical.png';
import { withRouter } from 'react-router-dom';
import { getAllClinic } from '../../../services/userService';
class MedicalFacility extends Component {
  constructor(props) {
    super(props); this.state = {
      dataClinics: []
    }
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res?.errcode === 0) {
      this.setState({ dataClinics: res.data ? res.data : [] })
    }
  }
  handleViewDetailClinic = (item) => {
    this.props.history?.push(`/detail-clinic/${item.id}`)
  }
  render() {
    let {dataClinics} = this.state;
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
            <span className='title-section'> Cơ sở y tế nổi bật</span>
            <button className='btn-section'>xem thêm</button>
          </div>
          <div className='specialty-body'>
            <Slider {...settings}>
              <div className='img-cus'>
                <img src={medical} />
                <div>bệnh viện 1</div>
              </div>
              {dataClinics?.length> 0  && dataClinics.map((item, index) => {
                 return ( 
                  <div className="img-cus" key={index}
                    onClick={() => this.handleViewDetailClinic(item)}>
                      <img className="bg-image "
                        src={item.image} />
                      <div className="specialty-name">{item.name}</div>
                    </div>
                 )}
              )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));

