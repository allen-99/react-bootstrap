import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import "./App.css"

import HeaderBar from "./layout/Header";

import DoneTasks from "./pages/done-tasks";
import Login from "./pages/login";
import SignUp from "./pages/sign-up";
import Todo from "./pages/todo";

import useToken from "./hooks/useToken";


function App() {
    const {token, removeToken, setToken} = useToken();

    const isAuth = () => {
        return !!(token && token !== "" && token !== undefined && token !== null);
    }
    return (
        <div>
            <BrowserRouter>
                <HeaderBar token={token} removeToken={removeToken}/>
                <Routes>
                    {isAuth() && <Route exact path='/' element={<Todo token={token}/>}/>}
                    {!isAuth() && <Route path='/login' element={<Login setToken={setToken}/>}/>}
                    {!isAuth() && <Route path='/sign-up' element={<SignUp setToken={setToken}/>}/>}
                    {isAuth() && <Route path='/todo' element={<Todo token={token}/>}/>}
                    {isAuth() && <Route path='/done-tasks' element={<DoneTasks token={token}/>}/>}
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
