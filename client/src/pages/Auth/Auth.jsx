import React from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'

const Auth = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.authReducer.loading)
    const [isSignUp, setIsSignUp] = useState(true)
    console.log(loading)
    const [data, setData] = useState({firstname:"",lastname:"",username:"",password:"",confirmPass:""});

    const [confirmPass, setConfirmPass] = useState(true)

    const handleChange = (e)=>{
        setData({...data, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(isSignUp) {
            data.password === data.confirmPass ? dispatch(signUp(data)) : setConfirmPass(false)
        }
        else {
            dispatch(logIn(data))
        }
    }

    const resetForm = ()=>{
        setConfirmPass(true)
        setData({firstname:"",lastname:"",username:"",password:"",confirmPass:""})
    }

  return (
    <div className="Auth">
        {/* Left Side */}
        <div className="a-left">
            <img src={Logo} alt="" />
            <div className="Webname">
                <h1>Social Network</h1>
                <h6>Explore the ideas throughout the world</h6>
            </div>
        </div>
        {/* Right Side */}
        <div className="a-right">
            <form action="" className='infoForm authForm' onSubmit = {handleSubmit}>
                <h3>{isSignUp? "Sign Up" : "Log In"}</h3>
                {isSignUp && 
                    <div>
                        <input 
                            type="text" 
                            placeholder='First Name' 
                            className='infoInput'
                            name='firstname'
                            onChange={handleChange}
                            value={data.firstname}
                        />
                        <input 
                            type="text" 
                            placeholder='Last Name' 
                            className='infoInput'
                            name='lastname'
                            onChange={handleChange}
                            value={data.lastname}
                        />
                    </div>
                }
                
                <div>
                    <input 
                        type="text"
                        placeholder='Username' 
                        className="infoInput"
                        name='username' 
                        onChange={handleChange}
                        value={data.username}
                    />
                </div>
                <div>
                    <input 
                        type="password"
                        placeholder='Password' 
                        className="infoInput"
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                    />
                    {isSignUp && 
                        <input 
                            type="password"
                            placeholder='Confirm Password' 
                            className="infoInput"
                            name='confirmPass'
                            onChange={handleChange}
                            value={data.confirmPass}
                        />
                    }
                </div>
                <span style={{display:confirmPass?"none":"block",
                            color:'red', fontSize:'12px', alignSelf:"flex-end",
                            marginRight:"5px"}}>
                    * Password and Confirm Password is not same
                </span>
                <div>
                    <span style={{fontSize:'12px', cursor:"pointer"}} onClick = {()=>{setIsSignUp((prev)=>!prev); resetForm()}}>
                        {isSignUp? "Already have an account. Login!" : "Don't have an account? Sign Up!"}
                    </span>
                </div>
                <button className="button infoButton" type='submit' disabled={loading}>{loading? "Loading..." : isSignUp?"Sign up":"Log in"}</button>
            </form>
        </div>
    </div>
  )
}

export default Auth