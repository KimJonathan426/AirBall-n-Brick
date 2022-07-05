import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpot } from '../../store/spotReducer';
import './SpotEditForm.css'

const SpotEditForm = ({ spotImages, spot, id, hideForm }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [url1, setUrl1] = useState(spotImages[0].url);
    const [url2, setUrl2] = useState(spotImages[1].url);
    const [url3, setUrl3] = useState(spotImages[2].url);
    const [url4, setUrl4] = useState(spotImages[3].url);
    const [url5, setUrl5] = useState(spotImages[4].url);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateUrl1 = (e) => setUrl1(e.target.value);
    const updateUrl2 = (e) => setUrl2(e.target.value);
    const updateUrl3 = (e) => setUrl3(e.target.value);
    const updateUrl4 = (e) => setUrl4(e.target.value);
    const updateUrl5 = (e) => setUrl5(e.target.value);

    useEffect(() => {
        const errors = [];

        if (address.length > 100) errors.push('Address cannot exceed 100 characters.');
        if (city.length > 50) errors.push('City cannot exceed 50 characters.');
        if (state.length > 50) errors.push('State cannot exceed 50 characters.');
        if (country.length > 100) errors.push('Country cannot exceed 100 characters.');
        if (name.length > 155) errors.push('Name cannot exceed 155 characters.');
        if (description.length > 1000) errors.push('Description cannot exceed 1000 characters.');

        if (Number(price) <= 0) errors.push('You cannot list your court for free or for a negative price. Enter a valid price.');
        if (Number(price) > 99999999.99) errors.push('Price cannot exceed value of 99,999,999.99');

        if (url1 && !(url1.endsWith('.jpg') || url1.endsWith('.img') || url1.endsWith('.png') || url1.endsWith('.jpeg'))) errors.push('Image 1 - Input a valid url image ending with either a .jpg, .jpeg, .img, or .png');
        if (url2 && !(url2.endsWith('.jpg') || url2.endsWith('.img') || url2.endsWith('.png') || url2.endsWith('.jpeg'))) errors.push('Image 2 - Input a valid url image ending with either a .jpg, .jpeg, .img, or .png');
        if (url3 && !(url3.endsWith('.jpg') || url3.endsWith('.img') || url3.endsWith('.png') || url3.endsWith('.jpeg'))) errors.push('Image 3 - Input a valid url image ending with either a .jpg, .jpeg, .img, or .png');
        if (url4 && !(url4.endsWith('.jpg') || url4.endsWith('.img') || url4.endsWith('.png') || url4.endsWith('.jpeg'))) errors.push('Image 4 - Input a valid url image ending with either a .jpg, .jpeg, .img, or .png');
        if (url5 && !(url5.endsWith('.jpg') || url5.endsWith('.img') || url5.endsWith('.png') || url5.endsWith('.jpeg'))) errors.push('Image 5 - Input a valid url image ending with either a .jpg, .jpeg, .img, or .png');

        setValidationErrors(errors)
    }, [address, city, state, country, name, description, price, url1, url2, url3, url4, url5]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (validationErrors.length) return alert('Cannot submit, some errors need to be fixed!');

        const payload = {
            id,
            userId: user.id,
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            url1,
            url2,
            url3,
            url4,
            url5
        };

        const res = await dispatch(updateSpot(payload));

        if (res) {
            hideForm();
        }

        setHasSubmitted(false);
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    }

    return (
        <form className='spot-edit-form-container' onSubmit={handleSubmit}>
            <div className='spot-edit-errors-container'>
                {(hasSubmitted && validationErrors.length > 0) && (
                    <ul className='spot-edit-form-errors'>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
            </div>
            <label>Address</label>
            <input type='text' value={address} onChange={updateAddress} required />
            <label>City</label>
            <input type='text' value={city} onChange={updateCity} required />
            <label>State</label>
            <input type='text' value={state} onChange={updateState} required />
            <label>Country</label>
            <input type='text' value={country} onChange={updateCountry} required />
            <label>Name</label>
            <input type='text' value={name} onChange={updateName} required />
            <label>Description</label>
            <textarea value={description} onChange={updateDescription} required />
            <label>Price</label>
            <input type='number' value={price} onChange={updatePrice} required />
            <div className='edit-image-container'>
                <label>Image Urls</label>
                <div className='edit-image-inputs'>
                    <label>Image 1</label>
                    <input type='url' value={url1} onChange={updateUrl1} required />
                    <label>Image 2</label>
                    <input type='url' value={url2} onChange={updateUrl2} required />
                    <label>Image 3</label>
                    <input type='url' value={url3} onChange={updateUrl3} required />
                    <label>Image 4</label>
                    <input type='url' value={url4} onChange={updateUrl4} required />
                    <label>Image 5</label>
                    <input type='url' value={url5} onChange={updateUrl5} required />
                </div>
            </div>
            <div className='update-spot-button-container'>
                <button className='update-spot-button' type='submit'>Update Spot</button>
            </div>
            <div className='cancel-update-button-container'>
                <button className='cancel-update-button' type='button' onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
    )
}

export default SpotEditForm;
