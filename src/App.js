import './App.css';
import React, {useState} from 'react';

import ToDoList from './components/ToDoList';
import Footer from './components/Footer';
import Modal from './components/Modal';

// https://iconscout.com/icons/user-interface

function App() {
    const modes = ['start', 'add', 'edit'];
    // let todos = [
    //     {
    //         id: 1,
    //         title: 'Купить',
    //         listItems: [
    //             {title: '',
    //             isComlete: false}
    //         ]
    //     }
    // ]
    if (!localStorage.getItem('TodoMain')) {
        localStorage.setItem('TodoMain', JSON.stringify([]));
        localStorage.setItem('currPage', -1);
    }
    const [todoMain, setTodoMain] = useState(JSON.parse(localStorage.getItem('TodoMain')));

    const [curMode, setMode] = useState(modes[0]);
    const [sortedBy, setSort] = useState(localStorage.getItem('sortedBy'));
    const [currPage, setPage] = useState(localStorage.getItem('currPage')); // -1 Главная, 0,1,2... Список конкретный
    const [modalDeleting, setModalDeleting] = useState(0); // id элемента или 0
    const [modalNotice, setModalNotice] = useState(''); // Текст сообщения

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
    function delItemConfirm(id){
        // console.log(id);
        setModalDeleting(id);
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
        if (newTodoMain.length){
            saveData(newTodoMain);
            setModalDeleting(0);
        }
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

    function copyToClipboard() {
        let todoString = '';
        
        let todoArray = localStorage.getItem('TodoMain');
        // alert(typeof(todoMain));
        todoMain.forEach(element => {
            todoString += element.title + ':\n';
            element.listItems.forEach(subElement => {
                todoString += subElement.title + '\n';
            });
            console.log(111);
        });
        // alert(todoString);
        navigator.clipboard.writeText(todoString)
              .then(() => {
                setModalNotice('Список скопирован');
              })
              .catch(err => {
                console.log('Something went wrong', err);
              });
    }

    return (
        <div className="App">
            <div className={
               currPage == -1 ? 'pages-container' : 'pages-container to-left-100'
            }>
                <div className='page'>
            {currPage == -1 && 
                <div className='main-page'>
                    <ToDoList 
                        headTitle="Мои списки" 
                        todoList={todoMain} 
                        changeStatus={changeStatus} 
                        curMode={curMode} 
                        delItem={delItemConfirm} 
                        changeTitle={changeTitle}
                        sortTitle={sortTitle}
                        sortStatus={sortStatus}
                        sortedBy={sortedBy}
                        changePage={changePage}
                        currPage={currPage}
                        copyToClipboard={copyToClipboard}
                    />
                </div>
            }
            </div>
            <div className='page'>
            {currPage >= 0 && 
                <div className='list-page'>
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
                    copyToClipboard={copyToClipboard}
                />
                
                </div>
            }
                </div>
            </div>
            <Footer addItem={addItem} newTitle={newTitle} curMode={curMode} 
            setMode={setMode} currPage={currPage} copyToClipboard={copyToClipboard}/>

            <Modal modalShow={modalDeleting}>
                <p><b>Удалить список?</b><br></br><span>Отменить это действие нельзя.</span><br></br></p>
                <button onClick={() => setModalDeleting(0)} style={{margin:0}}>Отмена</button>
                <button onClick={() => delItem(modalDeleting)}>Удалить</button>
            </Modal>

            <Modal modalShow={modalNotice}>
                <p><b>{modalNotice}</b></p>
                <button onClick={() => setModalNotice('')} style={{margin:0}}>Ok</button>
            </Modal>
            
        </div>
    );

}

export default App;
