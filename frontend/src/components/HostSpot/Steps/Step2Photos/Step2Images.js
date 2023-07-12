import { useState } from "react";
import photosIcon from '../../../../images/step-2-photos/photos-icon.svg';
import plus from '../../../../images/step-2-photos/plus-sign.svg';
import './Step2Photos.css';
import './Step2Images.css';

const Step2Images = ({ images, setImages }) => {

    const updateFiles = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setImages(files);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
    }


    return (
        <div className='step-2-photos-container-inner-2'>
            <div className='step-2-photos-top-2'>
                <div style={{ paddingRight: '48px' }}>
                    <h1 className='step-2-photos-header-2'>
                        Choose at least 5 photos
                    </h1>
                    <div className='step-2-photos-subheader' style={{ paddingTop: '4px' }}>
                        Drag to reorder
                    </div>
                </div>
                <button className='step-2-add-btn'>
                    <span className='step-2-add-plus-box'>
                        <img src={plus} className='step-2-add-plus' alt='add more plus sign' />
                    </span>
                    <span>Add more</span>
                </button>
            </div>
            <div className='step-2-photos-bottom-2'>
                <div className='step-2-photos-input-box'>
                    <input
                        id='step-2-photos-input'
                        type='file'
                        accept='image/jpeg, image/png, image/gif'
                        multiple
                        onChange={updateFiles}
                    />
                </div>
            </div>
        </div>
    );
};

export default Step2Images;
