import { createContext } from "react";

const emptyFunc = () => {};

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: emptyFunc,
    logout: emptyFunc,
    isAuthenticated: false,
});