import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'
import { signup } from '../../config/firebase'

const Login = () => {

  const [currState,setCurrState] = useState("Sign Up");

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className="logo" />
      <form className="login-form">
        <h2>{currState}</h2>
        {currState === "Sign Up"
        ?
        <input type="text" placeholder='username' className="form-input" required />
        :
        null
        }
        <input type="email" placeholder='Email Address' className="form-input" required />
        <input type="password" placeholder='password' className="form-input" required />
        <button type='submit'>{currState === "Sign Up"?"Create Account":"Login Now"}</button>
        <div className='login-term'>
          <input type="checkbox" />
          <p>Agree to the terms of terms of use & Privacy Policy</p>
        </div>
        <div className="login-forget">
          {currState === "Sign Up"
          ?<p className="login-toggle">Already have an account <span onClick={()=>setCurrState("Login In")}>login here</span></p>
          :<p className="login-toggle">Create an account <span onClick={()=>setCurrState("Sign Up")}>click here</span></p>
          }

        </div>
      </form>
    </div>
  )
}

export default Login
