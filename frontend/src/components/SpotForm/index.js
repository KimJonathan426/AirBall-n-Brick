import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const SpotForm = () => {
    const [ address, setAddress ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState(0);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            address,
            city,
            state,
            country,
            name,
            description,
            price
        };

        //const res = await dispatch(createSpot(payload))
        //if (res) {
            // history.push(`/spots/${res.id}`);
        // }
    }

    return (
        <form onSubmit={handleSubmit}>

        </form>
    )
}

export default SpotForm;
