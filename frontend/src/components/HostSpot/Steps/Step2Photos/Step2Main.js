import { useState } from "react";
import photosIcon from '../../../../images/step-2-photos/photos-icon.svg';
import './Step2Photos.css';

const Step2Main = ({ setImages }) => {

    const [photoBoxClass, setPhotoBoxClass] = useState('step-2-photos-box');

    // add frontend validation for image types, show alert on attempt for invalid upload
    // also account for size ( no uploads less than 50KB or greater than 25MB)

    const updateFiles = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const handleDropMain = (e) => {
        e.preventDefault();
        setPhotoBoxClass('step-2-photos-box');
        const files = Array.from(e.dataTransfer.files);
        setImages(files);
    }

    const handleDragOverMain = (e) => {
        e.preventDefault();
        setPhotoBoxClass('step-2-photos-box-drag');
    }

    const handleDragLeaveMain = (e) => {
        e.preventDefault();

        // prevent flashing when dragging over different children in main container.
        const isInContainer = e.relatedTarget && e.currentTarget.contains(e.relatedTarget);

        if (isInContainer) {
            return;
        };

        setPhotoBoxClass('step-2-photos-box');
    }


    return (
        <div className='step-2-photos-container-inner'>
            <div className='step-2-photos-top'>
                <h1 className='step-2-photos-header'>Add some photos of your court</h1>
                <div className='step-2-photos-subheader'>
                    You'll need 5 photos to get started.
                    You can add more or make changes later.
                </div>
            </div>
            <div className='step-2-photos-bottom'>
                <div className='step-2-photos-input-box'>
                    <input
                        id='step-2-photos-input'
                        type='file'
                        accept='image/jpeg, image/png, image/gif'
                        multiple
                        onChange={updateFiles}
                    />
                </div>
                <div
                    className={photoBoxClass}
                    onDrop={handleDropMain}
                    onDragOver={handleDragOverMain}
                    onDragLeave={handleDragLeaveMain}>
                    <div className='step-2-photos-instruction'>
                        <img src={photosIcon} style={{ width: '64px', height: '64px' }} alt='portraits' />
                        {photoBoxClass === 'step-2-photos-box' &&
                            <>
                                <div className='photos-instruct-1'>Drag your photos here</div>
                                <div className='photos-instruct-2'>Choose at least 5 photos</div>
                                <div className='photos-instruct-3'>
                                    <button className='photos-instruct-upload' onClick={() => document.getElementById('step-2-photos-input').click()}>
                                        Upload from your device
                                    </button>
                                </div>
                            </>
                        }
                        {photoBoxClass === 'step-2-photos-box-drag' &&
                            <div className='photos-instruct-1'>Drop to upload</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2Main;
