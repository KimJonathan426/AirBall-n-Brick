import { useState } from "react";
import photosIcon from '../../../../images/photos-icon.svg';
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
            <div className='step-2-photos-top'>
                <h1 className='step-2-photos-header'>
                    Choose at least 5 photos
                </h1>
                <div className='step-2-photos-subheader'>
                    Drag to reorder
                </div>
            </div>
            <div className='step-2-photos-bottom'>
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
