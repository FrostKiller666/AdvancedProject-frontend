import React from 'react';

import styles from './App.module.css'

const App = () => {
    return (
        <>
            <header>
                <h1>
                    <strong>Mega </strong> Ogłoszenia
                </h1>
                <button className={styles.addAnnouncement}>Dodaj ogłoszenie</button>
                <div className={styles.search}>
                    <input type="text"/>
                    <button>Szukaj</button>
                </div>
            </header>
            <div className={styles.map}>
                ...
            </div>
        </>
    );
}

export {
    App,
}
