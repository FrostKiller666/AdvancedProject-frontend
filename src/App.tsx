import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom';

import {Header} from "./components/layout/Header";
import {Map} from "./components/Map/Map";
import {SearchContext} from "./contexts/search.context";

import {AddAnnouncement} from "./components/AddAnnouncement/AddAnnouncement";
import {LoginAnnouncement} from "./components/LoginAnnoucement/LoginAnnouncement";
import {RegisterAnnouncement} from "./components/RegisterAnnouncement/RegisterAnnouncement";


const App = () => {
    const [search, setSearch] = useState('');

    return (
        <>
            <SearchContext.Provider value={{
                search,
                setSearch
            }}>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<Map/>}/>
                    <Route path={'/add'} element={<AddAnnouncement/>}/>
                    <Route path={'/user/login'} element={<LoginAnnouncement/>}/>
                    <Route path={'/user/register'} element={<RegisterAnnouncement/>}/>
                </Routes>
            </SearchContext.Provider>
        </>
    );
}

export {
    App,
}
