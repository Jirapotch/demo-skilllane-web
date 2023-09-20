import React from 'react';
import {
    Routes,
    Route,
    BrowserRouter,
} from "react-router-dom";

import MainPage from './routes/MainPage'
import Course from './routes/CoursePage'
import Login from './routes/Login';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />}>
                    <Route index element={<Course />} />
                </Route>
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;