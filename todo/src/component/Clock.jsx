import React, { useEffect, useState } from "react";
import '../assets/css/Clock.css';

function Clock() {
    const [hour, setHour] = useState();
    const [min, setMin] = useState();
    const [sec, setSec] = useState();
    
    const getTime = () => {
        try {
            let date = new Date();
            setHour(String(date.getHours()).padStart(2, "0"));
            setMin(String(date.getMinutes()).padStart(2, "0"));
            setSec(String(date.getSeconds()).padStart(2, "0"));
        } catch(err) {
            console.log(err)
        } finally {
            console.log("qwer")
        }
        
    }

    useEffect(() => {
        let time = setInterval(getTime, 1000);
        return () => {
            clearInterval(time);
        }
    }, [])

    return(
        <>
        {hour!==undefined?(
        <div className="Clock-Conatiner">
            {hour}:{min}:{sec}
        </div>
        ):<div className="Clock-Conatiner">todo</div>
        }
        </>
    );
}

export default Clock;