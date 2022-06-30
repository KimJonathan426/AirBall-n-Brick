import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpot } from '../../store/spotReducer';

const SpotEditForm = ({ spotImages, spot, id, hideForm }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [ address, setAddress ] = useState(spot.address);
    const [ city, setCity ] = useState(spot.city);
    const [ state, setState ] = useState(spot.state);
    const [ country, setCountry ] = useState(spot.country);
    const [ name, setName ] = useState(spot.name);
    const [ description, setDescription ] = useState(spot.description);
    const [ price, setPrice ] = useState(spot.price);
    const [ url1, setUrl1 ] = useState(spotImages[0].url);
    const [ url2, setUrl2 ] = useState(spotImages[1].url);
    const [ url3, setUrl3 ] = useState(spotImages[2].url);
    const [ url4, setUrl4 ] = useState(spotImages[3].url);
    const [ url5, setUrl5 ] = useState(spotImages[4].url);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            // Should Hide Form
            console.log('res', res);
            hideForm();
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    }

    return (
        <form onSubmit={handleSubmit}>
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
            <label>Image Urls</label>
            <input type='url' value={url1} onChange={updateUrl1} required />
            <input type='url' value={url2} onChange={updateUrl2} required />
            <input type='url' value={url3} onChange={updateUrl3} required />
            <input type='url' value={url4} onChange={updateUrl4} required />
            <input type='url' value={url5} onChange={updateUrl5} required />
            <button type='submit'>Update Spot</button>
            <button type='button' onClick={handleCancelClick}>Cancel</button>
        </form>
    )
}

export default SpotEditForm;
