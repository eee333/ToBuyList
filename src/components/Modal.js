import React from 'react';

function Modal({modalShow, setModalShow}) {
    
    return (
        <div className={modalShow ? 'modal-container' : 'modal-container hide-modal'}>
            <div className="modal-bg"></div>
            <div className="modal">
                <h2>Hello from Modal Window!</h2>
                <p>{modalShow}</p>
                <button onClick={() => setModalShow(false)}>Close</button>
            </div>
        </div>
    )
}

export default Modal;