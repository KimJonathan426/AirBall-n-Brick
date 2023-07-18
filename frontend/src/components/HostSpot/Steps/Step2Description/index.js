import { useState } from 'react';
import { ReactComponent as ErrorMark } from '../../../../images/error-mark.svg';
import './Step2Description.css';

const Step2Description = ({ description, setDescription }) => {

    const [textClass, setTextClass] = useState('host-step-2-description-textarea');
    const [showError, setShowError] = useState(false);

    const handleChange = (e) => {
        const text = e.target.value;

        setDescription(text);

        if (text.length > 500) {
            setTextClass('host-step-2-description-textarea-invalid');
            setShowError(true);
        } else {
            setTextClass('host-step-2-description-textarea');
            setShowError(false);
        };
    };


    return (
        <div className='host-step-2-description-container'>
            <div className='host-step-2-description-container-inner'>
                <div className='host-step-2-description-top'>
                    <h1 className='host-step-2-description-header'>
                        Create your description
                    </h1>
                    <div className='host-step-2-description-subheader'>
                        Share what makes your place special.
                    </div>
                </div>
                <div className='host-step-2-description-bottom'>
                    <textarea className={textClass} rows='7' value={description} onChange={handleChange} />
                    <div className='host-step-2-description-counter'>
                        {description.length}/500
                    </div>
                    <div className={showError ? 'host-step-2-error' : 'host-step-2-error-hide'}>
                        <ErrorMark />
                        <span style={{ marginLeft: '8px' }}>
                            The maximum number of characters allowed is 500.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2Description;
