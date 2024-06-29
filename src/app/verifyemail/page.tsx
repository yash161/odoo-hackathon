'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function verifyEmailPage() {
    const [token,setToken] = useState("")
    const [verified,setVerified] = useState(false)
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)

    const verifyUserEmail = async () =>{
        try {

            setLoading(true)
            await axios.post('/api/users/verifyemail',{token})
            setVerified(true)
            
        } catch (error:any) {
            setError(true)
            console.log(error.reponse.data);
            
            
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1] 
        console.log("use Effect one --> ",urlToken);
        
        setToken(urlToken || ""
        // else we can also use useRouter next method

        )
    },[])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className="text-4xl">{loading ? "Processing" : "Verify Email"}</h1>
        <h2>{token ? token : "No token"}</h2>
        <button className='p-2 border mt-10 border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        onClick={verifyUserEmail}
        >
            Verify Account
        </button>

        {
            verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>

                </div>
            )
        }

        {
            error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )
        }
    </div>
  )
}