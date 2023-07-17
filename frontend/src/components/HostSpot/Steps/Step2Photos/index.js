import { useState } from 'react';
import Step2Main from './Step2Main';
import Step2Images from './Step2Images';
import GeneralError from '../../../GeneralError';
import './Step2Photos.css';

const Step2Photos = ({ images, setImages }) => {

    const [validationError, setValidationError] = useState('');
    const [showError, setShowError] = useState(false);

    return (
        <div className='step-2-photos-container'>
            {images.length > 0 ?
                <Step2Images images={images} setImages={setImages} setValidationError={setValidationError} setShowError={setShowError}/>
                :
                <Step2Main setImages={setImages} setValidationError={setValidationError} setShowError={setShowError}/>
            }
            <GeneralError error={validationError} showError={showError} setShowError={setShowError} />
        </div>
    );
};

export default Step2Photos;
