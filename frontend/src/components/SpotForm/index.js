import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { createSpot } from '../../store/spotReducer';
import hostCourt from '../../images/host-form-court.png';
import hostCourtLoading from '../../images/host-court-loading.gif';
import './SpotForm.css';

const SpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    const updateFile1 = (e) => {
        const file1 = e.target.files[0];
        if (file1) {
            setImage1(file1);
        } else {
            setImage1(null);
        }
    };
    const updateFile2 = (e) => {
        const file2 = e.target.files[0];
        if (file2) {
            setImage2(file2);
        } else {
            setImage2(null);
        }
    };
    const updateFile3 = (e) => {
        const file3 = e.target.files[0];
        if (file3) {
            setImage3(file3);
        } else {
            setImage3(null);
        }
    };
    const updateFile4 = (e) => {
        const file4 = e.target.files[0];
        if (file4) {
            setImage4(file4);
        } else {
            setImage4(null);
        }
    };
    const updateFile5 = (e) => {
        const file5 = e.target.files[0];
        if (file5) {
            setImage5(file5);
        } else {
            setImage5(null);
        }
    };

    useEffect(() => {
        const errors = [];

        if (address.length > 100) errors.push('Address cannot exceed 100 characters.');
        if (city.length > 50) errors.push('City cannot exceed 50 characters.');
        if (state.length > 50) errors.push('State cannot exceed 50 characters.');
        if (country.length > 100) errors.push('Country cannot exceed 100 characters.');
        if (name.length > 155) errors.push('Name cannot exceed 155 characters.');
        if (description.length > 1000) errors.push('Description cannot exceed 1000 characters.');

        if (Number(price) <= 0) errors.push('You cannot list your court for free or a negative price. Enter a valid price.');
        if (Number(price) > 99999999.99) errors.push('Price cannot exceed value of 99,999,999.99');

        if (!image1 && !(image1?.name?.toLowerCase()?.endsWith('.jpg') || image1?.name?.toLowerCase()?.endsWith('.img') || image1?.name?.toLowerCase()?.endsWith('.png') || image1?.name?.toLowerCase()?.endsWith('.jpeg'))) errors.push('Image 1 - Input a valid image ending with either a .jpg, .jpeg, .img, or .png');
        if (!image2 && !(image2?.name?.toLowerCase()?.endsWith('.jpg') || image2?.name?.toLowerCase()?.endsWith('.img') || image2?.name?.toLowerCase()?.endsWith('.png') || image2?.name?.toLowerCase()?.endsWith('.jpeg'))) errors.push('Image 2 - Input a valid image ending with either a .jpg, .jpeg, .img, or .png');
        if (!image3 && !(image3?.name?.toLowerCase()?.endsWith('.jpg') || image3?.name?.toLowerCase()?.endsWith('.img') || image3?.name?.toLowerCase()?.endsWith('.png') || image3?.name?.toLowerCase()?.endsWith('.jpeg'))) errors.push('Image 3 - Input a valid image ending with either a .jpg, .jpeg, .img, or .png');
        if (!image4 && !(image4?.name?.toLowerCase()?.endsWith('.jpg') || image4?.name?.toLowerCase()?.endsWith('.img') || image4?.name?.toLowerCase()?.endsWith('.png') || image4?.name?.toLowerCase()?.endsWith('.jpeg'))) errors.push('Image 4 - Input a valid image ending with either a .jpg, .jpeg, .img, or .png');
        if (!image5 && !(image5?.name?.toLowerCase()?.endsWith('.jpg') || image5?.name?.toLowerCase()?.endsWith('.img') || image5?.name?.toLowerCase()?.endsWith('.png') || image5?.name?.toLowerCase()?.endsWith('.jpeg'))) errors.push('Image 5 - Input a valid image ending with either a .jpg, .jpeg, .img, or .png');

        setValidationErrors(errors);
    }, [address, city, state, country, name, description, price, image1, image2, image3, image4, image5]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        setDisabled(true);

        if (validationErrors.length) {
            setDisabled(false);
            return alert('Cannot submit, some errors need to be fixed!');
        }

        const images = {
            '0': image1,
            '1': image2,
            '2': image3,
            '3': image4,
            '4': image5
        };

        const payload = {
            userId: user.id,
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            images
        };

        const res = await dispatch(createSpot(payload));

        if (res) {
            history.push(`/spots/${res}`);
        }

        setHasSubmitted(false);
    }


    // Will prevent not logged-in users from accessing form manually.
    if (!user) return (
        <Redirect to="/" />
    );

    return (
        <div className='spot-form-container'>
            <div className='left-side-image'>
                <img src={hostCourt} />
            </div>
            <div className='right-side-form'>
                <form className='spot-form' onSubmit={handleSubmit}>
                    {(hasSubmitted && validationErrors.length > 0) && (
                        <ul className='errors'>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                    <div>
                        <label>Address</label>
                        <input type='text' value={address} onChange={updateAddress} required />
                    </div>
                    <div>
                        <label>City</label>
                        <input type='text' value={city} onChange={updateCity} required />
                    </div>
                    <div>
                        <label>State</label>
                        <input type='text' value={state} onChange={updateState} required />
                    </div>
                    <div>
                        <label>Country</label>
                        <input type='text' value={country} onChange={updateCountry} required />
                    </div>
                    <div>
                        <label>Name</label>
                        <input type='text' value={name} onChange={updateName} required />
                    </div>
                    <div>
                        <label>Price</label>
                        <input type='number' value={price} onChange={updatePrice} required />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea className='description-input' value={description} onChange={updateDescription} required />
                    </div>
                    <div className='image-input-container'>
                        <label>Basketball Court Images</label>
                        <div className='image-inputs'>
                            <label>Image 1</label>
                            <input type="file" onChange={updateFile1} />
                            <label>Image 2</label>
                            <input type="file" onChange={updateFile2} />
                            <label>Image 3</label>
                            <input type="file" onChange={updateFile3} />
                            <label>Image 4</label>
                            <input type="file" onChange={updateFile4} />
                            <label>Image 5</label>
                            <input type="file" onChange={updateFile5} />
                        </div>
                    </div>
                    {disabled ?
                        <button disabled className='host-button-disabled' type='submit'>
                            <div className='host-loading'>
                                <img src={hostCourtLoading} alt='loading...' />
                            </div>
                        </button>
                        :
                        <button className='host-button' type='submit'>Host New Court</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default SpotForm;
