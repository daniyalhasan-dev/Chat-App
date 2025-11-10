import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../src/pages/Login/Login'
import Chat from '../src/pages/Chat/Chat'
import Profile from '../src/pages/ProfileUpdate/ProfileUpdate'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes> 
    </>
  )
}

export default App