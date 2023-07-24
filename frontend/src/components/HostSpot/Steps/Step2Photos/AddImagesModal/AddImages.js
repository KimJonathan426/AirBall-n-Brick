import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as ClearX } from '../../../../../images/clear-x-thin.svg';
import { createImages } from '../../../../../store/spotReducer';
import NewImages from './NewImages';
import AddImagesMain from './AddImagesMain';
import GeneralError from '../../../../GeneralError';
import '../../Steps.css';
import '../Step2Photos.css';
import './AddImages.css'

const AddImages = ({ spotId, closeModal, setCloseModal, setUpdateState }) => {

    const dispatch = useDispatch();

    const [modalClass, setModalClass] = useState('add-images-modal-container-open');
    const [images, setImages] = useState([]);
    const [disabledButton, setDisabledButton] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'unset'
        }
    }, []);

    useEffect(() => {
        if (closeModal) {
            setModalClass('add-images-modal-container-close');
        } else {
            setModalClass('add-images-modal-container-open');
        };
    }, [closeModal]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabledButton(true);

        const payload = {
            id: spotId,
            images
        };

        const res = await dispatch(createImages(payload));

        if (res) {
            setUpdateState((prev) => !prev);
            setCloseModal(true);
        } else {
            setDisabledButton(false);
        };
    };


    return (
        <div className={modalClass}>
            <div className='add-images-modal-title'>
                <button className='exit-add-images-modal' onClick={() => setCloseModal(true)}><ClearX /></button>
                <h1 className='add-images-modal-title-text'>Add images</h1>
            </div>
            {images.length > 0 ?
                <>
                    <NewImages images={images} setImages={setImages} setValidationError={setValidationError} setShowError={setShowError} />
                    <div className='add-images-modal-footer'>
                        <button className={disabledButton ? 'add-images-disabled-btn' : 'add-images-submit-btn'} onClick={handleSubmit} disabled={disabledButton}>Submit</button>
                    </div>
                </>
                :
                <div style={{ padding: '24px' }}>
                    <AddImagesMain setImages={setImages} setValidationError={setValidationError} setShowError={setShowError} />
                </div>
            }
            <GeneralError error={validationError} showError={showError} setShowError={setShowError} />
        </div>
    );
};

export default AddImages;
