import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import swiperLeft from '../../images/swiper-left.svg';
import swiperRight from '../../images/swiper-right.svg';

const HomeImages = ({ images }) => {

    return (
        <Swiper
            cssMode={true}
            navigation={{
                prevEl: '.left-arrow',
                nextEl: '.right-arrow',
            }}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="swipe-wrapper"
        >
            <SwiperSlide className='preview-slide'>
                <div className='spot-image'>
                    <img className='center' src={images[0].url} alt='listing preview' />
                </div>
            </SwiperSlide>
            <SwiperSlide className='preview-slide'>
                <div className='spot-image'>
                    <img className='center' src={images[1].url} alt='listing preview' />
                </div>            </SwiperSlide>
            <SwiperSlide className='preview-slide'>
                <div className='spot-image'>
                    <img className='center' src={images[2].url} alt='listing preview' />
                </div>            </SwiperSlide>
            <SwiperSlide className='preview-slide'>
                <div className='spot-image'>
                    <img className='center' src={images[3].url} alt='listing preview' />
                </div>            </SwiperSlide>
            <SwiperSlide className='preview-slide'>
                <div className='spot-image'>
                    <img className='center' src={images[4].url} alt='listing preview' />
                </div>            </SwiperSlide>
            <div className='image-switch-btns'>
                <button className='left-arrow'><img src={swiperLeft} alt='left arrow' /></button>
                <button className='right-arrow'><img src={swiperRight} alt='right arrow' /></button>
            </div>
        </Swiper>
    )
}

export default HomeImages;
