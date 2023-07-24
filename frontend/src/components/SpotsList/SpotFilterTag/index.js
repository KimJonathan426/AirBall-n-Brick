import { useEffect, useState } from 'react';
import { csrfFetch } from '../../../store/csrf';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { ReactComponent as ShowAll } from '../../../images/show-photos.svg';
import swiperLeft from '../../../images/swiper-left.svg';
import swiperRight from '../../../images/swiper-right.svg';
import "swiper/css";
import "swiper/css/navigation";
import './SpotFilterTag.css';

const SpotFilterTag = ({ filter, setFilter }) => {

    const [tagCombos, setTagCombos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await csrfFetch('/api/tags');

            if (response.ok) {
                const data = await response.json();
                setTagCombos(data.tags);
            };
        };

        fetchData();
    }, []);

    const swiperBreakpoints = {
        325: {
            slidesPerView: 3,
            slidesPerGroup: 3,
        },
        400: {
            slidesPerView: 4,
            slidesPerGroup: 4,
        },
        500: {
            slidesPerView: 5,
            slidesPerGroup: 5,
        },
        650: {
            slidesPerView: 6,
            slidesPerGroup: 6,
        },
        800: {
            slidesPerView: 7,
            slidesPerGroup: 7,
        },
        1000: {
            slidesPerView: 8,
            slidesPerGroup: 8,
        },
        1200: {
            slidesPerView: 9,
            slidesPerGroup: 9,
        },
        1300: {
            slidesPerView: 10,
            slidesPerGroup: 10,
        },
        1500: {
            slidesPerView: 11,
            slidesPerGroup: 11,
        },
        1700: {
            slidesPerView: 12,
            slidesPerGroup: 12,
        },
        1900: {
            slidesPerView: 13,
            slidesPerGroup: 13,
        },
        2100: {
          slidesPerView: 14,
          slidesPerGroup: 14,
        },
        2300: {
          slidesPerView: 15,
          slidesPerGroup: 15,
        },
      };


    return (
        <div className='filter-tags-container'>
            <Swiper
            slidesPerView={2}
            slidesPerGroup={2}
                navigation={{
                    prevEl: '.left-arrow',
                    nextEl: '.right-arrow',
                }}
                modules={[Navigation]}
                breakpoints={swiperBreakpoints}
                className="filter-list"
            >
                <SwiperSlide>
                    <div className={filter === 'All' ? 'filter-tags-option-checked' : 'filter-tags-option'}>
                        <button className='filter-tags-btn' onClick={() => setFilter('All')}>
                            <ShowAll className='filter-tags-img' />
                            <div className={filter === 'All' ? 'filter-tags-text-checked' : 'filter-tags-text'}>All spots</div>
                        </button>
                    </div>
                </SwiperSlide>
                {tagCombos.map((option) => (
                    <SwiperSlide key={option.id}>
                        <div className={filter === option.name ? 'filter-tags-option-checked' : 'filter-tags-option'}>
                            <button className='filter-tags-btn' onClick={() => setFilter(option.name)}>
                                <img src={option.url} className='filter-tags-img' alt='court ag icon' />
                                <div className={filter === option.name ? 'filter-tags-text-checked' : 'filter-tags-text'}>{option.name}</div>
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
                <button style={{ left: '1px' }} className='left-arrow'><img src={swiperLeft} alt='left arrow' /></button>
                <button style={{ right: '1px' }} className='right-arrow'><img src={swiperRight} alt='right arrow' /></button>
            </Swiper>
        </div>
    );
};

export default SpotFilterTag;
