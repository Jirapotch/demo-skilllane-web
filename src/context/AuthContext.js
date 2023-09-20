import { createContext } from 'react';
import { createReducer } from '@reduxjs/toolkit';

const AuthContext = createContext();

export const userState = {
    uid: "",
    un: "",
    fname: "",
    lname: "",
    role: "",
    img: ""
}

export const userReducer = createReducer(userState, {
    GET_USER: (state, action) => {
        return { ...state, ...action.payload };
    },
});

export default AuthContext;