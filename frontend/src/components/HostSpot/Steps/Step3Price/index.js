import { useEffect, useState } from 'react';
import { ReactComponent as ErrorMark } from '../../../../images/error-mark.svg';
import { ReactComponent as EditPen } from '../../../../images/edit-pen.svg';
import './Step3Price.css';

const Step3Price = ({ price, setPrice }) => {

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

        if (Number(amount) > 999999.99) {
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
        <div className='host-step-3-price-container'>
            <div className='host-step-3-price-container-inner'>
                <div className='host-step-3-price-top'>
                    <h1 className='host-step-3-price-header'>
                        Now, set your price
                    </h1>
                    <div className='host-step-3-price-subheader'>
                        You can change it anytime.
                    </div>
                </div>
                <div className='host-step-3-price-bottom'>
                    <div className='host-step-3-price-input-box'>
                        <label htmlFor='spot-price' style={{ marginBottom: '0', cursor: 'text' }}>
                            $
                        </label>
                        <input id='spot-price' className='host-step-3-price-input'
                            style={{ width: `${price.length ? price.length : 1}ch` }}
                            type='number'
                            autoComplete='off'
                            value={price}
                            onChange={handleChange} />
                        <button className='host-step-3-price-btn' onClick={() => document.getElementById('spot-price').focus()}>
                            <EditPen />
                        </button>
                    </div>
                    <div className={showError ? 'host-step-2-error' : 'host-step-2-error-hide'}>
                        <ErrorMark />
                        <span style={{ marginLeft: '8px' }}>
                            {error}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step3Price;
