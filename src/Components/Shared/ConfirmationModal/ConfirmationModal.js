import React from 'react';

const ConfirmationModal = ({ title, message, successButtonName, closeModal, modalData, successAction }) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-2/4 text-center">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4 font-semibold">{message}</p>
                    <div className="modal-action justify-center">
                        <label 
                        onClick={() => successAction(modalData)} 
                        htmlFor="confirmation-modal" 
                        className="btn bg-red-700 border-none text-white btn-sm">{successButtonName}</label>
                        <button onClick={closeModal} className='btn btn-sm btn-outline'>cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;