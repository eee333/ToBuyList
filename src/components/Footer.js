import React from 'react';

function Footer({addItem, newTitle, curMode, setMode, currPage}) {
    
    function formSubmit(e){
        e.preventDefault();
        addItem();    
        newTitle.current.value = '';
    }    

    return (
        <div>
           {(curMode == 'start') && (
            <div className="mode-set">
               <div class="btn-add-edit" onClick={() => setMode('edit')}>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="edit" fill="currentColor"><path d="M12.82373,12.95898l-1.86279,6.21191c-0.1582,0.52832-0.01367,1.10156,0.37646,1.49121c0.28516,0.28516,0.66846,0.43945,1.06055,0.43945c0.14404,0,0.28906-0.02051,0.43066-0.06348l6.2124-1.8623c0.23779-0.07129,0.45459-0.2002,0.62988-0.37598L31.06055,7.41016C31.3418,7.12891,31.5,6.74707,31.5,6.34961s-0.1582-0.7793-0.43945-1.06055l-4.3501-4.34961c-0.58594-0.58594-1.53516-0.58594-2.12109,0L13.2002,12.3291C13.02441,12.50488,12.89551,12.7207,12.82373,12.95898z M15.58887,14.18262L25.6499,4.12109l2.22852,2.22852L17.81738,16.41113l-3.18262,0.9541L15.58887,14.18262z"></path><path d="M30,14.5c-0.82861,0-1.5,0.67188-1.5,1.5v10c0,1.37891-1.12158,2.5-2.5,2.5H6c-1.37842,0-2.5-1.12109-2.5-2.5V6c0-1.37891,1.12158-2.5,2.5-2.5h10c0.82861,0,1.5-0.67188,1.5-1.5S16.82861,0.5,16,0.5H6C2.96729,0.5,0.5,2.96777,0.5,6v20c0,3.03223,2.46729,5.5,5.5,5.5h20c3.03271,0,5.5-2.46777,5.5-5.5V16C31.5,15.17188,30.82861,14.5,30,14.5z"></path></svg>
                </div>    
                <div class="btn-add-edit" onClick={() => setMode('add')}>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="add" fill="currentColor"><path d="M2.4375,17.9375h11.625v11.625c0,1.06854,0.86896,1.9375,1.9375,1.9375s1.9375-0.86896,1.9375-1.9375v-11.625h11.625c1.06854,0,1.9375-0.86896,1.9375-1.9375s-0.86896-1.9375-1.9375-1.9375h-11.625V2.4375C17.9375,1.36896,17.06854,0.5,16,0.5s-1.9375,0.86896-1.9375,1.9375v11.625H2.4375C1.36896,14.0625,0.5,14.93146,0.5,16S1.36896,17.9375,2.4375,17.9375z"></path></svg>
                </div>
            </div>
            )}

            {(curMode == 'add') && (
            <form onSubmit={formSubmit}>
                <li className = "todo-control">
                    <input type="text" autoFocus ref={newTitle} placeholder={currPage >= 0 ? "Новый элемент списка" : "Новый список"} />
                    <div >
                        <svg class="btn-add-edit" onClick={() => setMode('start')} xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" id="corner-arrow" fill="currentColor"><path d="m19.78 12.38-4-5a1 1 0 0 0-1.56 1.24l2.7 3.38H8a1 1 0 0 1-1-1V6a1 1 0 0 0-2 0v5a3 3 0 0 0 3 3h8.92l-2.7 3.38a1 1 0 0 0 .16 1.4A1 1 0 0 0 15 19a1 1 0 0 0 .78-.38l4-5a1 1 0 0 0 0-1.24z" data-name="corner-down-right"></path></svg>
                    </div>    
                    <div >
                        <svg class="btn-add-edit" onClick={formSubmit} xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="add" fill="currentColor"><path d="M2.4375,17.9375h11.625v11.625c0,1.06854,0.86896,1.9375,1.9375,1.9375s1.9375-0.86896,1.9375-1.9375v-11.625h11.625c1.06854,0,1.9375-0.86896,1.9375-1.9375s-0.86896-1.9375-1.9375-1.9375h-11.625V2.4375C17.9375,1.36896,17.06854,0.5,16,0.5s-1.9375,0.86896-1.9375,1.9375v11.625H2.4375C1.36896,14.0625,0.5,14.93146,0.5,16S1.36896,17.9375,2.4375,17.9375z"></path></svg>
                    </div>
                </li>
            </form>
            )}
                
            {(curMode == 'edit') && (
            <div className="mode-set">
                <span className={'hint-text'}>Удалить или изменить запись</span>
                <div>
                    <svg class="btn-add-edit" onClick={() => setMode('start')} xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" id="corner-arrow" fill="currentColor"><path d="m19.78 12.38-4-5a1 1 0 0 0-1.56 1.24l2.7 3.38H8a1 1 0 0 1-1-1V6a1 1 0 0 0-2 0v5a3 3 0 0 0 3 3h8.92l-2.7 3.38a1 1 0 0 0 .16 1.4A1 1 0 0 0 15 19a1 1 0 0 0 .78-.38l4-5a1 1 0 0 0 0-1.24z" data-name="corner-down-right"></path></svg>
                </div> 
            </div>
            )}
        </div>
    )
} 

export default Footer;