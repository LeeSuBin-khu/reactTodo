import React, { useRef, useEffect, useState, createElement } from "react";
import { useSelector, useDispatch  } from 'react-redux';

import '../../assets/css/modal/AddEdit.scss';

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
    const [TagInput, setTagInput] = useState([]);
    const [TagTextColorInput, setTagTextColorInput] = useState([]);
    const [TagBgColorInput, setTagBgColorInput] = useState([]);
    const [TagDB, setTagDB] = useState([]);
    const [Dday,setDday] = useState();

    const todoID = useSelector((state) => state.todoID);

    const AddModalCloseHandler = ({ target }) => {
        try {
            if(!AddModal.current.contains(target) && target.className !== 'tag') {
                setTagInput("");
                setTagTextColorInput("");
                setTagBgColorInput("");
                setTagDB([]);
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
        setTagInput(target.value);
    }

    const tagTextColorInputHandler = ({ target }) => {
        setTagTextColorInput(target.value);
    }

    const tagBgColorInputHandler = ({ target }) => {
        setTagBgColorInput(target.value);
    }

    const overlayTagColorManageHandler = (tagList, todoList) => {
        for(let tag of tagList) {
            for(let newTag of TagDB) {
                tag.tag.map( i => (i.name === newTag.name?(i.color = newTag.color, i.bgColor = newTag.bgColor, localStorage.setItem('tag', JSON.stringify(tagList)), overlayTagColorManageHandlerForTodo(tag, todoList)):null));
            }
        }
    }

    const overlayTagColorManageHandlerForTodo = (tag, todoList) => {
        for(let todo of todoList) {
            if(tag.id === todo.id) {
                todo.tag = tag.tag;
                localStorage.setItem('todo', JSON.stringify(todoList));
            }
        }
    }

    const tagAddClickHandler = () => {
        if(TagDB.length < 5) {
            if(TagDB.length === 0) {
                setTagDB( prev => [...prev, {name: TagInput, color: TagTextColorInput, bgColor: TagBgColorInput}] );
                setTagInput("");
                setTagTextColorInput("");
                setTagBgColorInput("");
            } else {
                let temp = false;
                for(let tag of TagDB) {
                    if(tag.name === TagInput) {
                        temp = false;
                        alert("같은 할 일에 태그 중복은 불가능합니다");
                        break;
                    } else if(tag.color === TagTextColorInput && tag.bgColor === TagBgColorInput) {
                        temp = false;
                        alert("태그 색상이 중복됩니다");
                        break;
                    } else {
                        temp = true;
                    }
                }
                if(temp) {
                    setTagDB( prev => [...prev, {name: TagInput, color: TagTextColorInput, bgColor: TagBgColorInput}] );
                    setTagInput("");
                    setTagTextColorInput("");
                    setTagBgColorInput("");
                }
            }
        } else {
            alert("최대 5개까지 추가할 수 있습니다");
        }
    }

    const tagDeleteClickHandler = ({ target }) => {
        setTagDB(TagDB.filter( tag => tag.name !== target.innerHTML));
    }

    const ddayInputHandler = ({ target }) => {
        setDday(target.value);
    }

    const completeBtnClickHandler = async () => {
        if(Title !== "") {
            let todoList = JSON.parse(localStorage.getItem('todo'));
            let tagList = JSON.parse(localStorage.getItem('tag'));
            todoList.push({id: todoID,title: Title, description: Description, tag: TagDB, addDay: `${year}-${month}-${day}`,editDay: "", dday: Dday,completeDay: "", isComplete: false});
            tagList.push({id: todoID, tag: TagDB, addDay: `${year}-${month}-${day}`});
            await overlayTagColorManageHandler(tagList, todoList);
            localStorage.setItem('todo', JSON.stringify(todoList));
            localStorage.setItem('tag', JSON.stringify(tagList));
            dispatch({type: 'TODO_ID', data: todoID+1});
            setTagDB([]);
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
                <input className="title" onChange={titleInputHandler} placeholder="제목을 입력하세요" />
            </div>
            <div className="description-conatiner">
                <input className="description" onChange={descriptionInputHandler} placeholder="설명을 입력하세요" />
            </div>
            <div className="tag-create-conatiner">
                <input className="tag-create" onChange={tagInputHandler} value={TagInput} placeholder="태그를 입력하세요" />
                <div>
                <label>글자색 </label>
                <input className="tag-create-color" onChange={tagTextColorInputHandler} type="color" />&nbsp;
                <label>배경색 </label>
                <input className="tag-create-bg" onChange={tagBgColorInputHandler} type="color" />
                <button className="tag-create-btn" onClick={tagAddClickHandler}>태그 생성</button>
                </div>
            </div>
            <div className="tag-container">
            {TagDB?TagDB.map( (tag, idx) => <div className="tag" style={{color: tag.color, background: tag.bgColor}} onClick={tagDeleteClickHandler} key={idx}>{tag.name}</div>):<></>}
            </div>
            <div className="dday-conatiner">
                <label>마감일 </label>
                <input className="dday" onChange={ddayInputHandler} type="date" />
            </div>
            <div className="btn-conatiner">
                <button className="btn" onClick={completeBtnClickHandler}>완료</button>
            </div>
        </div>
    </div>
    :<></>}
    </>
    );
}

export default Add;