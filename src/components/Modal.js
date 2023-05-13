import React from 'react';

function Modal({modalShow, setModalShow, modalFunc, itemId}) {

    function execFunc() {
        modalFunc(modalShow);
        setModalShow(0);
        console.log(modalShow);
    }
    
    return (
        <div className={modalShow ? 'modal-container' : 'modal-container hide-modal'}>
            <div className="modal-bg"></div>
            <div className="modal">
                <h3>Вы действительно хотите удалить список?</h3>
                <button onClick={() => setModalShow(0)} autoFocus>Отменить</button>
                <button onClick={execFunc}>ОК</button>
            </div>
        </div>
    )
}

export default Modal;