import React, {SyntheticEvent, useContext, useState} from 'react';
import {FaUserCircle} from 'react-icons/fa';

import {CustomButton} from "../UI/CustomButton";
import {SearchContext} from "../../contexts/search.context";

import classes from "./Header.module.css";
import {Link} from "react-router-dom";

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
                <Link className={classes.link} to='/'><strong>Mega </strong> Ogłoszenia</Link>
            </h1>
            <form className={classes.search} onSubmit={setSearchFormLocalState}>
                <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                <CustomButton type={"submit"}>Szukaj</CustomButton>
            </form>
            <h2>Liczba aktualnych ogłoszeń to: </h2>
            <FaUserCircle/>
        </header>
    );
}

export {
    Header,
}
