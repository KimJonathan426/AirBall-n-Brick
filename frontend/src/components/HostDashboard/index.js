import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import './HostDashboard.css';

const HostDashboard = () => {

    return (
        <div className='hosting-container'>
            <div className='hosting-content'>
                <div className='hosting-introduction'>
                    <h2 className='hosting-header'>
                        Hosting Dashboard
                    </h2>
                    <h4 className='hosting-sub-header'>
                        View and manage your listings.
                    </h4>
                </div>
                <div className='hosting-reservations'>

                </div>
                <div className='hosting-tips-container'>
                    <div className='tips-header'>
                        Hosting Tips
                    </div>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={16}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
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
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default HostDashboard;
