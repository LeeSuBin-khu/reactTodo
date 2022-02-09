import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch  } from 'react-redux';

import '../../assets/css/modal/AddEdit.css';

function Add(props) {
    const { open, close } = props;
    const AddModal = useRef();
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

    const todoID = useSelector((state) => state.todoID);

    const AddModalCloseHandler = ({ target }) => {
        try {
            if(!AddModal.current.contains(target)) {
                close();
            }
        } catch(err) {
            console.log(err)
        }        
    }

    useEffect(() => {
        if(open) {
            window.addEventListener('click', AddModalCloseHandler);
            return () => {
                window.removeEventListener('click', AddModalCloseHandler);
            }
        }
    }, [open])

    useEffect(() => {
        if(open) {
            dispatch({type: 'ADD', data: true});
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
            let tagList = JSON.parse(localStorage.getItem('tag'));
            todoList.push({id: todoID,title: Title, description: Description, tagId: TagId, addDay: `${year}-${month}-${day}`,editDay: "", dday: Dday,completeDay: "", isComplete: false});
            tagList.push({id: TagId, name: Title, color: Description, bgColor: TagId, addDay: `${year}-${month}-${day}`});
            localStorage.setItem('todo', JSON.stringify(todoList));
            localStorage.setItem('tag', JSON.stringify(tagList));
            dispatch({type: 'TODO_ID', data: todoID+1});
            close();
        } else {
            alert("제목을 입력해주세요")
        }
    }

    return(
    <>
    {open?
    <div className="AddEdit-Conatiner">
        <div className="addEdit-conatiner" ref={AddModal}>
            <div className="title-conatiner">
                <input onChange={titleInputHandler} placeholder="title" />
            </div>
            <div className="description-conatiner">
                <input onChange={descriptionInputHandler} placeholder="description"/>
            </div>
            <div className="tag-conatiner">
                <input onChange={tagInputHandler} placeholder="tag"/>
            </div>
            <div className="dday-conatiner">
                <input onChange={ddayInputHandler} type="date" placeholder="dday" />
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

export default Add;