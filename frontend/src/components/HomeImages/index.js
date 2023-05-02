import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

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
            className="spot-image"
        >
            <SwiperSlide className='preview-slide'>
                <img className='center' src={images[0].url} alt='listing preview' />
            </SwiperSlide>
            <SwiperSlide className='preview-slide'>
                <img className='center' src={images[1].url} alt='listing preview' />
            </SwiperSlide>
            <SwiperSlide className='preview-slide'>
                <img className='center' src={images[2].url} alt='listing preview' />
            </SwiperSlide>
            <SwiperSlide className='preview-slide'>
                <img className='center' src={images[3].url} alt='listing preview' />
            </SwiperSlide>
            <SwiperSlide className='preview-slide'>
                <img className='center' src={images[4].url} alt='listing preview' />
            </SwiperSlide>
            <div className='image-switch-btns'>
                <button className='left-arrow'><span>❮</span></button>
                <button className='right-arrow'><span>❯</span></button>
            </div>
        </Swiper>
    )
}

export default HomeImages;
