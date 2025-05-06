import { useState } from 'react'
import Login from './pages/login'
import Home from './pages/home'
import CreateUser from './pages/createUser'
import Play from './pages/playHunt'
import User from './pages/user'
import CreateHunt from './pages/createHunt'
import EditHunt from './pages/editHunt'
import EditUser from './pages/editUser'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar'

function App() {

  return (
    <>
    <div>
    <Navbar/>
      <Routes>
          <Route path = '/' element = {<Home/>}/>
          <Route path = '/user/login' element = {<Login/>}/>
          <Route path = '/user/createUser' element = {<CreateUser/>}/>
          <Route path = '/user/editUser' element = {<EditUser/>}/>
          <Route path = '/createHunt' element = {<CreateHunt/>}/>
          <Route path = '/editHunt' element = {<EditHunt/>}/>
          <Route path = '/play' element = {<Play/>}/>
          <Route path = '/user/all/info/:id' element = {<User/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
