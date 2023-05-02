import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const HostingTips = () => {

    return (
        <div className='hosting-tips-container'>
                    <div className='tips-header'>
                        Hosting Tips
                    </div>
                    <Swiper
                        slidesPerView={3}
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
                        <button className='left-arrow'><span>❮</span></button>
                        <button className='right-arrow'><span>❯</span></button>
                    </Swiper>
                </div>
    )
}

export default HostingTips;
