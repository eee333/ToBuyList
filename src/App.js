import './App.css';
import React, {useState} from 'react';

import ToDoList from './components/ToDoList';
import Footer from './components/Footer';

// https://iconscout.com/icons/user-interface

function App() {
    const modes = ['start', 'add', 'edit'];
    let todos = [
        {
            id: 1,
            title: 'Купить',
            listItems: [
                {title: '',
                isComlete: false}
            ]
        }
    ]
    if (!localStorage.getItem('TodoMain')) {
        localStorage.setItem('TodoMain', JSON.stringify([]));
        localStorage.setItem('currPage', -1);
    }
    const [todoMain, setTodoMain] = useState(JSON.parse(localStorage.getItem('TodoMain')));
    const [todoListIndex, setTodoList] = useState(localStorage.getItem('todoListIndex'));

    const [curMode, setMode] = useState(modes[0]);
    const [sortedBy, setSort] = useState(localStorage.getItem('sortedBy'));
    const [currPage, setPage] = useState(localStorage.getItem('currPage')); // -1 Главная, 0,1,2... Список конкретный

    let newTitle = React.createRef();
    
    function changeStatus(id){
        let newTodoMain = [...todoMain];
        let currList = newTodoMain[currPage];

        let curItem = currList.listItems.find(item => item.id === id);
        curItem.isComlete = !curItem.isComlete;

        if(sortedBy == 'status') {
            setSort('');
            localStorage.setItem('sortedBy', '');
        }
        saveData(newTodoMain);
    }
    
    function changeTitle(id, corrTatle){
        let newTodoMain = [...todoMain];
        let curItem = {};

        if(currPage >= 0){
            let currList = newTodoMain[currPage];
            curItem = currList.listItems.find(item => item.id === id);
        }
        else{
            curItem = newTodoMain.find(item => item.id === id);
        }

        curItem.title = corrTatle;

        saveData(newTodoMain);
    }
    
    function delItem(id){
        let newTodoMain = [];

        if(currPage >= 0){
            newTodoMain = [...todoMain];
            let currList = newTodoMain[currPage];
            currList.listItems = todoMain[currPage].listItems.filter(item => item.id !== id);
        }
        else{
            newTodoMain = todoMain.filter(item => item.id !== id);
        }

        saveData(newTodoMain);
    }
    
    function addItem(){
        if (!newTitle.current.value) return;

        const newItem = {
            id: Date.now(),
            title: newTitle.current.value
        }

        let newTodoMain = [...todoMain];
        if(currPage >= 0){
            newItem.isComlete = false;
            let currList = newTodoMain[currPage];
            currList.listItems = [...todoMain[currPage].listItems, newItem];
        }
        else{
            newItem.listItems = [];
            newTodoMain = [...todoMain, newItem];
            newTodoMain.sort((a, b)=>{
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1; else return 1
            })
        }
        
        setSort('');
        localStorage.setItem('sortedBy', '');

        saveData(newTodoMain);
    }
    
    function sortTitle(){
        let newTodoMain = [...todoMain];
        let currList = newTodoMain[currPage];

        currList.listItems.sort((a, b)=>{
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1; else return 1
        })
    
        setSort('title');
        localStorage.setItem('sortedBy', 'title');

        saveData(newTodoMain);
    }

    function sortStatus(){
        let newTodoMain = [...todoMain];
        let currList = newTodoMain[currPage];

        currList.listItems.sort((a, b)=>{if (a.isComlete<b.isComlete) return -1; else return 1})

        setSort('status');
        localStorage.setItem('sortedBy', 'status');

        saveData(newTodoMain);
    }

    function changePage(page){
        console.log("Смена страницы");
        setPage(page);
        localStorage.setItem('currPage', page);
        
        console.log(page);
    }

    function saveData(obj) {
        setTodoMain(obj);
        localStorage.setItem('TodoMain', JSON.stringify(obj));
        console.log(obj);
    }

    return (
        <div className="App">

            {currPage == -1 && 
                <div>
                <ToDoList 
                    headTitle="Мои списки" 
                    todoList={todoMain} 
                    changeStatus={changeStatus} 
                    curMode={curMode} 
                    delItem={delItem} 
                    changeTitle={changeTitle}
                    sortTitle={sortTitle}
                    sortStatus={sortStatus}
                    sortedBy={sortedBy}
                    changePage={changePage}
                    currPage={currPage}
                />
                <Footer addItem={addItem} newTitle={newTitle} curMode={curMode} setMode={setMode}/>
                </div>
            }

            {currPage >= 0 && 
                <div>
                <ToDoList 
                    headTitle={todoMain[currPage].title} 
                    todoList={todoMain[currPage].listItems} 
                    changeStatus={changeStatus} 
                    curMode={curMode} 
                    delItem={delItem} 
                    changeTitle={changeTitle}
                    sortTitle={sortTitle}
                    sortStatus={sortStatus}
                    sortedBy={sortedBy}
                    changePage={changePage}
                    currPage={currPage}
                />
                <Footer addItem={addItem} newTitle={newTitle} curMode={curMode} setMode={setMode} currPage={currPage}/>
                </div>
            }
            
        </div>
    );

}

export default App;
