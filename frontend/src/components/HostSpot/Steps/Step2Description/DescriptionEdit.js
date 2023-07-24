import { useState } from 'react';
import { ReactComponent as ErrorMark } from '../../../../images/error-mark.svg';
import '../Steps.css';
import './Step2Description.css';

const DescriptionEdit = ({ description, setDescription }) => {

    const [textClass, setTextClass] = useState('spot-edit-step-textarea');
    const [showError, setShowError] = useState(false);

    const handleChange = (e) => {
        const text = e.target.value;

        setDescription(text);

        if (text.length > 500) {
            setTextClass('spot-edit-step-textarea-invalid');
            setShowError(true);
        } else {
            setTextClass('spot-edit-step-textarea');
            setShowError(false);
        };
    };


    return (
        <div className='spot-edit-step-container'>
            <h1 className='spot-edit-step-header'>Description</h1>
            <div className='spot-edit-step-bottom'>
                <textarea className={textClass} rows='5' value={description} onChange={handleChange} />
                <div className='spot-edit-step-counter'>
                    {description.length}/500
                </div>
                <div className={showError ? 'spot-edit-step-error' : 'host-step-2-error-hide'}>
                    <ErrorMark />
                    <span style={{ marginLeft: '8px' }}>
                        The maximum number of characters allowed is 500.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DescriptionEdit;
