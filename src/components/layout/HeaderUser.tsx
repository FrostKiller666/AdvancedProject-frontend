import React, {SyntheticEvent, useContext, useState} from 'react';
import {FaUserCircle} from 'react-icons/fa';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {CustomButton} from "../UI/CustomButton";
import {SearchContext} from "../../contexts/search.context";

import classes from "./Header.module.css";
import {Link} from "react-router-dom";


const HeaderUser = () => {
    const {setSearch} = useContext(SearchContext);
    const [inputValue, setInputValue] = useState('');

    const setSearchFormLocalState = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputValue);
    }


    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to='/'><strong>Mega</strong> Ogłoszenia</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example"/>
                <Navbar.Collapse id="navbar-dark-example">
                    <form className={classes.search} onSubmit={setSearchFormLocalState}>
                        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                        <CustomButton type={"submit"}>Szukaj</CustomButton>
                    </form>
                    <CustomButton to={'/add'} type={"button"}>Dodaj ogłoszenie</CustomButton>
                    <Nav>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title={<FaUserCircle className={classes.userIcon}/>}
                            menuVariant="dark"
                        >
                            <NavDropdown.Item as={Link} to='/'>Twoje Dane</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/'>Twoje Ogłoszenia</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item as={Link} to='/'>Wyloguj</NavDropdown.Item>
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
