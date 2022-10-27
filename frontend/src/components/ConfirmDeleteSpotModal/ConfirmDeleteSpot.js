import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpot } from "../../store/spotReducer";
import './ConfirmDeleteSpot.css'


function ConfirmDeleteSpot({ spotId, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState('')
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (message === 'delete court') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [message])

  const onDelete = async (e) => {
    e.preventDefault();

    const res = await dispatch(deleteSpot(spotId));

    if (res) {
      history.push('/');
    }
  }

  const closeModal = (e) => {
    e.preventDefault();

    setOpen(false);

    setTimeout(() => {
      setShowModal(false);
    }, 500)
  }


  return (
    open ?
      <div className='spot-delete-container animate-modal'>
        <h2 className='spot-delete-header'>Delete Court?</h2>
        <div className='confirm-delete-container'>
          <label className='spot-delete-label'>To confirm delete, type <span>delete court</span> in the text input field.</label>
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
          <button className='spot-delete-cancel' onClick={closeModal}>Cancel</button>
          <button disabled={disabled} className={disabled ? 'spot-delete-disabled' : 'spot-delete-confirm'} onClick={onDelete}>Delete Court</button>
        </div>
      </div>

      :

      <div className='spot-delete-container animate-modal-close'>
        <h2 className='spot-delete-header'>Delete Court?</h2>
        <div className='confirm-delete-container'>
          <label className='spot-delete-label'>To confirm delete, type <span>delete court</span> in the text input field.</label>
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
          <button className='spot-delete-cancel' onClick={closeModal}>Cancel</button>
          <button className='spot-delete-confirm' onClick={onDelete}>Delete Court</button>
        </div>
      </div>
  );
}

export default ConfirmDeleteSpot;
