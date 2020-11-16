import {createContext} from 'react';

export const MainContext = createContext({
    userId: null,
    login: () => {},
    logout: () => {},
    loggedIn: false,
    themeSwitch: false,
    setTheme: () => {},
    postId: null,
    usePost: () => {}
});