import { useEffect, useState } from "react";
import photoIcon from '../../../../images/step-2-photos/photo-icon.svg';
import plus from '../../../../images/step-2-photos/plus-sign.svg';
import './Step2Photos.css';
import './Step2Images.css';

const Step2Images = ({ images, setImages }) => {

    const [imageUrls, setImageUrls] = useState([undefined, undefined, undefined, undefined, undefined]);

    // add frontend validation for image types, show alert on attempt for invalid upload
    // also account for size ( no uploads less than 50KB or greater than 25MB)

    useEffect(() => {
        if (images.length < 5) {

            for (const [i, image] of images.entries()) {
                const reader = new FileReader();

                reader.onload = () => {
                    setImageUrls((prev) => {
                        prev[i] = reader.result;
                        return [...prev];
                    });
                };

                reader.readAsDataURL(image);
            }
        } else {
            for (let image of images) {
                const reader = new FileReader();

                reader.onload = () => {
                    setImageUrls((prev) => [...prev, reader.result]);
                };

                reader.readAsDataURL(image);
            }
        }
    }, [images]);

    const updateFiles = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setImages(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
    };

    const addImage = () => {
        document.getElementById('step-2-photos-input').click();
    };

    console.log(imageUrls)
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
                <button className='step-2-add-btn' onClick={addImage}>
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
                {imageUrls.map((url, i) => {
                    return i === 0 ?
                        <div key={`image-preview-${i}`} className='step-2-cover-image-box' >
                            <img className='step-2-image' src={url} alt='court upload' />
                        </div>
                        : url ?
                            <div key={`image-preview-${i}`} className='step-2-image-container'>
                                <div className='step-2-image-container-inner'>
                                    <div className='step-2-image-box'>
                                        <div className='step-2-image-box-inner'>
                                            <img className='step-2-image' src={url} alt='court upload' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div key={`image-preview-${i}`} className='step-2-image-container'>
                                <div className='step-2-image-container-inner'>
                                    <div className='step-2-image-container-empty' role='button' tabIndex="0" onClick={addImage}>
                                        <img src={photoIcon} style={{ width: '32px' }} alt='portraits' />
                                    </div>
                                </div>
                            </div>
                })}
            </div>
        </div>
    );
};

export default Step2Images;
