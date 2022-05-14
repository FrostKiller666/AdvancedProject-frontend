import React from 'react';

import classes from './App.module.css'
import {Header} from "./components/layout/Header";

const App = () => {
    return (
        <>
            <Header/>
            <div className={classes.map}>
                ...
            </div>
        </>
    );
}

export {
    App,
}
