import React from 'react';

import styles from "./Header.module.css";


const Header = () => {
    return (
        <header>
            <h1>
                <strong>Mega </strong> Ogłoszenia
            </h1>
            <button>Dodaj ogłoszenie</button>
            <div className={styles.search}>
                <input type="text"/>
                <button>Szukaj</button>
            </div>
        </header>
    )
}

export {
    Header,
}
