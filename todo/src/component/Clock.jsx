import React, { useEffect, useState } from "react";
import '../assets/css/Clock.css';

function Clock() {
    const [hour, setHour] = useState();
    const [min, setMin] = useState();
    const [sec, setSec] = useState();
    
    const getTime = () => {
        let date = new Date();
        setHour(String(date.getHours()).padStart(2, "0"));
        setMin(String(date.getMinutes()).padStart(2, "0"));
        setSec(String(date.getSeconds()).padStart(2, "0"));
    }

    useEffect(() => {
        setInterval(getTime, 1000);
    }, [])

    return(
        <div className="Clock-Conatiner">
            {hour}:{min}:{sec}
        </div>
    );
}

export default Clock;