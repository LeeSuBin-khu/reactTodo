import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Edit from './modal/Edit';
import DeleteTodo from './modal/Delete';

import check from '../assets/img/check.png';
import '../assets/css/List.css';

function List() {
    const [TodoList, setTodoList] = useState([]);
    const [TagList, setTagList] = useState([]);
    const [CompleteTemp, setCompleteTemp] = useState([]);
    const [TodoId, setTodoId] = useState();
    let today = new Date();
    let year = today.getFullYear(); 
    let month = today.getMonth() + 1;  
    let day = today.getDate(); 

    const isAdd = useSelector((state)=> state.add);
    const isEdit = useSelector((state)=> state.edit);
    const isDelete = useSelector((state)=> state.delete);
    const isComplete = useSelector((state) => state.complete);
    const completeItem = useSelector((state) => state.completeItem);
    const dispatch = useDispatch();

    //... 수정 모달 관련
    const [EditModalOpen, setEditModalOpen] = useState(false);
    const EditOpenHandler = () => {
        setEditModalOpen(true);
    }
    const EditCloseHandler = () => {
        setEditModalOpen(false);
        dispatch({type: 'EDIT', data: false});
    }
    //...
    //... 삭제 모달 관련
    const [DeleteModalOpen, setDeleteModalOpen] = useState(false);
    const DeleteOpenHandler = () => {
        setDeleteModalOpen(true);
    }
    const DeleteCloseHandler = () => {
        setDeleteModalOpen(false);
        dispatch({type: 'DELETE', data: false});
    }
    //...

    const ItemClickHandler = ({ target }) => {
        if(target.className !== 'check' && target.className !== 'edit' && target.className !== 'delete') {
            window.location.replace('/detail');
        }
    }

    useEffect(() => {
        if(isComplete === null) {
            localStorage.getItem('todo')?setTodoList(JSON.parse(localStorage.getItem('todo'))):localStorage.setItem('todo', JSON.stringify([]));
            localStorage.getItem('tag')?setTagList(JSON.parse(localStorage.getItem('tag'))):localStorage.setItem('tag', JSON.stringify([]));
        } else if(isComplete === true) {
            setTodoList([]);
            if(localStorage.getItem('todo')) {
                let todoList = JSON.parse(localStorage.getItem('todo'));
                for(let todo of todoList) {
                    if(completeItem.includes(todo.title)) {
                        setTodoList( prev => [...prev, todo]);
                    }
                }
            } else {
                localStorage.setItem('todo', JSON.stringify([]));
            }
            //localStorage.getItem('tag')?setTagList(JSON.parse(localStorage.getItem('tag'))):localStorage.setItem('tag', JSON.stringify([]));
        } else if(isComplete === false) {
            setTodoList([]);
            if(localStorage.getItem('todo')) {
                let todoList = JSON.parse(localStorage.getItem('todo'));
                for(let todo of todoList) {
                    if(!completeItem.includes(todo.title)) {
                        setTodoList( prev => [...prev, todo]);
                    }
                }
            } else {
                localStorage.setItem('todo', JSON.stringify([]));
            }
            //localStorage.getItem('tag')?setTagList(JSON.parse(localStorage.getItem('tag'))):localStorage.setItem('tag', JSON.stringify([]));
        }
    }, [isAdd, completeItem, isEdit, isDelete, isComplete])

    useEffect(() => {
        if(document.querySelector('.item-container')) {
            const todoTitle = document.querySelectorAll('.todo-title');
            const todoCheckImg = document.querySelectorAll('.check');
            for(var i=0; i<todoTitle.length; i++) {
                if(completeItem.includes(todoTitle[i].innerHTML)) {
                    todoTitle[i].style.textDecorationLine = "line-through";
                    todoCheckImg[i].style.opacity = "1";
                } else {
                    todoTitle[i].style.textDecorationLine = "none";
                    todoCheckImg[i].style.opacity = "0.3";
                }
            }
        }
    }, [completeItem, TodoList])

    const checkClickHandler = ({ target }) => {
        const i = parseInt(target.id);
        const temp = JSON.parse(localStorage.getItem('todo'));
        for(let todo of temp) {
            if(todo.id === i) {
                if(todo.isComplete) {
                    todo.isComplete = false;
                    todo.completeDay = "";
                    localStorage.setItem('todo', JSON.stringify(temp));
                    setCompleteTemp( CompleteTemp.filter( item => item !== todo.title));
                } else {
                    todo.isComplete = true;
                    todo.completeDay = `${year}-${month}-${day}`;
                    localStorage.setItem('todo', JSON.stringify(temp));
                    setCompleteTemp( prev => [...prev, todo.title]);
                }
            }
        }
    }

    useEffect(() => {
        if(localStorage.getItem('todo')) {
            const temp = JSON.parse(localStorage.getItem('todo'));
            for(let i of temp) {
                if(i.isComplete) {
                    setCompleteTemp( prev => [...prev, i.title]);
                } else {
                    
                }
            }
            dispatch({type: 'COMPLETE_ITEM', data: CompleteTemp});
        }
    }, [])

    useEffect(() => {
        dispatch({type: 'COMPLETE_ITEM', data: CompleteTemp});
    }, [CompleteTemp])

    const editClickHandler = ({ target }) => {
        setTodoId(target.parentNode.parentNode.id);
        EditOpenHandler();
    }

    const deleteClickHandler = ({ target }) => {
        setTodoId(target.parentNode.parentNode.id);
        DeleteOpenHandler();
    }

    const allDeleteClickHandler = () => {
        let idTemp = [];
        if(document.querySelector('.item-container')) {
            const todoNodeItem = document.querySelectorAll('.item-container');
            for(let i=0; i<todoNodeItem.length; i++) {
                idTemp.push(todoNodeItem[i].id);
            }
            setTodoId(idTemp);
            DeleteOpenHandler();
        }
    }

    return(
        <>
        <div className="List-Conatiner">
            {TodoList.map( (todo, idx) => (
                <div className="item-container" onClick={ItemClickHandler} key={idx} id={todo.id}>
                    <div className="title-container">
                        <img src={check} className="check" id={todo.id} onClick={checkClickHandler}/>
                        <span className="todo-title">{todo.title}</span>
                    </div>
                    <div className="btn-container">
                        <button className="edit" onClick={editClickHandler}>수정</button>
                        <button className="delete" onClick={deleteClickHandler}>삭제</button>
                    </div>
                </div>
            ))}
            <Edit open={EditModalOpen} close={EditCloseHandler} todoId={TodoId} />
            <DeleteTodo open={DeleteModalOpen} close={DeleteCloseHandler} todoId={TodoId} isComplete={isComplete} />
        </div>
        {isComplete?(
        <div className="AllDelete-Conatiner">
            <button className="delete-btn" onClick={allDeleteClickHandler}>전체 삭제</button>
            <DeleteTodo open={DeleteModalOpen} close={DeleteCloseHandler} todoId={TodoId} isComplete={isComplete} />
        </div>
        )
        :<></>}
        </>
    );
}

export default List;