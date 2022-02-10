import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import '../assets/css/Detail.scss';

function Detail() {
    const { state } = useLocation();
    const [TodoDB, setTodoDB] = useState();

    useEffect(() => {
        if(localStorage.getItem('todo')) {
            const todoList = JSON.parse(localStorage.getItem('todo'));
            for(let todo of todoList) {
                if(todo.id === parseInt(state.id)) {
                    setTodoDB(todo);
                }
            }
        }
        console.log(TodoDB)
    }, [state])

    //         제목
// 상세설명
// 태그
// 생성일
// 수정일
// 마감목표일
// 완료일
// 완료여부

    const HomeBtnClickHandler = () => {
        window.location.replace('/');
    }

    return(
        <>
        {TodoDB?(
        <div className="Detail-Container">
            <div className="content-container">
                <div className="title-container">
                    <div className="title">{TodoDB.title}</div>
                    {TodoDB.isComplete?(<div className="complete">완료</div>):(<div className="incomplete">미완료</div>)}
                </div>
                <div className="description">{TodoDB.description}</div>
                <div className="tag-container">
                    {TodoDB.tag.map( (t, idx) => <div className="tag" style={{background: t.bgColor, color: t.color, opacity: '0.8'}} key={idx}>{t.name}</div>)}
                </div>
                <div className="detail-container">
                    <div>생성일 : {TodoDB.addDay}</div>
                    {TodoDB.editDay!==""?(<div>수정일 : {TodoDB.editDay}</div>):(<div>수정일 : x</div>)}
                    <div>목표일 : {TodoDB.dday}</div>
                    {TodoDB.completeDay!==""?(<div>완료일 : {TodoDB.completeDay}</div>):(<div>완료일 : x</div>)}
                </div>
            </div>
            <button className="btn" onClick={HomeBtnClickHandler}>돌아가기</button>
        </div>
        ):<></>}
        </>
    );
}

export default Detail;