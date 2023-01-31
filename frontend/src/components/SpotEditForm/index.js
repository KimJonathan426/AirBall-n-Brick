import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSpot } from '../../store/spotReducer';
import './SpotEditForm.css'

const SpotEditForm = ({ spot, id, hideForm }) => {
    const dispatch = useDispatch();

    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [disabled, setDisabled] = useState(true);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

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

        setValidationErrors(errors)
    }, [address, city, state, country, name, description, price]);

    useEffect(() => {
        if (address === spot.address && city === spot.city && state === spot.state && country === spot.country
            && name === spot.name && description === spot.description && price === spot.price) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [disabled, address, spot.address, city, spot.city, state, spot.state, country, spot.country,
        name, spot.name, description, spot.description, price, spot.price])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (validationErrors.length) {
            setDisabled(false);
            return alert('Cannot submit, some errors need to be fixed!');
        }

        const payload = {
            id,
            address,
            city,
            state,
            country,
            name,
            description,
            price
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

            <div className='update-spot-button-container'>
                    <button disabled={disabled} className={disabled ? 'update-spot-disabled' : 'update-spot-button'} type='submit'>Update Spot</button>
            </div>

            <div className='cancel-update-button-container'>
                <button className={'cancel-update-button'} type='button' onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
    )
}

export default SpotEditForm;
