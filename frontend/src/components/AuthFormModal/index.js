import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AuthForm from './AuthForm';

function AuthFormModal({ display }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>{display}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AuthForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AuthFormModal;
