import React, { useState } from "react";
import { useDispatch  } from 'react-redux';
import Add from './modal/Add';
import '../assets/css/Option.css';

function Option() {
    const dispatch = useDispatch();

    //... 추가 모달 관련
    const [AddModalOpen, setAddModalOpen] = useState(false);
    const AddOpenHandler = () => {
        setAddModalOpen(true);
    }
    const AddCloseHandler = () => {
        setAddModalOpen(false);
        dispatch({type: 'ADD', data: false});
    }
    //...

    const completeViewOptionHandler = ({ target }) => {
        if(target.value === 'complete') {
            dispatch({type: 'COMPLETE', data: true});
        } else if(target.value === 'incomplete') {
            dispatch({type: 'COMPLETE', data: false});
        } else {
            dispatch({type: 'COMPLETE', data: null});
        }
    }

    return(
        <div className="Option-Conatiner">
            <div className="filter-Container">
                <select onChange={completeViewOptionHandler}>
                    <option value="">전체보기(완료여부)</option>
                    <option value="complete">완료</option>
                    <option value="incomplete">미완료</option>
                </select>
            </div>
            <div className="addDelete-container">
                <div className="add" onClick={AddOpenHandler}>+</div>
            </div>
            <Add open={AddModalOpen} close={AddCloseHandler} />
        </div>
    );
}

export default Option;