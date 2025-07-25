import React, {useState, useContext} from 'react'
import UserContext from '../context/UserContext'

function Login(){
  const [username, setUserName] = useState('')
const [password, setPassword] = useState('')
 const handleSubmit =()=>{

 }
  return (
    <>
    <h2>Login</h2>
    <input type='text' value={username} onChange={(e)=> setUserName(e.target.value)} placeholder='UserName' 
    />

    <input type='password' value={password}  onChange={(e)=> setPassword(e.target.value)} placeholder='Password'/>

    <button onClick={handleSubmit}>Submit</button>
    </>
  )
}