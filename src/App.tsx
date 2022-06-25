import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom';

import {Header} from "./components/layout/Header";
import {Map} from "./components/Map/Map";
import {SearchContext} from "./contexts/search.context";

import {AddAnnouncement} from "./components/AddAnnouncement/AddAnnouncement";
import {LoginAnnouncement} from "./components/LoginAnnoucement/LoginAnnouncement";
import {RegisterAnnouncement} from "./components/RegisterAnnouncement/RegisterAnnouncement";
import {HeaderUser} from "./components/layout/HeaderUser";


const App = () => {
    const [search, setSearch] = useState('');
    const [logged, setLogged] = useState(false);
    return (
        <>
            <SearchContext.Provider value={{
                search,
                setSearch,
                logged,
                setLogged,
            }}>
                {logged && <HeaderUser/>}
                {!logged && <Header/>}
                <Routes>
                    <Route path={'/'} element={<Map/>}/>
                    <Route path={'/add'} element={<AddAnnouncement/>}/>
                    <Route path={'/user/auth/login'} element={<LoginAnnouncement/>}/>
                    <Route path={'/user/register'} element={<RegisterAnnouncement/>}/>
                </Routes>
            </SearchContext.Provider>
        </>
    );
}

export {
    App,
}
