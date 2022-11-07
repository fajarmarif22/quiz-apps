import React from 'react'
import { useGlobalContext } from './context'

function Modal() {
  const { closeModal, isModalOpen, correct, questions } = useGlobalContext()
  return (
    <div
      className={`${
        isModalOpen ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <div className='modal-content'>
        <h2>congratulations</h2>
        <p>
          You answered {((correct / questions.length) * 100).toFixed(0)}% of
          question correctly
        </p>
        <button className='close-btn' onClick={closeModal}>
          play again?
        </button>
      </div>
    </div>
  )
}

export default Modal
