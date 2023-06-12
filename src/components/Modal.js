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
                <p><b>Удалить список?</b><br></br><span>Отменить это действие нельзя.</span><br></br></p>
                <button onClick={() => setModalShow(0)} style={{margin:0}}>Отмена</button>
                <button onClick={execFunc}>Удалить</button>
            </div>
        </div>
    )
}

export default Modal;