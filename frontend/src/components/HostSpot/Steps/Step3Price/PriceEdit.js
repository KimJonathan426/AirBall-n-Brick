import { useEffect, useState } from 'react';
import { ReactComponent as ErrorMark } from '../../../../images/error-mark.svg';
import { ReactComponent as EditPen } from '../../../../images/edit-pen.svg';
import '../Steps.css';
import './Step3Price.css';

const PriceEdit = ({ price, setPrice }) => {

    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const inputElement = document.getElementById('spot-price');

        const patternCheck = (e) => {
            const pattern = /^\d+$/;

            if (!pattern.test(e.key)) {
                e.preventDefault();
            };
        };

        if (inputElement) {
            inputElement.addEventListener('keypress', patternCheck);
        };

        return () => {
            if (inputElement) {
                inputElement.removeEventListener('keypress', patternCheck);
            };
        };
    }, []);

    const handleChange = (e) => {
        const amount = e.target.value;

        // trim leading zeros
        const trimmedAmount = amount.replace(/^0+/, '');

        setPrice(trimmedAmount);

        if (Number(amount) > 999999) {
            setError('The maximum listing price is $999,999.99');
            setShowError(true);
        } else if (Number(amount) < 1) {
            setError('The minimum listing price is $1.00');
            setShowError(true);
        } else {
            setShowError(false);
        };
    };


    return (
        <div className='spot-edit-step-container'>
            <h1 className='spot-edit-step-header'>Price</h1>
            <div className='spot-edit-step-bottom'>
                <div className='spot-edit-price-input-box'>
                    <label htmlFor='spot-price' style={{ marginBottom: '0', cursor: 'text' }}>
                        $
                    </label>
                    <input id='spot-price' className='spot-edit-price-input'
                        type='number'
                        autoComplete='off'
                        value={price}
                        onChange={handleChange} />
                </div>
                <div className={showError ? 'spot-edit-step-error' : 'host-step-2-error-hide'}>
                    <ErrorMark />
                    <span style={{ marginLeft: '8px' }}>
                        {error}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PriceEdit;
