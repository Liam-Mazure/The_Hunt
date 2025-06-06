import { useState } from 'react'
import Home from './pages/home'
import Play from './pages/playHunts'
import User from './pages/user'
import CreateHunt from './pages/createHunt'
import EditHunts from './pages/editHunts'
import EditHunt from './pages/editHunt'
import EditUser from './pages/editUser'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
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
          <Route path = '/user/signIn/' element = {<SignIn/>}/>
          <Route path = '/user/signUp/' element = {<SignUp/>}/>
          <Route path = '/user/editUser' element = {<EditUser/>}/>
          <Route path = '/hunt/create/' element = {<CreateHunt/>}/>
          <Route path = '/hunt/list/edit' element = {<EditHunts/>}/>
          <Route path = '/hunt/list/:huntId/update' element = {<EditHunt/>}/>
          <Route path = '/hunt/list/play' element = {<Play/>}/>
          <Route path = '/hunt/list/:huntId' element = {<PlayHunt/>}/>
          <Route path = '/user/all/info/:id' element = {<User/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
