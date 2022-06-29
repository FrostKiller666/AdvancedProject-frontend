import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from "react-router-dom"
import {CookiesProvider} from 'react-cookie';

import {App} from './App';
import './index.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    //Triger twice my useeffect fetch StricMode
    //<React.StrictMode>
    <BrowserRouter>
        <CookiesProvider>
            <App/>
        </CookiesProvider>
    </BrowserRouter>
    //</React.StrictMode>
);

