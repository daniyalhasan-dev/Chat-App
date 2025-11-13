import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from '../src/pages/Login/Login'
import Chat from '../src/pages/Chat/Chat'
import Profile from '../src/pages/ProfileUpdate/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import { AppContext } from './context/AppContext'


const App = () => {

  const navigate = useNavigate();
  const {loaduserData} = useContext(AppContext)

  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=>{
      if (user) {
        navigate('/chat')
        await loaduserData(user.uid);
      }
      else{
        navigate('/')
      }
    })
  },[])

  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes> 
    </>
  )
}

export default App