import React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useHistory } from 'react-router-dom'

export default function Signup() {

    const { signup } = useAuth()
    const history = useHistory();

    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e)=>{
        setInput({...input, [e.target.name]:e.target.value})
        console.log(input)
    }

    const handleSubmit =  async(e)=>{
        e.preventDefault()
        try{
        await signup(input.email, input.password)
        history.push("/")
        } catch(error){
            console.log(error)
        }
    }
  return (
    <div>
        <h1>Registrase</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <label>Email</label>
            <input type="text" name='email' value={input.email} placeholder='Email' onChange={(e)=>handleChange(e)}/>
            <label>Password</label>
            <input type="password" name='password' value={input.password} placeholder='Password' onChange={(e)=>handleChange(e)}/>
            <button type='submit' onSubmit={handleSubmit}>Signup</button>
        </form>
    </div>
  )
}
