import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom';

import {Header} from "./components/layout/Header";
import {Map} from "./components/Map/Map";
import {SearchContext} from "./contexts/search.context";

import {AddAnnouncement} from "./components/AddAnnouncement/AddAnnouncement";
import {LoginAnnouncement} from "./components/LoginAnnoucement/LoginAnnouncement";
import {RegisterAnnouncement} from "./components/RegisterAnnouncement/RegisterAnnouncement";
import {HeaderUser} from "./components/layout/HeaderUser";
import {UserAnnouncement} from "./components/UserAnnouncement/UserAnnouncement";
import {useCookies} from "react-cookie";
import {UserPersonalDataAnnouncement} from "./components/UserPersonalDataAnnouncement/UserPersonalDataAnnouncement";

const App = () => {
    const [search, setSearch] = useState('');
    const [cookies, setCookie] = useCookies();

    return (
        <>
            <SearchContext.Provider value={{
                search,
                setSearch,
            }}>
                {cookies.JWT && <HeaderUser/>}
                {!cookies.JWT && <Header/>}
                <Routes>
                    <Route path={'/'} element={<Map/>}/>
                    <Route path={'/add'} element={<AddAnnouncement/>}/>
                    <Route path={'/user/auth/login'} element={<LoginAnnouncement/>}/>
                    <Route path={'/user/register'} element={<RegisterAnnouncement/>}/>
                    <Route path={'/user/YourAccount'} element={<UserPersonalDataAnnouncement/>}/>
                    <Route path={'/user/announcement'} element={<UserAnnouncement/>}/>
                </Routes>
            </SearchContext.Provider>
        </>
    );
}

export {
    App,
}
