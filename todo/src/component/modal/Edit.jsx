import React, { useRef, useEffect, useState } from "react";
import { useDispatch  } from 'react-redux';

import '../../assets/css/modal/AddEdit.css';

function Edit(props) {
    const { open, close, todoId } = props;
    const EditModal = useRef();
    const dispatch = useDispatch();
    let today = new Date();
    let year = today.getFullYear(); 
    let month = today.getMonth() + 1;  
    let day = today.getDate();  
    //todo 관련
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Tag, setTag] = useState([]);
    const [TagId, setTagId] = useState(0);
    const [Dday,setDday] = useState();

    const EditModalCloseHandler = ({ target }) => {
        try {
            if(!EditModal.current.contains(target)) {
                close();
            }
        } catch(err) {
            console.log(err)
        }        
    }

    useEffect(() => {
        if(open) {
            window.addEventListener('click', EditModalCloseHandler);
            return () => {
                window.removeEventListener('click', EditModalCloseHandler);
            }
        }
    }, [open])

    useEffect(() => {
        if(open) {
            dispatch({type: 'EDIT', data: true});
        }
    }, [open])

    useEffect(() => {
        if(localStorage.getItem('todo')) {
            if(JSON.parse(localStorage.getItem('todo')).length !== 0) {
                let todoList = JSON.parse(localStorage.getItem('todo'));
                for(let todo of todoList) {
                    if(todo.id === parseInt(todoId)) {
                        setTitle(todo.title);
                        setDescription(todo.description);
                        setTag(todo.tag);
                        setDday(todo.dday);
                    }
                }
            }
        }
    }, [open])

    const titleInputHandler = ({ target }) => {
        setTitle(target.value);
    }

    const descriptionInputHandler = ({ target }) => {
        setDescription(target.value);
    }

    const tagInputHandler = ({ target }) => {
        setTag(target.value);
    }

    const ddayInputHandler = ({ target }) => {
        setDday(target.value);
    }

    const completeBtnClickHandler = () => {
        if(Title !== "") {
            let todoList = JSON.parse(localStorage.getItem('todo'));
            // let tagList = JSON.parse(localStorage.getItem('tag'));
            for(let todo of todoList) {
                if(todo.id === parseInt(todoId)) {
                    todo.title = Title;
                    todo.description = Description;
                    todo.editDay = `${year}-${month}-${day}`;
                    todo.dday = Dday;
                }
            }
            // tagList.push({id: TagId, name: Title, color: Description, bgColor: TagId, addDay: `${year}-${month}-${day}`});
            localStorage.setItem('todo', JSON.stringify(todoList));
            // localStorage.setItem('tag', JSON.stringify(tagList));
            close();
        } else {
            alert("제목을 입력해주세요")
        }
    }

    return (
    <>
    {open?
    <div className="AddEdit-Conatiner">
    <div className="addEdit-conatiner" ref={EditModal}>
        <div className="title-conatiner">
            <input onChange={titleInputHandler} placeholder="title" value={Title}/>
        </div>
        <div className="description-conatiner">
            <input onChange={descriptionInputHandler} placeholder="description" value={Description}/>
        </div>
        <div className="tag-conatiner">
            <input onChange={tagInputHandler} placeholder="tag" value={Tag}/>
        </div>
        <div className="dday-conatiner">
            <input onChange={ddayInputHandler} type="date" placeholder="dday" value={Dday}/>
        </div>
        <div className="btn-conatiner">
            <button onClick={completeBtnClickHandler}>완료</button>
        </div>
    </div>
    </div>
    :<></>}
    </>
    );
}

export default Edit;