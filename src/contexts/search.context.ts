import {createContext} from "react";

export const SearchContext = createContext({
    search: '',
    setSearch: (s: string) => {
    },
    logged: false,
    setLogged: (b: boolean) => {
    },
});
