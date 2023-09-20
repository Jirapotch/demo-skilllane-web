import { createContext } from 'react';
import { createReducer } from '@reduxjs/toolkit';

const SearchCourse = createContext();

export const searchState = ""

export const searchReducer = createReducer(searchState, {
    SET_SEARCH: (state, { payload }) => { 
        return state, payload 
    }
});

export default SearchCourse;