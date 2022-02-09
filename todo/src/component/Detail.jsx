import React from "react";
import '../assets/css/Detail.css';

function Detail() {
    const HomeBtnClickHandler = () => {
        window.location.replace('/');
    }

    return(
        <div className="Detail-Container">
            <button onClick={HomeBtnClickHandler}>HOME</button>
        </div>
    );
}

export default Detail;