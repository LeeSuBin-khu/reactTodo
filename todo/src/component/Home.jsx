import React from "react";
import Clock from './Clock';
import List from './List';
import Option from './Option';

import '../assets/css/Home.css';

function Home() {
    return(
        <div className="Home-Conatiner">
            <Clock />
            <Option />
            <List />
        </div>
    );
}

export default Home;