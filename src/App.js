import React from 'react'
import {BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

import "./App.css"
import NavBar from './components/NavBar'


import DoneTasks from "./pages/done-tasks";
import Login from "./pages/login";
import SignUp from "./pages/sign-up";
import Todo from "./pages/todo";


function App() {


    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route exact path='/' exact element={<Todo />}/>
                <Route path='login' element={<Login />}/>
                <Route path='todo' element={<Todo />}/>
                <Route path='done-tasks' element={<DoneTasks />}/>
                <Route path='sign-up' element={<SignUp/>}/>
            </Routes>
        </Router>
    )
}

export default App;