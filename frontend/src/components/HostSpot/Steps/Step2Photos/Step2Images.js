import { useEffect, useRef, useState } from "react";
import photoIcon from '../../../../images/step-2-photos/photo-icon.svg';
import photosIcon from '../../../../images/step-2-photos/photos-icon.svg';
import { ReactComponent as Plus } from '../../../../images/step-2-photos/plus-sign.svg';
import './Step2Photos.css';
import './Step2Images.css';

const Step2Images = ({ images, setImages }) => {
    // add frontend validation for image types, show alert on attempt for invalid upload
    // also account for size ( no uploads less than 50KB or greater than 25MB)

    const draggedItem = useRef(null);
    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);

    const [dragOverlayClass, setDragOverlayClass] = useState('step-2-photos-drag-overlay');
    const [imageUrls, setImageUrls] = useState([[undefined], [undefined], [undefined], [undefined], [undefined]]);
    const [readerCount, setReaderCount] = useState(0);

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
    }, [images]);

    const updateFiles = (e) => {
        let files;
        console.log('update1')
        if (e.dataTransfer) {
            files = Array.from(e.dataTransfer.files);
        } else {
            files = Array.from(e.target.files)
        }
        console.log('update2')

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

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('text/plain', id);

        // draggedItem.current = e.target;
        // setDx(e.clientX - draggedItem.current.getBoundingClientRect().x);
        // setDy(e.clientY - draggedItem.current.getBoundingClientRect().y);
        // draggedItem.current.style.position = 'absolute';

    };

    // const handleOnDrag = () => {

    // };

    const handleDragOver = (e) => {
        e.preventDefault();

        // if its an internal drag do not show overlay
        if (!e.dataTransfer.getData('text/plain')) {
            return;
        };

        setDragOverlayClass('step-2-photos-drag-overlay-active');
    };

    const handleDrop = (e) => {
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
        const isInContainer = e.relatedTarget && !e.currentTarget.contains(e.relatedTarget);

        if (isInContainer) {
            setDragOverlayClass('step-2-photos-drag-overlay');
        };

    };


    return (
        <div className='step-2-photos-container-inner-2'
            onDragOver={handleDragOver}
            onDrop={handleDrop}
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
                        <div key={`image-preview-${i}`} className='step-2-cover-image-box' draggable='true' onDragStart={(e) => handleDragStart(e, i)}>
                            <img className='step-2-image-cover' src={url[0]} alt='court upload' draggable='false' />
                        </div>
                        : url[0] ?
                            url[0] === 'loading' ?
                                <div key={`image-preview-${i}`} className='step-2-image-container' draggable='false'>
                                    <div className='step-2-image-container-inner'>
                                        <div className='step-2-loading-container'>
                                            <div className='loading-animation'></div>
                                            <img src={photoIcon} style={{ width: '32px' }} alt='portraits' draggable='false' />
                                        </div>
                                    </div>
                                </div>
                                :
                                <div key={`image-preview-${i}`} className='step-2-image-container' draggable='true' onDragStart={(e) => handleDragStart(e, i)}>
                                    <div className='step-2-image-container-inner'>
                                        <div className='step-2-image-box'>
                                            <div className='step-2-image-box-inner'>
                                                <img className={url[1]} src={url[0]} alt='court upload' draggable='false' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            :
                            <div key={`image-preview-${i}`} className='step-2-image-container'>
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
