import { useEffect, useState } from "react";
import { ReactComponent as Plus } from '../../../../images/step-2-photos/plus-sign.svg';
import photoIcon from '../../../../images/step-2-photos/photo-icon.svg';
import photosIcon from '../../../../images/step-2-photos/photos-icon.svg';
import './Step2Photos.css';
import './Step2Images.css';

const Step2Images = ({ images, setImages }) => {
    // add frontend validation for image types, show alert on attempt for invalid upload
    // also account for size ( no uploads less than 50KB or greater than 25MB)

    const [dragOverlayClass, setDragOverlayClass] = useState('step-2-photos-drag-overlay');
    const [imageUrls, setImageUrls] = useState([[undefined], [undefined], [undefined], [undefined], [undefined]]);
    const [readerCount, setReaderCount] = useState(0);
    const [innerDrag, setInnerDrag] = useState(false);
    const [validDrop, setValidDrop] = useState(false);


    useEffect(() => {
        const loadImage = (image, i) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();

                img.onload = () => {
                    // change class based on image aspect ratio (tall = contain, short or square = cover)
                    let imgClass = 'step-2-image-cover';

                    const aspectRatio = img.naturalWidth / img.naturalHeight;

                    if (aspectRatio < 1) {
                        imgClass = 'step-2-image-contain';
                    };

                    setImageUrls((prev) => {
                        const newState = [...prev];
                        newState[i] = [reader.result, imgClass];
                        return newState;
                    });

                    setReaderCount((count) => count + 1);
                }

                img.src = e.target.result

            };

            reader.readAsDataURL(image);
        };

        const startFrom = readerCount;

        for (let i = startFrom; i < images.length; i++) {
            loadImage(images[i], i);
        };
    }, [images, readerCount]);

    const updateFiles = (e) => {
        let files;

        if (e.dataTransfer) {
            files = Array.from(e.dataTransfer.files);
        } else {
            files = Array.from(e.target.files)
        }

        const filler = files.length;

        const loadingFiller = Array.from({ length: filler }, () => ['loading']);

        if (readerCount < 5) {
            setImageUrls((prev) => {
                let undefinedIdx = 0;

                for (let imageArr of prev) {
                    if (imageArr[0] === undefined) {
                        break
                    }

                    undefinedIdx++
                }

                const validSlice = prev.slice(0, undefinedIdx);

                const undefinedCount = 4 - undefinedIdx;

                const remainingUndefined = Array.from({ length: undefinedCount }, () => [undefined]);

                return [...validSlice, ...loadingFiller, ...remainingUndefined];
            });
        } else {
            setImageUrls((prev) => [...prev, ...loadingFiller]);
        }

        setImages((prev) => [...prev, ...files]);
    };

    const addImage = () => {
        const fileInputElement = document.getElementById('step-2-photos-input');

        // clear value and reset just in case user wants to upload same image/input twice in a row
        fileInputElement.value = '';
        fileInputElement.click();
    };

    // main draggable functions
    const handleDragEnter = (e) => {
        e.preventDefault();

        // if its an internal drag do not show overlay
        if (innerDrag) {
            return;
        }

        setDragOverlayClass('step-2-photos-drag-overlay-active');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileDrop = (e) => {
        e.preventDefault();

        const transferredData = e.dataTransfer.getData('text/plain');

        // if its an internal drag do not show overlay
        if (transferredData) {
            return;
        };

        setDragOverlayClass('step-2-photos-drag-overlay');

        updateFiles(e);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();

        // prevent flashing when dragging over different children in main container.
        const isInContainer = e.relatedTarget && e.currentTarget.contains(e.relatedTarget);

        if (isInContainer) {
            return;
        };

        setDragOverlayClass('step-2-photos-drag-overlay');
    };

    // image draggable functions
    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('text/plain', id);
        setInnerDrag(true);

        const placeholderElement = document.getElementById(`image-placeholder-${id}`);

        // ensures the dragImage is the image and not overlay
        setTimeout(() => {
            if (placeholderElement) {
                placeholderElement.style.zIndex = 1;
            };
        }, 0);
    };

    const handleDragDrop = (e, id) => {
        e.preventDefault();
        const transferredData = e.dataTransfer.getData('text/plain');

        // another check to make it not drop in main just in case.
        // file will return out of function and an inner element drag will continue
        if (transferredData) {
            e.stopPropagation();
        } else {
            return;
        };

        setInnerDrag(false);
        setValidDrop(true);

        if (id === Number(transferredData)) {
            const placeholderElement = document.getElementById(`image-placeholder-${transferredData}`);
            placeholderElement.style.zIndex = 0;
        }

    }

    const handleDragEnd = (e, id) => {
        console.log('id', id)
        setValidDrop(false);

        if (!validDrop) {
            const placeholderElement = document.getElementById(`image-placeholder-${id}`);
            placeholderElement.style.zIndex = 0;
        }

    }


    return (
        <div className='step-2-photos-container-inner-2'
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDrop={handleFileDrop}
            onDragLeave={handleDragLeave}>
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
                        <Plus className='step-2-add-plus' />
                    </span>
                    <span>Add more</span>
                </button>
            </div>
            <div className='step-2-photos-bottom-2' >
                <div className={dragOverlayClass}>
                    <div className='step-2-photos-drag-overlay-inner'>
                        <img src={photosIcon} style={{ width: '64px', height: '64px' }} alt='portraits' draggable='false' />
                        <div className='photos-instruct-1'>Drop to upload</div>
                    </div>
                </div>
                <div className='step-2-photos-input-box'>
                    <input
                        id='step-2-photos-input'
                        type='file'
                        accept='image/jpeg, image/png, image/gif'
                        multiple
                        onChange={updateFiles}
                    />
                </div>
                {imageUrls.map((url, i) =>
                    i === 0 ?
                        <div key={i} id={`image-preview-${i}`} className='step-2-image-container-main'
                        draggable='true'
                        onDragStart={(e) => handleDragStart(e, i)}
                        onDrop={(e) => handleDragDrop(e, i)}
                        onDragEnd={(e) => handleDragEnd(e, i)}>
                            <div id={`image-placeholder-${i}`} className='step-2-image-placeholder-main' draggable='false'>
                                <img src={photoIcon} style={{ width: '32px' }} alt='portraits' />
                            </div>
                            <div className='step-2-cover-image-box'>
                                <img className='step-2-image-cover' src={url[0]} alt='court upload' draggable='false' />
                            </div>
                        </div>
                        : url[0] ?
                            url[0] === 'loading' ?
                                <div key={i} id={`image-preview-${i}`} className='step-2-image-container' draggable='false'>
                                    <div className='step-2-image-container-inner'>
                                        <div className='step-2-loading-container'>
                                            <div className='loading-animation'></div>
                                            <img src={photoIcon} style={{ width: '32px' }} alt='portraits' draggable='false' />
                                        </div>
                                    </div>
                                </div>
                                :
                                <div key={i} id={`image-preview-${i}`} className='step-2-image-container'
                                draggable='true'
                                onDragStart={(e) => handleDragStart(e, i)}
                                onDrop={(e) => handleDragDrop(e, i)}
                                onDragEnd={(e) => handleDragEnd(e, i)}>
                                    <div id={`image-placeholder-${i}`} className='step-2-image-placeholder' draggable='false'>
                                        <img src={photoIcon} style={{ width: '32px' }} alt='portraits' />
                                    </div>
                                    <div className='step-2-image-container-inner'>
                                        <div className='step-2-image-box'>
                                            <div className='step-2-image-box-inner'>
                                                <img className={url[1]} src={url[0]} alt='court upload' draggable='false' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            :
                            <div key={i} id={`image-preview-${i}`} className='step-2-image-container'>
                                <div className='step-2-image-container-inner'>
                                    <div className='step-2-image-container-empty' role='button' tabIndex="0" onClick={addImage}>
                                        <img src={photoIcon} style={{ width: '32px' }} alt='portraits' draggable='false' />
                                    </div>
                                </div>
                            </div>
                )}
                <div className='step-2-image-container'>
                    <div className='step-2-image-container-inner'>
                        <div className='step-2-image-container-empty' role='button' tabIndex="0" onClick={addImage}>
                            <Plus className='step-2-add-plus-alt' />
                            <div className='step-2-add-text'>Add more</div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Step2Images;
