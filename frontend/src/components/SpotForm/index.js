import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spotReducer';

const SpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const [ address, setAddress ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState();
    const [ url1, setUrl1 ] = useState('');
    const [ url2, setUrl2 ] = useState('');
    const [ url3, setUrl3 ] = useState('');
    const [ url4, setUrl4 ] = useState('');
    const [ url5, setUrl5 ] = useState('');

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

        const res = await dispatch(createSpot(payload));

        if (res) {
            history.push(`/spots/${res.spot.id}`);
        }
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
            <button type='submit'>Host New Spot</button>
        </form>
    )
}

export default SpotForm;
