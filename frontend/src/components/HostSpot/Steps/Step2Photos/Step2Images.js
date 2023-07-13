import { useEffect, useState } from "react";
import photoIcon from '../../../../images/step-2-photos/photo-icon.svg';
import plus from '../../../../images/step-2-photos/plus-sign.svg';
import './Step2Photos.css';
import './Step2Images.css';

const Step2Images = ({ images, setImages }) => {
    // add frontend validation for image types, show alert on attempt for invalid upload
    // also account for size ( no uploads less than 50KB or greater than 25MB)

    const [imageUrls, setImageUrls] = useState([undefined, undefined, undefined, undefined, undefined]);
    const [readerCount, setReaderCount] = useState(0);

    useEffect(() => {
        console.log(imageUrls)
        const loadImage = (image, i) => {
            const reader = new FileReader();

            reader.onload = () => {
                setImageUrls((prev) => {
                    const newState = [...prev];
                    newState[i] = reader.result;
                    return newState;
                });

                setReaderCount((count) => count + 1);
            };

            reader.readAsDataURL(image);
        };

        const startFrom = readerCount;

        for (let i = startFrom; i < images.length; i++) {
            loadImage(images[i], i);
        };
    }, [images]);

    const updateFiles = (e) => {
        const files = Array.from(e.target.files);

        const filler = files.length;

        const loadingFiller = Array.from({ length: filler }, () => 'loading');

        if (readerCount < 5) {
            setImageUrls((prev) => {
                const undefinedIdx = prev.indexOf(undefined);
                const validSlice = prev.slice(0, undefinedIdx);

                const undefinedCount = 4 - undefinedIdx;

                const remainingUndefined = Array.from({ length: undefinedCount }, () => undefined);

                return [...validSlice, ...loadingFiller, ...remainingUndefined];
            });
        } else {
            setImageUrls((prev) => [...prev, ...loadingFiller]);
        }

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
        const fileInputElement = document.getElementById('step-2-photos-input');

        // clear value and reset just in case user wants to upload same image/input twice in a row
        fileInputElement.value = '';
        fileInputElement.click();
    };

    // console.log(imageUrls)
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
                {/* {images.length === readerCount && */}
                {imageUrls.map((url, i) =>
                    i === 0 ?
                        <div key={`image-preview-${i}`} className='step-2-cover-image-box' >
                            <img className='step-2-image' src={url} alt='court upload' />
                        </div>
                        : url ?
                            <div key={`image-preview-${i}`} className='step-2-image-container'>
                                <div className='step-2-image-container-inner'>
                                    {url === 'loading' ?
                                        <div className='step-2-loading-container'>
                                            <div className='loading-animation'></div>
                                            <img src={photoIcon} style={{ width: '32px' }} alt='portraits' />
                                        </div>
                                        :
                                        <div className='step-2-image-box'>
                                            <div className='step-2-image-box-inner'>
                                                <img className='step-2-image' src={url} alt='court upload' />
                                            </div>
                                        </div>
                                    }
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
                )}
            </div>
        </div>
    );
};

export default Step2Images;
