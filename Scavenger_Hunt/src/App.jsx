import { useState } from 'react'
import Login from './pages/login'
import Home from './pages/home'
import CreateUser from './pages/createUser'
import Play from './pages/playHunts'
import User from './pages/user'
import CreateHunt from './pages/createHunt'
import EditHunt from './pages/editHunt'
import EditUser from './pages/editUser'
import ViewHunts from './components/viewHunts'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import PlayHunt from './pages/playHunt'

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
          <Route path = '/hunt/create/' element = {<CreateHunt/>}/>
          <Route path = '/edit/' element = {<EditHunt/>}/>
          <Route path = '/hunt/list' element = {<Play/>}/>
          <Route path = '/hunt/list/:huntId' element = {<PlayHunt/>}/>
          <Route path = '/user/all/info/:id' element = {<User/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
