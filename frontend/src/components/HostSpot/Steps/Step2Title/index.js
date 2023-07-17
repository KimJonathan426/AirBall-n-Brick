import { useState } from 'react';
import './Step2Title.css';

const Step2Title = ({ title, setTitle }) => {

    const [textClass, setTextClass] = useState('host-step-2-title-textarea');

    const handleChange = (e) => {
        const text = e.target.value;

        setTitle(text);

        if (text.length > 32) {
            setTextClass('host-step-2-title-textarea-invalid')
        } else {
            setTextClass('host-step-2-title-textarea')
        };
    };


    return (
        <div className='host-step-2-title-container'>
            <div className='host-step-2-title-container-inner'>
                <div className='host-step-2-title-top'>
                    <h1 className='host-step-2-title-header'>
                        Now, let's give your court a title
                    </h1>
                    <div className='host-step-2-title-subheader'>
                        Short titles work best. Have fun with it—you can always change it later
                    </div>
                </div>
                <div className='host-step-2-title-bottom'>
                    <textarea className={textClass} rows='5' value={title} onChange={handleChange}/>
                </div>
            </div>
        </div>
    );
};

export default Step2Title;
