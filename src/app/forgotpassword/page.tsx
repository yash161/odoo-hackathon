'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default  function forgotPage() {
    const [loading,setLoading] = useState(false)
    const [error , setError] = useState(false)
    const [email,setEmail] = useState('')
    const router = useRouter()


    const handleBtnForgot = async () =>{
        try {
            setLoading(true)
            setError(false)
            await axios.post('/api/users/forgotpassword',{email})
            router.push('/login')

        } catch (error:any) {
            setError(true)
            console.log(error.reponse.data);
        } finally{
            setLoading(false)
        }
    }
  return (
<div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Forgot Password"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      onClick={handleBtnForgot}
      >
        Submit
      </button>
    </div>
  )
}