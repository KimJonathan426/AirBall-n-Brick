import { useEffect, useState } from 'react';
import { ReactComponent as ClearX } from '../../images/clear-x-thin.svg';
import TagsEdit from '../HostSpot/Steps/Step1Tags/TagsEdit';
import LocationEdit from '../HostSpot/Steps/Step1Location/LocationEdit';
import './SpotEditForm.css';
import AmenitiesEdit from '../HostSpot/Steps/Step2Amenities/AmenitiesEdit';
import TypeEdit from '../HostSpot/Steps/Step1Type/TypeEdit';
import DescriptionEdit from '../HostSpot/Steps/Step2Description/DescriptionEdit';
import TitleEdit from '../HostSpot/Steps/Step2Title/TitleEdit';

const SpotEditForm2 = ({ spot, closeModal, setCloseModal }) => {

    const [modalClass, setModalClass] = useState('spot-edit-modal-container-open');
    const [isFinalCheck, setIsFinalCheck] = useState(false);

    const [tags, setTags] = useState(new Set(spot.Tags.map(tag => tag.name)));
    const [amenities, setAmenities] = useState(new Set(spot.Amenities.map(amenity => amenity.name)));
    const [type, setType] = useState(spot.type);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [zipcode, setZipcode] = useState(spot.zipcode);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [showSpecific, setShowSpecific] = useState(spot.showSpecific);
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'unset'
        }
    }, []);

    useEffect(() => {
        if (closeModal) {
            setModalClass('spot-edit-modal-container-close');
        } else {
            setModalClass('spot-edit-modal-container-open');
        };
    }, [closeModal]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }


    return (
        <div className={modalClass}>
            <div className='spot-edit-modal-title'>
                <button className='exit-spot-edit-modal' onClick={() => setCloseModal(true)}><ClearX /></button>
                <h1 className='spot-edit-modal-title-text'>Edit spot</h1>
            </div>
            <div className='spot-edit-modal-content'>
                <div className='spot-edit-modal-content-half' style={{ paddingRight: '12px' }}>
                    <TitleEdit title={title} setTitle={setTitle} />
                    <DescriptionEdit description={description} setDescription={setDescription} />
                    <TagsEdit tags={tags} setTags={setTags} />
                    <AmenitiesEdit amenities={amenities} setAmenities={setAmenities} />
                    <TypeEdit type={type} setType={setType} />
                </div>
                <div className='spot-edit-modal-content-half'>
                    <LocationEdit
                    showSpecific={showSpecific} setShowSpecific={setShowSpecific} address={address}
                    setAddress={setAddress} city={city} setCity={setCity} state={state} setState={setState}
                    zipcode={zipcode} setZipcode={setZipcode} country={country} setCountry={setCountry}
                    lat={lat} setLat={setLat} lng={lng} setLng={setLng} isFinalCheck={isFinalCheck}
                    setIsFinalCheck={setIsFinalCheck} />
                </div>
            </div>
            <div className='spot-edit-modal-footer'>
                <button className='spot-edit-submit-btn' onClick={handleSubmit}>Update spot</button>
            </div>
        </div>
    );
};

export default SpotEditForm2;
