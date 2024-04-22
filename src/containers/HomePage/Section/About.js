import React, { Component } from 'react';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

class About extends Component {


    render() {


        return (
            <>
                <div className='section-about-header'>
                    Truyền thông nói về bookingcare
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/f2o7KKnYCIg"
                            title="Best Chill English Acoustic Love Songs of All Time 💖 Top Hits Acoustic Covers of Popular Songs 2023" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        Trong những năm tháng ấy, bom đạn của bọn Mỹ có sức công phá quá ghê gớm nên hầu như chiếc xe nào của binh đoàn cũng rụng và vỡ hết kính. Nếu như còn sót lại thì cũng chỉ là những mảnh kính vỡ. Cửa giờ toang hoác nên thiên nhiên như ùa vào để những người lính như chúng tôi tận hưởng vậy. Dù có nguy hiểm, vất vả nhưng chúng tôi vẫn ung dung quả cảm, vẫn hàng ngày lái những chiếc xe tiếp tế ra chiến trường vì tổ quốc thân yêu.
                    </div>
                </div>
            </>
            // react-slick

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

export default connect(mapStateToProps, mapDispatchToProps)(About);
