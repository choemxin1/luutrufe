import React, { Component } from 'react';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import handbook from "../../../assets/Handbook/handbook.png"
class Handbook extends Component {
    

    render() {
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
                <span className='title-section'> Cẩm nang</span>
                <button className='btn-section'>xem thêm</button>
            </div>
            <div className='specialty-body'>
            <Slider {...settings}>
      <div className='img-cus'>
        <img src={handbook}/>
        <div>từ xa 1</div>
      </div>
      <div className='img-cus'>
      <img src={handbook}/>
        <div>từ xa 2</div>
      </div>
      <div className='img-cus'>
      <img src={handbook}/>
        <div>từ xa 3</div>
      </div>
      <div className='img-cus'>
      <img src={handbook}/>
        <div>từ xa 4</div>
      </div>
      <div className='img-cus'>
      <img src={handbook}/>
        <div>từ xa 5</div>
      </div>
      <div className='img-cus'>
      <img src={handbook}/>
        <div>từ xa 6</div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
