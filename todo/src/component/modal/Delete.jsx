import React, { useRef, useEffect, useState } from "react";
import { useDispatch  } from 'react-redux';

import '../../assets/css/modal/Delete.css';

function DeleteTodo(props) {
    const { open, close, todoId, isComplete } = props;
    const DeleteModal = useRef();
    const dispatch = useDispatch();

    const DeleteModalCloseHandler = ({ target }) => {
        try {
            if(!DeleteModal.current.contains(target)) {
                close();
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(open) {
            window.addEventListener('click', DeleteModalCloseHandler);
            return () => {
                window.removeEventListener('click', DeleteModalCloseHandler);
            }
        }
    }, [open])

    useEffect(() => {
        if(open) {
            dispatch({type: 'DELETE', data: true});
        }
    }, [open])

    const yesClickHandler = () => {
        if(!isComplete) {
            const temp = JSON.parse(localStorage.getItem('todo'));
            const todoList = temp.filter( item => item.id !== parseInt(todoId));
            localStorage.setItem('todo', JSON.stringify(todoList));
        } else {
            let temp = JSON.parse(localStorage.getItem('todo'));
            for(let i of todoId) {
                temp = temp.filter( item => item.id !== parseInt(i));
            }
            localStorage.setItem('todo', JSON.stringify(temp));
        }
        close();
    }

    const noClickHandler = () => {
        close();
    }
    
    return (
    <>
    {open?
    <div className="Delete-Container">
    <div className="delete-container" ref={DeleteModal}>
        <div className="question">삭제하겠습니까?</div>
        <div className="btn-container">
            <button className="yes" onClick={yesClickHandler}>예</button>
            <button className="no" onClick={noClickHandler}>아니오</button>
        </div>
    </div>
    </div>
    :<></>}    
    </>
    );
}

export default DeleteTodo;