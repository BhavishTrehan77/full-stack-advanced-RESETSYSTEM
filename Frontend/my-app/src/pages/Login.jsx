import { useState } from "react"

import axios from "axios"

function Login(){
    
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const handleLogin=async()=>{
        const res=await axios.post("http://localhost:3000/api/v1/data/login",{email,password})
        alert("Logged in successfully hurrayy!")
    }
    return(
        <>
       
        <input type="email" placeholder="enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleLogin}>Login</button>
        </>
    )
}
export default Login