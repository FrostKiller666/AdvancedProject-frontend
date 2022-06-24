import React, {SyntheticEvent, useContext, useState} from 'react';
import {FaUserCircle} from 'react-icons/fa';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
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
        <Navbar variant="dark" bg="dark" expand="lg" className={classes.customContainer}>
            <Container fluid>

                <Navbar.Brand as={Link} to='/'><strong>Mega</strong> Ogłoszenia</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example"/>
                <Navbar.Collapse id="navbar-dark-example">
                    <form className={classes.search} onSubmit={setSearchFormLocalState}>
                        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                        <CustomButton type={"submit"}>Szukaj</CustomButton>
                    </form>

                    <Nav>
                        <NavDropdown
                            className={classes.customDropDown}
                            drop={'start'}
                            id="nav-dropdown-dark-example"
                            title={<FaUserCircle className={classes.userIcon}/>}
                            menuVariant="dark"
                        >
                            <NavDropdown.Item as={Link} to='/user/auth/login'> Zaloguj</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/user/register'>Zarejestruj</NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export {
    Header,
}
