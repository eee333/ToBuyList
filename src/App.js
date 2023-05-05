import './App.css';
import React, {useState} from 'react';

import Footer from './components/Footer';
import todos from './data/todos'

// https://iconscout.com/icons/user-interface

function ToDoList({
    headTitle, todoList, changeStatus, 
    curMode, delItem, changeTitle, sortTitle, sortStatus, sortedBy
    }) {

    return (
        <div>
        
            <h1 style={{color: "#f66", textTransform: "uppercase"}}>{headTitle}</h1>
            <ol className="todo_list">
                <TodoListHeader sortTitle={sortTitle} 
                sortStatus={sortStatus} sortedBy={sortedBy}/>
                {todoList.map(
                   (item, index) => (
                   <ToDoItem 
                        key={item.id} 
                        {...item} 
                        changeStatus={changeStatus} 
                        curMode={curMode} 
                        delItem={delItem} 
                        changeTitle={changeTitle}
                   />)
                )}
            </ol>
        </div>
    )
}        

function ToDoItem({title, isComlete, changeStatus, id, 
    curMode, delItem, changeTitle}) {
    const [editItemMode, setEditItemMode] = useState(false);
    
    return (
        <li className = "todo-item">
         <span>
          {(curMode == 'edit') && (
            <div class="btn-del" onClick={() => delItem(id)}>
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="cross" fill="currentColor"><path d="M31.5,2.42828c0-0.51752-0.20148-1.00427-0.56763-1.36987c-0.73224-0.73224-2.00751-0.73224-2.73975,0L16,13.25104L3.80737,1.05841c-0.73224-0.73224-2.00751-0.73224-2.73975,0C0.70154,1.42401,0.5,1.91077,0.5,2.42828c0,0.51746,0.20154,1.00421,0.56763,1.36987l12.19263,12.19263L1.06763,28.18341C0.70154,28.54901,0.5,29.03577,0.5,29.55328c0,0.51746,0.20154,1.00421,0.56763,1.36987c0.73224,0.73224,2.00751,0.73224,2.73975,0L16,18.73053l12.19263,12.19263c0.36615,0.36609,0.85242,0.56763,1.36987,0.56763c0.51752,0,1.00378-0.20154,1.36987-0.56763C31.29852,30.5575,31.5,30.07074,31.5,29.55328c0-0.51752-0.20148-1.00427-0.56763-1.36987L18.73975,15.99078L30.93237,3.79816C31.29852,3.4325,31.5,2.94574,31.5,2.42828z"></path></svg>

            </div>
            )}
            {!editItemMode &&(
            <span className={isComlete ? "done" : ""} onClick={() => {
                     if(curMode == 'edit') setEditItemMode(true)}}>
                {title}
            </span>
            )}
            {editItemMode && (curMode == 'edit')  &&(
                <input type="text" onChange={(e)=>changeTitle(id, e.target.value)} value={title} onBlur={() => setEditItemMode(false)} autoFocus />
             )}
            </span>
            <input type="checkbox" 
            checked={isComlete}
            onChange={() => changeStatus(id)}
            disabled={curMode == 'edit'}
            />
        </li>
    )
}

function TodoListHeader({sortTitle, sortStatus, sortedBy}) {

    return (
        <li className = "todo-control" >
          <span style={{color:"gray"}}>сортировать</span>
           <button onClick={sortTitle} 
           className={sortedBy == 'title' ? 'active' : ''}>
                Дела
            </button>
           
           <button onClick={sortStatus}
           className={sortedBy == 'status' ? 'active' : ''}>
                Статус
            </button>
        </li>
    )
}

function App() {
    const modes = ['start', 'add', 'edit'];
    const [todoList, setTodoList] = useState(todos);
    const [curMode, setMode] = useState(modes[0]);
    const [sortedBy, setSort] = useState('');
    
    let newTitle = React.createRef();
    
    function changeStatus(id){
        let newTodos = [...todoList];
        let curItem = newTodos.find(item => item.id === id);
        curItem.isComlete = !curItem.isComlete;
        setTodoList(newTodos);
        console.log(todoList);
        if(sortedBy == 'status') setSort('');
    }
    
    function changeTitle(id, corrTatle){
        let newTodos = [...todoList];
        let curItem = newTodos.find(item => item.id === id);
        curItem.title = corrTatle;
        setTodoList(newTodos);
        console.log(todoList);
    }
    
    function delItem(id){
        let newTodos = todoList.filter(item => item.id !== id);
        setTodoList(newTodos);
        console.log(todoList);
    }
    
    function addItem(){
        if (!newTitle.current.value) return;
//        alert('Новое дело: ' + newTitle.current.value);
        const newItem = {
            id: Date.now(),
            title: newTitle.current.value,
            isComlete: false
        }
//        console.log(newItem);
        setTodoList([...todoList, newItem]);
        setSort('');
    }
    
    function sortTitle(){
        console.log("Сортируем по названиям");
        let newTodos = [...todoList];
        newTodos.sort((a, b)=>{
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1; else return 1
        })
        setTodoList(newTodos);
        setSort('title');
        console.log(todoList);
    }

    function sortStatus(){
        console.log("Сортируем по статусу");
        let newTodos = [...todoList];
        newTodos.sort((a, b)=>{if (a.isComlete<b.isComlete) return -1; else return 1})
        setTodoList(newTodos);
        setSort('status');
        console.log(todoList);
    }

    return (
        <div className="App">
            <ToDoList 
                headTitle="Список покупок" 
                todoList={todoList} 
                changeStatus={changeStatus} 
                curMode={curMode} 
                delItem={delItem} 
                changeTitle={changeTitle}
                sortTitle={sortTitle}
                sortStatus={sortStatus}
                sortedBy={sortedBy}
            />
            <Footer addItem={addItem} newTitle={newTitle} curMode={curMode} setMode={setMode}/>
            
        </div>
  );
}
export default App;
