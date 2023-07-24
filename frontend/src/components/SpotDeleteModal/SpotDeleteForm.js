import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spotReducer";
import { ReactComponent as ClearX } from '../../images/clear-x-thin.svg';
import './SpotDeleteForm.css';


function SpotDeleteForm({ spotId, closeModal, setCloseModal, setUpdateState }) {
    const dispatch = useDispatch();

    const [modalClass, setModalClass] = useState('spot-delete-modal-container-open');
    const [message, setMessage] = useState('')
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'unset';
        };
    }, []);

    useEffect(() => {
        if (closeModal) {
            setModalClass('spot-delete-modal-container-close');
        } else {
            setModalClass('spot-delete-modal-container-open');
        };
    }, [closeModal]);

    useEffect(() => {
        if (message === 'delete court') {
            setDisabled(false);
        } else {
            setDisabled(true);
        };
    }, [message]);

    const onDelete = async (e) => {
        e.preventDefault();

        const res = await dispatch(deleteSpot(spotId));

        if (res) {
            setUpdateState((prev) => !prev);
            setCloseModal(true);
        };
    };


    return (
        <div className={modalClass}>
            <h1 className='spot-delete-modal-title'>
                <button className='exit-spot-delete-modal' onClick={() => setCloseModal(true)}><ClearX /></button>
                Confirm delete
            </h1>
            <div className='confirm-delete-container'>
                <label className='spot-delete-label'>To confirm delete, type <span style={{ fontStyle: 'italic' }}>delete court</span> in the text input field.</label>
                <input
                    type='text'
                    maxLength={15}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='spot-delete-input'
                    placeholder='delete court'
                />
            </div>
            <div className='spot-delete-btns'>
                <button className='spot-delete-cancel' onClick={() => setCloseModal(true)}>Cancel</button>
                <button disabled={disabled} className={disabled ? 'spot-delete-disabled' : 'spot-delete-confirm'} onClick={onDelete}>Delete Court</button>
            </div>
        </div>
    );
}

export default SpotDeleteForm;
