import React, {useState} from 'react';

function ToDoItem({title, isComlete, changeStatus, id, index,
    curMode, delItem, changeTitle, currPage, changePage, delItemConfirm}) {
    const [editItemMode, setEditItemMode] = useState(false);
    
    return (
        <li className = {(currPage == -1 && curMode != 'edit') ? "todo-item cursor-pointer" : "todo-item"}
        onClick={() => {
            if(currPage == -1 && (curMode != 'edit')) changePage(index);      
        }}>
            <span>
            {(curMode == 'edit') && (
                <svg className="btn-del" onClick={() => delItem(id)} xmlns="http://www.w3.org/2000/svg" viewBox="6 4 13 15" id="cancel"><path fill="currentColor" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path></svg>
            )}

            {!editItemMode &&(
                <span 
                    onClick={() => {
                        if(curMode == 'edit') {setEditItemMode(true);}     
                    }}
                    className={isComlete ? "done" : ""}
                    >
                    {title}
                    {(curMode == 'edit') && (
                        <svg class="btn-edit-small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="pencil"><path d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z"></path></svg>
                    )}
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