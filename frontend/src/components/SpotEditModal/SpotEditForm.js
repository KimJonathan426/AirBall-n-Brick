import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSpot } from '../../store/spotReducer';
import { ReactComponent as ClearX } from '../../images/clear-x-thin.svg';
import TagsEdit from '../HostSpot/Steps/Step1Tags/TagsEdit';
import LocationEdit from '../HostSpot/Steps/Step1Location/LocationEdit';
import './SpotEditForm.css';
import AmenitiesEdit from '../HostSpot/Steps/Step2Amenities/AmenitiesEdit';
import TypeEdit from '../HostSpot/Steps/Step1Type/TypeEdit';
import DescriptionEdit from '../HostSpot/Steps/Step2Description/DescriptionEdit';
import TitleEdit from '../HostSpot/Steps/Step2Title/TitleEdit';
import PriceEdit from '../HostSpot/Steps/Step3Price/PriceEdit';

const SpotEditForm2 = ({ spot, closeModal, setCloseModal, setUpdateState }) => {
    console.log('spot', spot)
    const dispatch = useDispatch();

    const [modalClass, setModalClass] = useState('spot-edit-modal-container-open');
    const [isFinalCheck, setIsFinalCheck] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

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

    useEffect(() => {
        if (!address || !city || !state || !zipcode || !country || !title || !description
            || !price || title.length > 64 || description.length > 500) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        };
    }, [address, city, state, zipcode, country, title, description, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFinalCheck(true);

        const payload = {
            id: spot.id,
            address,
            city,
            state,
            zipcode,
            country,
            lat,
            lng,
            showSpecific,
            name: title,
            type,
            description,
            price,
            tags: [...tags],
            amenities: [...amenities],
        };

        const res = await dispatch(updateSpot(payload));

        if (res) {
            if (res.error) {
                return alert('Error updating spot, please review all your updates and try again.');
            };

            setUpdateState((prev) => !prev);
            setCloseModal(true);
        };
    };


    return (
        <div className={modalClass}>
            <div className='spot-edit-modal-title'>
                <button className='exit-spot-edit-modal' onClick={() => setCloseModal(true)}><ClearX /></button>
                <h1 className='spot-edit-modal-title-text'>Edit spot</h1>
            </div>
            <div className='spot-edit-modal-content'>
                <LocationEdit
                    showSpecific={showSpecific} setShowSpecific={setShowSpecific} address={address}
                    setAddress={setAddress} city={city} setCity={setCity} state={state} setState={setState}
                    zipcode={zipcode} setZipcode={setZipcode} country={country} setCountry={setCountry}
                    lat={lat} setLat={setLat} lng={lng} setLng={setLng} isFinalCheck={isFinalCheck}
                    setIsFinalCheck={setIsFinalCheck} />
                <PriceEdit price={price} setPrice={setPrice} />
                <TitleEdit title={title} setTitle={setTitle} />
                <DescriptionEdit description={description} setDescription={setDescription} />
                <TypeEdit type={type} setType={setType} />
                <TagsEdit tags={tags} setTags={setTags} />
                <AmenitiesEdit amenities={amenities} setAmenities={setAmenities} />
            </div>
            <div className='spot-edit-modal-footer'>
                <button className={buttonDisabled ? 'spot-edit-disabled-btn' :'spot-edit-submit-btn'} onClick={handleSubmit}>Update spot</button>
            </div>
        </div>
    );
};

export default SpotEditForm2;
