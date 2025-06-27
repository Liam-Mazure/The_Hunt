import Home from './pages/home'
import Play from './pages/playHunts'
import User from './pages/user'
import CreateHunt from './pages/createHunt'
import EditHunts from './pages/editHunts'
import EditHunt from './pages/editHunt'
import EditUser from './pages/editUser'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import NotFound from './pages/notFound'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import PlayHunt from './pages/playHunt'
import ProtectedRoute from './components/protectedRoute'

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path = '/' element = {<ProtectedRoute><Home/></ProtectedRoute>} exact/>
          <Route path = '/user/signIn/' element = {<SignIn/>}/>
          <Route path = '/user/signUp/' element = {<SignUp/>}/>
          <Route path = '/user/editUser/' element = {<ProtectedRoute><EditUser/></ProtectedRoute>}/>
          <Route path = '/hunt/create/' element = {<ProtectedRoute><CreateHunt/></ProtectedRoute>}/>
          <Route path = '/hunt/list/edit' element = {<ProtectedRoute><EditHunts/></ProtectedRoute>}/>
          <Route path = '/hunt/list/:huntId/update' element = {<ProtectedRoute><EditHunt/></ProtectedRoute>}/>
          <Route path = '/hunt/list/play' element = {<ProtectedRoute><Play/></ProtectedRoute>}/>
          <Route path = '/hunt/list/:huntId' element = {<ProtectedRoute><PlayHunt/></ProtectedRoute>}/>
          <Route path = '/user/all/info/:id' element = {<ProtectedRoute><User/></ProtectedRoute>}/>
          <Route path = "*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
