import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
                <button className='left-arrow'>❮</button>
                <button className='right-arrow'>❯</button>
            </div>
        </Swiper>
    )
}

export default HomeImages;
