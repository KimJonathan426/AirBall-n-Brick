import { useState } from "react";
import photosIcon from '../../../../images/step-2-photos/photos-icon.svg';
import './Step2Photos.css';

const Step2Images = ({ images, setImages }) => {

    const updateFiles = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
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
        <>
            <div className='step-2-photos-top-2'>
                <div style={{ paddingRight: '48px' }}>
                    <h1 className='step-2-photos-header-2'>
                        Choose at least 5 photos
                    </h1>
                    <div className='step-2-photos-subheader' style={{ paddingTop: '4px' }}>
                        Drag to reorder
                    </div>
                </div>
                <button className='add-more-btn'>

                </button>
            </div>
            <div className='step-2-photos-bottom-2'>
                <div
                    className=''
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}>
                    <div className='step-2-photos-instruction'>
                        <img src={photosIcon} style={{ width: '64px', height: '64px' }} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Step2Images;
