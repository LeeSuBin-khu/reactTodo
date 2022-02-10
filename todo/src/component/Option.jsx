import React, { useState } from "react";
import { useDispatch  } from 'react-redux';
import Add from './modal/Add';
import '../assets/css/Option.scss';

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
                    <option value="">완료 여부별 보기</option>
                    <option value="complete">완료</option>
                    <option value="incomplete">미완료</option>
                </select>
            </div>
            <div className="add-container">
                <div className="add" onClick={AddOpenHandler}>추가</div>
            </div>
            <Add open={AddModalOpen} close={AddCloseHandler} />
        </div>
    );
}

export default Option;