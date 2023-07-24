import { useState } from 'react';
import { ReactComponent as ErrorMark } from '../../../../images/error-mark.svg';
import '../Steps.css';
import './Step2Title.css';

const TitleEdit = ({ title, setTitle }) => {

    const [textClass, setTextClass] = useState('spot-edit-step-textarea');
    const [showError, setShowError] = useState(false);

    const handleChange = (e) => {
        const text = e.target.value;

        setTitle(text);

        if (text.length > 64) {
            setTextClass('spot-edit-step-textarea-invalid');
            setShowError(true);
        } else {
            setTextClass('spot-edit-step-textarea');
            setShowError(false);
        };
    };


    return (
        <div className='spot-edit-step-container'>
            <h1 className='spot-edit-step-header'>Title</h1>
            <div className='spot-edit-step-bottom'>
                <textarea className={textClass} rows='2' value={title} onChange={handleChange} />
                <div className='spot-edit-step-counter'>
                    {title.length}/64
                </div>
                <div className={showError ? 'spot-edit-step-error' : 'host-step-2-error-hide'}>
                    <ErrorMark />
                    <span style={{ marginLeft: '8px' }}>
                        The maximum number of characters allowed is 64.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TitleEdit;
