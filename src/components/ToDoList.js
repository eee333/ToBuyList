import React from 'react';
import ToDoItem from './ToDoItem';

function ToDoList({
    headTitle, todoList, changeStatus, curMode, delItem, changeTitle,  
    sortTitle, sortStatus, sortedBy, changePage, currPage, copyToClipboard, insertFromClipboard
    }) {

    return (
        <div>
            <div class="top-bar">
                <div class="control">
                {currPage >=0 &&(    
                    <div class="btn-add-edit" onClick={() => changePage(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="previous" fill="currentColor"><path d="M1.293,12.707a1,1,0,0,1,0-1.414l6-6A1,1,0,0,1,8.707,6.707L4.414,11H22a1,1,0,0,1,0,2H4.414l4.293,4.293a1,1,0,0,1-1.414,1.414Z"></path></svg>
                    </div>
                )}
                </div>
                <h2 className='head-title'>{headTitle}</h2>
                <div class="btn-add-edit" onClick={() => copyToClipboard()} 
                    style={{display: (curMode == 'add') ? 'none': 'block'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="upload"><path d="M8.71,7.71,11,5.41V15a1,1,0,0,0,2,0V5.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-4-4a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-4,4A1,1,0,1,0,8.71,7.71ZM21,14a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V15A1,1,0,0,0,21,14Z"></path></svg>
                </div>
                
                <div class="btn-add-edit" onClick={() => insertFromClipboard()}
                    style={{display: (curMode == 'add') ? 'block': 'none'}}>
                    <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="import" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21,14a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V15A1,1,0,0,0,21,14Zm-9.71,1.71a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l4-4a1,1,0,0,0-1.42-1.42L13,12.59V3a1,1,0,0,0-2,0v9.59l-2.29-2.3a1,1,0,1,0-1.42,1.42Z"></path></g></svg>
                </div>
                
            </div>
            
            
            <ol className="todo_list">
            {currPage >=0 &&(
                <li className = "todo-control" >
                    <span className={'hint-text'}>Сортировать</span>
                    <button onClick={sortTitle} 
                    className={sortedBy == 'title' ? 'active' : ''}>
                            Дела
                        </button>
                    
                    <button onClick={sortStatus}
                    className={sortedBy == 'status' ? 'active' : ''}>
                            Статус
                        </button>
                </li>
            )}
                {todoList.map(
                   (item, index) => (
                   <ToDoItem 
                        key={item.id} 
                        id={item.id}
                        index={index}
                        title={item.title}
                        isComlete={currPage == -1 ? false : item.isComlete}
                        changeStatus={changeStatus} 
                        curMode={curMode} 
                        delItem={delItem} 
                        changeTitle={changeTitle}
                        currPage={currPage}
                        changePage={changePage}
                   />)
                )}
            </ol>
        </div>
    )
} 

export default ToDoList;
