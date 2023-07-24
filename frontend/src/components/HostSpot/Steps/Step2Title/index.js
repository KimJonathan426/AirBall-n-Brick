import { useState } from 'react';
import { ReactComponent as ErrorMark } from '../../../../images/error-mark.svg';
import '../Steps.css';
import './Step2Title.css';

const Step2Title = ({ title, setTitle }) => {

    const [textClass, setTextClass] = useState('host-step-2-title-textarea');
    const [showError, setShowError] = useState(false);

    const handleChange = (e) => {
        const text = e.target.value;

        setTitle(text);

        if (text.length > 64) {
            setTextClass('host-step-2-title-textarea-invalid');
            setShowError(true);
        } else {
            setTextClass('host-step-2-title-textarea');
            setShowError(false);
        };
    };


    return (
        <div className='host-step-container-center'>
            <div className='host-step-2-title-container-inner'>
                <div className='host-step-top'>
                    <h1 className='host-step-header'>
                        Now, let's give your court a title
                    </h1>
                    <div className='host-step-subheader'>
                        Short titles work best. Have fun with it—you can always change it later
                    </div>
                </div>
                <div className='host-step-2-title-bottom'>
                    <textarea className={textClass} rows='5' value={title} onChange={handleChange} />
                    <div className='host-step-2-title-counter'>
                        {title.length}/64
                    </div>
                    <div className={showError ? 'host-step-2-error' : 'host-step-2-error-hide'}>
                        <ErrorMark />
                        <span style={{ marginLeft: '8px' }}>
                            The maximum number of characters allowed is 64.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2Title;
