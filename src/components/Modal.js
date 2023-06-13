import React from 'react';

function Modal({modalShow, children}) {

    return (
        <div className={modalShow ? 'modal-container' : 'modal-container hide-modal'}>
            <div className="modal-bg"></div>
            <div className="modal">
                {children}
            </div>
        </div>
    )
}

export default Modal;