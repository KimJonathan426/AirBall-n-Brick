import { useState } from 'react';
import Step2Main from './Step2Main';
import Step2Images from './Step2Images';
import './Step2Photos.css';

const Step2Photos = ({ images, setImages }) => {


    return (
        <div className='step-2-photos-container'>
            <div className='step-2-photos-container-inner'>
                {images.length > 0 ?
                    <Step2Images images={images} setImages={setImages}/>
                    :
                    <Step2Main setImages={setImages} />
                }
            </div>
        </div>
    );
};

export default Step2Photos;
