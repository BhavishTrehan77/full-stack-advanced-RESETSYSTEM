import { useState } from "react"
import axios from "axios"

function Signup(){
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const handleSignup=async()=>{
        const res=await axios.post("http://localhost:3000/api/v1/data/signup",{name,email,password})
        alert("Siggnnnnedd uppp successsss hurrayyy||||")
    }
    return(
        <>
        <input type="text" placeholder="enter your name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="email" placeholder="enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleSignup}>Signup</button>
        </>
    )
}

export default Signup