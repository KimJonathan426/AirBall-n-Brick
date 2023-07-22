import { useEffect, useState } from 'react';
import { csrfFetch } from '../../../../store/csrf';
import '../Steps.css';
import './Step2Amenities.css';

const Step2Amenities = ({ amenities, setAmenities }) => {

    const [delayed,] = useState(500);
    const [basicAmenities, setBasicAmenities] = useState([]);
    const [standoutAmenities, setStandoutAmenities] = useState([]);
    const [safetyAmenities, setSafetyAmenities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await csrfFetch('/api/amenities');

            if (response.ok) {
                const data = await response.json();

                const basic = [];
                const standout = [];
                const safety = [];

                for (const amenity of data.amenities) {
                    // default case to do nothing not needed
                    // eslint-disable-next-line
                    switch (amenity.type) {
                        case 'basic':
                            basic.push(amenity);
                            break;
                        case 'standout':
                            standout.push(amenity);
                            break;
                        case 'safety':
                            safety.push(amenity);
                            break;
                    };
                };

                setBasicAmenities(basic);
                setStandoutAmenities(standout);
                setSafetyAmenities(safety);
            };
        };

        fetchData();
    }, []);

    const handleClick = (value) => {
        if (amenities.has(value)) {
            setAmenities(prev => {
                prev.delete(value);
                return new Set(prev);
            });
        } else {
            setAmenities(prev => new Set(prev.add(value)));
        };
    };


    return (
        <div className='host-step-container-start'>
            <div className='host-step-container-inner-start'>
                <div className='host-step-top'>
                    <h1 className='host-step-header'>Tell guests what your court has to offer</h1>
                    <div className='host-step-subheader'>You can add more amenities after you publish your listing.</div>
                </div>
                <div>
                    <div className='step-2-amenities-bottom'>
                        {basicAmenities.map((option, i) => (
                            <div key={option.id} className='step-2-amenities-main' style={{ animationDelay: `${delayed * (1.00 + (.065 - .002 * i) * i)}ms` }}>
                                <button className={amenities.has(option.name) ? 'step-2-amenities-btn-checked' : 'step-2-amenities-btn'} onClick={() => handleClick(option.name)}>
                                    <div style={{ height: '45px' }}>
                                        <img src={option.url} alt='icon' />
                                    </div>
                                    <div className='step-2-amenities-text'>{option.name}</div>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='step-2-amenities-list-header standout-amenities' style={{ animationDelay: '700ms' }}>
                        Do you have any standout amenities?
                    </div>
                    <div className='step-2-amenities-bottom'>
                        {standoutAmenities.map((option, i) => (
                            <div key={option.id} className='step-2-amenities-main' style={{ animationDelay: `${delayed * (1.00 + (.065 - .002 * i) * (i + 7))}ms` }}>
                                <button className={amenities.has(option.name) ? 'step-2-amenities-btn-checked' : 'step-2-amenities-btn'} onClick={() => handleClick(option.name)}>
                                    <div style={{ height: '45px' }}>
                                        <img src={option.url} alt='icon' />
                                    </div>
                                    <div className='step-2-amenities-text'>{option.name}</div>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='step-2-amenities-list-header' style={{ animationDelay: '885ms' }}>
                        Do you have any of these safety items?
                    </div>
                    <div className='step-2-amenities-bottom'>
                        {safetyAmenities.map((option, i) => (
                            <div key={option.id} className='step-2-amenities-main' style={{ animationDelay: `${delayed * (1.00 + (.065 - .002 * i) * (i + 12))}ms` }}>
                                <button className={amenities.has(option.name) ? 'step-2-amenities-btn-checked' : 'step-2-amenities-btn'} onClick={() => handleClick(option.name)}>
                                    <div style={{ height: '45px' }}>
                                        <img src={option.url} alt='icon' />
                                    </div>
                                    <div className='step-2-amenities-text'>{option.name}</div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2Amenities;
