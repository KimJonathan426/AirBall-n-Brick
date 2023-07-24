import { useEffect, useState, useRef } from "react";
import { ReactComponent as Plus } from '../../../../../images/step-2-photos/plus-sign.svg';
import { ReactComponent as Options } from '../../../../../images/step-2-photos/options.svg';
import photoIcon from '../../../../../images/step-2-photos/photo-icon.svg';
import photosIcon from '../../../../../images/step-2-photos/photos-icon.svg';
import '../Step2Photos.css';
import '../Step2Images.css';
import './AddImages.css';

const NewImages = ({ images, setImages, setValidationError, setShowError }) => {

    const firstRender = useRef(null);

    const [dragOverlayClass, setDragOverlayClass] = useState('new-photos-drag-overlay');
    const [imageUrls, setImageUrls] = useState([]);
    const [readerCount, setReaderCount] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownId, setDropdownId] = useState(null);

    // handle dropdown minimize on outside click
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
        if (firstRender.current === true) {
            firstRender.current = 'strict mode second render';
            return;
        } else if (firstRender.current === null) {
            firstRender.current = true;
        };

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

        // file input validation
        for (let file of files) {
            if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
                setValidationError('The images you upload must be JPEG or PNG files. Please check your file type and try again.');
                setShowError(true);
                return;
            } else if (file.size < 51200) {
                setValidationError('Each image you upload must exceed 50KBs.');
                setShowError(true);
                return;
            } else if (file.size > 26214400) {
                setValidationError('Each image you upload can not exceed 25MBs.');
                setShowError(true);
                return;
            };
        };

        const filler = files.length;
        const loadingFiller = Array.from({ length: filler }, () => ['loading']);

        setImageUrls((prev) => [...prev.slice(0, images.length), ...loadingFiller]);
        setImages((prev) => [...prev, ...files]);
    };

    const addImage = () => {
        const fileInputElement = document.getElementById('step-2-photos-input');

        // clear value and reset just in case user wants to upload same image/input twice in a row
        fileInputElement.value = '';
        fileInputElement.click();
    };

    // dropdown and dropdown button functions
    const handleDropdown = (i) => {
        if (dropdownId === i) {
            setShowDropdown(!showDropdown);
            setDropdownId(null);
            return;
        };

        setShowDropdown(true);
        setDropdownId(i);
    };

    const handleDelete = (i) => {
        setShowDropdown(false);
        setDropdownId(null);
        setReaderCount((prev) => prev - 1);
        setImages((prev) => {
            const newState = [...prev];
            newState.splice(i, 1);
            return newState;
        });
        setImageUrls((prev) => {
            const newState = [...prev];
            newState.splice(i, 1);
            return newState;
        });
    };

    // main draggable functions
    const handleFileEnter = (e) => {
        e.preventDefault();
        setDragOverlayClass('new-photos-drag-overlay-active');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        setDragOverlayClass('new-photos-drag-overlay');

        updateFiles(e);
    };

    const handleFileLeave = (e) => {
        e.preventDefault();

        // prevent flashing when dragging over different children in main container.
        const isInContainer = e.relatedTarget && e.currentTarget.contains(e.relatedTarget);

        if (isInContainer) {
            return;
        };

        setDragOverlayClass('new-photos-drag-overlay');
    };


    return (
        <div className='new-photos-container-inner'
            onDragEnter={handleFileEnter}
            onDragOver={handleDragOver}
            onDrop={handleFileDrop}
            onDragLeave={handleFileLeave}>
            <div className='new-photos-bottom' >
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
                    url[0] === 'loading' ?
                        <div key={i} id={`image-container-${i}`} className='new-image-container' draggable='false'>
                            <div className='step-2-image-container-inner'>
                                <div className='step-2-loading-container'>
                                    <div className='loading-animation'></div>
                                    <img src={photoIcon} style={{ width: '32px' }} alt='portraits' draggable='false' />
                                </div>
                            </div>
                        </div>
                        :
                        <div key={i} id={`image-container-${i}`} className='new-image-container' draggable='false'>
                            <div className='step-2-image-container-inner'>
                                <div className='step-2-image-options-container'>
                                    <div className='step-2-image-options-inner'>
                                        <button id={`image-dropdown-${i}`} className='step-2-image-options-btn' onClick={() => handleDropdown(i)}>
                                            <Options />
                                        </button>
                                        {showDropdown && dropdownId === i &&
                                            <div id={`image-dropdown-items-${i}`} className='step-2-options-dropdown'>
                                                <button className='step-2-options-item' onClick={() => handleDelete(i)}>Delete</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className='step-2-image-box'>
                                    <div className='step-2-image-box-inner'>
                                        <img id={`image-preview-${i}`} className={url[1]} src={url[0]} alt='court upload' draggable='false' />
                                    </div>
                                </div>
                            </div>
                        </div>
                )}
                <div className='new-image-container'>
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

export default NewImages;
