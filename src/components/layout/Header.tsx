import React from 'react';

import classes from "./Header.module.css";
import {CustomButton} from "../UI/CustomButton";


const Header = () => {
    return (
        <header>
            <h1>
                <strong>Mega </strong> Ogłoszenia
            </h1>
            <CustomButton type={"button"}>Dodaj ogłoszenie</CustomButton>
            <div className={classes.search}>
                <input type="text"/>
                <CustomButton type={"button"}>Szukaj</CustomButton>
            </div>
        </header>
    )
}

export {
    Header,
}
