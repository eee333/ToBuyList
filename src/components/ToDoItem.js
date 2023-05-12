import React, {useState} from 'react';

function ToDoItem({title, isComlete, changeStatus, id, index,
    curMode, delItem, changeTitle, currPage, changePage}) {
    const [editItemMode, setEditItemMode] = useState(false);
    
    return (
        <li className = {(currPage == -1 && curMode != 'edit') ? "todo-item cursor-pointer" : "todo-item"}
        onClick={() => {
            if(currPage == -1 && (curMode != 'edit')) changePage(index);      
        }}>
            <span>
            {(curMode == 'edit') && (
            <div class="btn-del" onClick={() => delItem(id)}>
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="cross" fill="currentColor"><path d="M31.5,2.42828c0-0.51752-0.20148-1.00427-0.56763-1.36987c-0.73224-0.73224-2.00751-0.73224-2.73975,0L16,13.25104L3.80737,1.05841c-0.73224-0.73224-2.00751-0.73224-2.73975,0C0.70154,1.42401,0.5,1.91077,0.5,2.42828c0,0.51746,0.20154,1.00421,0.56763,1.36987l12.19263,12.19263L1.06763,28.18341C0.70154,28.54901,0.5,29.03577,0.5,29.55328c0,0.51746,0.20154,1.00421,0.56763,1.36987c0.73224,0.73224,2.00751,0.73224,2.73975,0L16,18.73053l12.19263,12.19263c0.36615,0.36609,0.85242,0.56763,1.36987,0.56763c0.51752,0,1.00378-0.20154,1.36987-0.56763C31.29852,30.5575,31.5,30.07074,31.5,29.55328c0-0.51752-0.20148-1.00427-0.56763-1.36987L18.73975,15.99078L30.93237,3.79816C31.29852,3.4325,31.5,2.94574,31.5,2.42828z"></path></svg>

            </div>
            )}
            {!editItemMode &&(
                <span 
                    onClick={() => {
                        if(curMode == 'edit') {setEditItemMode(true);}     
                    }}
                    className={isComlete ? "done" : ""}
                    >
                    {title}
                    
                </span>
            )}
            {editItemMode && (curMode == 'edit')  &&(
                <input type="text" onChange={(e)=>changeTitle(id, e.target.value)} value={title} onBlur={() => setEditItemMode(false)} autoFocus />
             )}
            </span>
            {currPage >=0 &&(
                <input type="checkbox"
                checked={isComlete}
                onChange={() => changeStatus(id)}
                disabled={curMode == 'edit'}
            />)}
            {currPage == -1 && curMode != 'edit' &&
                // <svg  class="btn-add-edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="right-arrow" fill="currentColor"><path d="M22.707,12.707a1,1,0,0,0,0-1.414l-6-6a1,1,0,0,0-1.414,1.414L19.586,11H2a1,1,0,0,0,0,2H19.586l-4.293,4.293a1,1,0,0,0,1.414,1.414Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" id="arrow"><path fill="none" fill-rule="evenodd" stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.6" d="M1 7h16M11 1l6 6-6 6"></path></svg>
            }
        </li>
    )
}

export default ToDoItem;