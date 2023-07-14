import { useEffect, useState } from "react";
import { ReactComponent as Plus } from '../../../../images/step-2-photos/plus-sign.svg';
import { ReactComponent as Options } from '../../../../images/step-2-photos/options.svg';
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
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownId, setDropdownId] = useState(null);
    const [innerDrag, setInnerDrag] = useState(false);
    const [dragElementId, setDragElementId] = useState(null);
    const [validDrop, setValidDrop] = useState(false);

    useEffect(() => {
        const outsideClick = (e) => {
            if (dropdownId === null) {
                return;
            };

            const dropdownButton = document.getElementById(`image-dropdown-${dropdownId}`);
            const dropdownContent = document.getElementById(`image-dropdown-items-${dropdownId}`);

            const target = e.target;

            if (!dropdownButton.contains(target) && !dropdownContent.contains(target)) {
                setShowDropdown(false);
                setDropdownId(null);
            };
        };

        document.addEventListener('click', outsideClick);

        return () => {
            document.removeEventListener('click', outsideClick);
        };
    });

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

                img.src = e.target.result;

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
            files = Array.from(e.target.files);
        };

        const filler = files.length;
        const loadingFiller = Array.from({ length: filler }, () => ['loading']);

        if (readerCount < 5) {
            setImageUrls((prev) => {
                let undefinedIdx = 0;

                for (let imageArr of prev) {
                    if (imageArr[0] === undefined) {
                        break;
                    };

                    undefinedIdx++;
                };

                const validSlice = prev.slice(0, undefinedIdx);
                const undefinedCount = 4 - undefinedIdx;
                const remainingUndefined = Array.from({ length: undefinedCount }, () => [undefined]);

                return [...validSlice, ...loadingFiller, ...remainingUndefined];
            });
        } else {
            setImageUrls((prev) => [...prev, ...loadingFiller]);
        };

        setImages((prev) => [...prev, ...files]);
    };

    const addImage = () => {
        const fileInputElement = document.getElementById('step-2-photos-input');

        // clear value and reset just in case user wants to upload same image/input twice in a row
        fileInputElement.value = '';
        fileInputElement.click();
    };

    const handleDropdown = (i) => {
        if (dropdownId === i) {
            setShowDropdown(!showDropdown);
            setDropdownId(null);
            return;
        }

        setShowDropdown(true);
        setDropdownId(i);
    };

    // main draggable functions
    const handleFileEnter = (e) => {
        e.preventDefault();

        // if its an internal drag do not show overlay
        if (innerDrag) {
            return;
        };

        setDragOverlayClass('step-2-photos-drag-overlay-active');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileDrop = (e) => {
        e.preventDefault();

        const transferredData = e.dataTransfer.getData('text/plain');

        // if its an internal drag do not show overlay
        // use both internal html drag data transfer and react state just in case
        if (transferredData || dragElementId) {
            return;
        };

        setDragOverlayClass('step-2-photos-drag-overlay');

        updateFiles(e);
    };

    const handleFileLeave = (e) => {
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
        setDragElementId(id);

        const placeholderElement = document.getElementById(`image-placeholder-${id}`);

        if (showDropdown || dropdownId !== null) {
            setShowDropdown(false);
            setDropdownId(null);
        };

        // ensures the dragImage is the image and not overlay
        setTimeout(() => {
            if (placeholderElement) {
                placeholderElement.style.zIndex = 1;
            };

        }, 0);
    };

    const handleDragEnter = (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        // prevent multiple enters from triggering while in same element.
        const isInContainer = e.relatedTarget && e.currentTarget.contains(e.relatedTarget);

        // element is a file, same element, or already inside and should not execute function
        if (dragElementId === null || dragElementId === id || isInContainer) {
            return;
        };

        setTimeout(() => {
            const dragElementOverlay = document.getElementById(`image-placeholder-${dragElementId}`);

            setImageUrls((prev) => {
                const newState = [...prev];
                [newState[dragElementId], newState[id]] = [newState[id], newState[dragElementId]];
                return newState;
            });

            dragElementOverlay.style.zIndex = 0;
        }, 0);
    };

    const handleDragLeave = (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        // prevent multiple leaves from triggering while inside same element.
        const isInContainer = e.relatedTarget && e.currentTarget.contains(e.relatedTarget);

        // element is a file, same element, or already inside and should not execute function
        if (dragElementId === null || dragElementId === id || isInContainer) {
            return;
        };

        const dragElementOverlay = document.getElementById(`image-placeholder-${dragElementId}`);
        dragElementOverlay.style.zIndex = 1;

        setImageUrls((prev) => {
            const newState = [...prev];
            [newState[dragElementId], newState[id]] = [newState[id], newState[dragElementId]];
            return newState;
        });
    };

    const handleDragDrop = (e, id) => {
        e.preventDefault();
        const transferredData = e.dataTransfer.getData('text/plain');

        // another check to make it not drop in main just in case.
        // file will return out of function and an inner element drag will continue
        if (transferredData || dragElementId) {
            e.stopPropagation();
        } else {
            return;
        };

        setValidDrop(true);
        setInnerDrag(false);
        setDragElementId(null); // set again just in case even tho dragend handles

        // could also use Number(transferredData) instead
        if (id === dragElementId) {
            const placeholderElement = document.getElementById(`image-placeholder-${dragElementId}`);
            placeholderElement.style.zIndex = 0;
            return;
        };

        // start switch logic
        setImages((prev) => {
            const newState = [...prev];
            [newState[dragElementId], newState[id]] = [newState[id], newState[dragElementId]];
            return newState;
        });
    };

    const handleDragEnd = (e, id) => {
        setInnerDrag(false);
        setValidDrop(false);
        setDragElementId(null);

        if (!validDrop) {
            const placeholderElement = document.getElementById(`image-placeholder-${id}`);
            placeholderElement.style.zIndex = 0;
        };
    };


    return (
        <div className='step-2-photos-container-inner-2'
            onDragEnter={handleFileEnter}
            onDragOver={handleDragOver}
            onDrop={handleFileDrop}
            onDragLeave={handleFileLeave}>
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
                        <div key={i} id={`image-container-${i}`} className='step-2-image-container-main'
                            draggable='true'
                            onDragStart={(e) => handleDragStart(e, i)}
                            onDragEnter={(e) => handleDragEnter(e, i)}
                            onDragOver={handleDragOver}
                            onDragLeave={(e) => handleDragLeave(e, i)}
                            onDrop={(e) => handleDragDrop(e, i)}
                            onDragEnd={(e) => handleDragEnd(e, i)}>
                            <div className='step-2-cover-image-box'>
                                <div className='step-2-image-options-container'>
                                    <div className='step-2-image-options-inner'>
                                        <div className='cover-image-label'>Cover Photo</div>
                                        <button id={`image-dropdown-${i}`} className='step-2-image-options-btn' onClick={() => handleDropdown(i)}>
                                            <Options />
                                        </button>
                                        {showDropdown && dropdownId === i &&
                                            <div id={`image-dropdown-items-${i}`} className='step-2-options-dropdown'>
                                                <button className='step-2-options-item'>Move forward</button>
                                                <button className='step-2-options-item'>Delete</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div id={`image-placeholder-${i}`} className='step-2-image-placeholder' draggable='false'>
                                    <img src={photoIcon} style={{ width: '32px' }} alt='portraits' />
                                </div>
                                <img id={`image-preview-${i}`} className='step-2-image-cover' src={url[0]} alt='court upload' draggable='false' />
                            </div>
                        </div>
                        : url[0] ?
                            url[0] === 'loading' ?
                                <div key={i} id={`image-container-${i}`} className='step-2-image-container' draggable='false'>
                                    <div className='step-2-image-container-inner'>
                                        <div className='step-2-loading-container'>
                                            <div className='loading-animation'></div>
                                            <img src={photoIcon} style={{ width: '32px' }} alt='portraits' draggable='false' />
                                        </div>
                                    </div>
                                </div>
                                :
                                <div key={i} id={`image-container-${i}`} className='step-2-image-container'
                                    draggable='true'
                                    onDragStart={(e) => handleDragStart(e, i)}
                                    onDragEnter={(e) => handleDragEnter(e, i)}
                                    onDragOver={handleDragOver}
                                    onDragLeave={(e) => handleDragLeave(e, i)}
                                    onDrop={(e) => handleDragDrop(e, i)}
                                    onDragEnd={(e) => handleDragEnd(e, i)}>
                                    <div className='step-2-image-container-inner'>
                                        <div className='step-2-image-options-container'>
                                            <div className='step-2-image-options-inner'>
                                                <button id={`image-dropdown-${i}`} className='step-2-image-options-btn' onClick={() => handleDropdown(i)}>
                                                    <Options />
                                                </button>
                                                {showDropdown && dropdownId === i &&
                                                    <div id={`image-dropdown-items-${i}`} className='step-2-options-dropdown'>
                                                        <button className='step-2-options-item'>Move backward</button>
                                                        {i !== images.length - 1 &&
                                                            < button className='step-2-options-item'>Move forward</button>
                                                        }
                                                        <button className='step-2-options-item'>Make cover photo</button>
                                                        <button className='step-2-options-item'>Delete</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div id={`image-placeholder-${i}`} className='step-2-image-placeholder' draggable='false'>
                                            <img src={photoIcon} style={{ width: '32px' }} alt='portraits' />
                                        </div>
                                        <div className='step-2-image-box'>
                                            <div className='step-2-image-box-inner'>
                                                <img id={`image-preview-${i}`} className={url[1]} src={url[0]} alt='court upload' draggable='false' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            :
                            <div key={i} id={`image-container-${i}`} className='step-2-image-container'>
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
