import { useEffect, useState } from 'react';
import { csrfFetch } from '../../../../store/csrf';
import '../Steps.css';
import './Step2Amenities.css';

const AmenitiesEdit = ({ amenities, setAmenities }) => {

    const [allAmenities, setAllAmenities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await csrfFetch('/api/amenities');

            if (response.ok) {
                const data = await response.json();
                setAllAmenities(data.amenities);
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
        <div className='spot-edit-amenities-container'>
            <h1 className='spot-edit-amenities-header'>Amenities</h1>
            <div className='spot-edit-amenities-bottom'>
                {allAmenities.map(option => (
                    <div key={option.id} className='spot-edit-amenities-main'>
                        <button className={amenities.has(option.name) ? 'spot-edit-amenities-btn-checked' : 'spot-edit-amenities-btn'} onClick={() => handleClick(option.name)}>
                            <img src={option.url} style={{ width: '18px', marginRight: '8px' }} alt='icon' />
                            <div className='spot-edit-amenities-text'>{option.name}</div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AmenitiesEdit;
