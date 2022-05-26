import React, {SyntheticEvent, useContext, useState} from 'react';

import {CustomButton} from "../UI/CustomButton";
import {SearchContext} from "../../contexts/search.context";

import classes from "./Header.module.css";

const Header = () => {
    const {setSearch} = useContext(SearchContext);
    const [inputValue, setInputValue] = useState('');

    const setSearchFormLocalState = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputValue);
    }

    return (
        <header>
            <h1>
                <strong>Mega </strong> Ogłoszenia
            </h1>
            <CustomButton to={'/add'} type={"button"}>Dodaj ogłoszenie</CustomButton>
            <form className={classes.search} onSubmit={setSearchFormLocalState}>
                <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                <CustomButton type={"submit"}>Szukaj</CustomButton>
            </form>
        </header>
    );
}

export {
    Header,
}
