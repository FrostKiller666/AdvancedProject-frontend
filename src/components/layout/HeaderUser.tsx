import React, {SyntheticEvent, useContext, useState} from 'react';
import {FaUserCircle} from 'react-icons/fa';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {CustomButton} from "../UI/CustomButton";
import {SearchContext} from "../../contexts/search.context";

import classes from "./Header.module.css";
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";


const HeaderUser = () => {
    const {setSearch} = useContext(SearchContext);
    const [inputValue, setInputValue] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies();

    const setSearchFormLocalState = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputValue);
    }

    const logoutHandler = () => {
        removeCookie('JWT');
    }

    return (
        <Navbar variant="dark" bg="dark" expand="md" className={classes.customContainer}>
            <Container fluid>
                <Navbar.Brand as={Link} to='/'><strong>Mega</strong> Ogłoszenia</Navbar.Brand>
                <Navbar.Collapse id="navbar-dark-example" className={classes.collapse}>
                    <form className={classes.search} onSubmit={setSearchFormLocalState}>
                        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                        <CustomButton type={"submit"}>Szukaj</CustomButton>
                    </form>
                    <CustomButton to={'/add'} type={"button"}>Dodaj ogłoszenie</CustomButton>
                    <Nav>
                        <NavDropdown
                            className={classes.customDropDown}
                            drop={'start'}
                            id="nav-dropdown-dark-example"
                            title={<FaUserCircle className={classes.userIcon}/>}
                            menuVariant="dark"
                        >
                            <NavDropdown.Item as={Link} to='/user/YourAccount'>Zmień hasło</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/user/announcement'>Twoje Ogłoszenia</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item as={Link} onClick={logoutHandler} to='/'>Wyloguj</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export {
    HeaderUser,
}
