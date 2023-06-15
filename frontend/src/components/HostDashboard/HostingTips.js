import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import swiperLeft from '../../images/swiper-left.svg';
import swiperRight from '../../images/swiper-right.svg';

const HostingTips = () => {

    const [width, setWidth] = useState(window.innerWidth)
    const [slides, setSlides] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    useEffect(() => {
        if (width < 611) {
            setSlides(1);
        } else if (width < 911) {
            setSlides(2);
        } else if (width < 1211) {
            setSlides(3);
        } else {
            setSlides(4);
        }
    }, [width])

    return (
        <div className='hosting-tips-container'>
            <div className='hosting-tips-main'>
                <div className='tips-header'>
                    Hosting Tips
                </div>
                <Swiper
                    slidesPerView={slides}
                    spaceBetween={16}
                    navigation={{
                        prevEl: '.left-arrow',
                        nextEl: '.right-arrow',
                    }}
                    modules={[Navigation]}
                    className="tips-list"
                >
                    <SwiperSlide>
                        <li className='tip-box'>
                            <div className='tip-image'>
                                <img src='https://airballnbrick.s3.amazonaws.com/Luxury-court-landscape.jpg' alt='exotic court' />
                                <div className='tip-info'>Make your court stand out</div>
                            </div>
                        </li>
                    </SwiperSlide>
                    <SwiperSlide>
                        <li className='tip-box'>
                            <div className='tip-image'>
                                <img src='https://airballnbrick.s3.amazonaws.com/basketball-dunk-landscape.PNG' alt='mid dunk poster' />
                            </div>
                            <div className='tip-info'>Show great photos of your court</div>
                        </li>
                    </SwiperSlide>
                    <SwiperSlide>
                        <li className='tip-box'>
                            <div className='tip-image'>
                                <img src='https://airballnbrick.s3.amazonaws.com/warm-court-landscape.jpg' alt='warm basketball court' />
                            </div>
                            <div className='tip-info'>Write a great listing description</div>
                        </li>
                    </SwiperSlide>
                    <SwiperSlide>
                        <li className='tip-box'>
                            <div className='tip-image'>
                                <img src='https://airballnbrick.s3.amazonaws.com/basketball-group-landscape.jpg' alt='players talking' />
                            </div>
                            <div className='tip-info'>Create a great experience for your customers</div>
                        </li>
                    </SwiperSlide>
                    <button className='left-arrow'><img src={swiperLeft} alt='left arrow' /></button>
                    <button className='right-arrow'><img src={swiperRight} alt='right arrow' /></button>
                </Swiper>
            </div>
        </div>
    )
}

export default HostingTips;
