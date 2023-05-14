import React from 'react';
import ToDoItem from './ToDoItem';

function ToDoList({
    headTitle, todoList, changeStatus, curMode, delItem, changeTitle,  
    sortTitle, sortStatus, sortedBy, changePage, currPage, delItemConfirm
    }) {

    return (
        <div>
        {currPage >=0 &&(    
            <div class="btn-add-edit btn-return" onClick={() => changePage(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="previous" fill="currentColor"><path d="M1.293,12.707a1,1,0,0,1,0-1.414l6-6A1,1,0,0,1,8.707,6.707L4.414,11H22a1,1,0,0,1,0,2H4.414l4.293,4.293a1,1,0,0,1-1.414,1.414Z"></path></svg>
            </div>
        )}
            <h2 className='head-title'>{headTitle}</h2>
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
                        delItemConfirm={delItemConfirm}
                   />)
                )}
            </ol>
        </div>
    )
} 

export default ToDoList;
