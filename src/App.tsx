import React from 'react';

import styles from './App.module.css'
import {Header} from "./components/layout/Header";

const App = () => {
    return (
        <>
            <Header/>
            <div className={styles.map}>
                ...
            </div>
        </>
    );
}

export {
    App,
}
