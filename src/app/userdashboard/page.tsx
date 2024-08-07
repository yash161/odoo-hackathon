"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function page() {
  const [loading,setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {

  
    try {
      setLoading(true)
      await axios.get('/api/users/logout')
      router.push('/')

    } catch (error:any) {
        console.log(error.message);
        
    } finally{
      setLoading(false)
    }
  }


  return (
    <AuroraBackground>
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.8,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative flex flex-col gap-4 items-center justify-center px-4"
    >
      <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
        Welcome To The Grievance Web Application
      </div>
      <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
        Please Select
      </div>
      <Link href='/grievance' className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
        Add Grievance 
      </Link>
      <Link href='/viewgrievance' className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
        View All Grievance
      </Link>
      <button onClick={handleLogout} className="bg-black hover:bg-red-500 dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
        Logout
      </button>
    </motion.div>
  </AuroraBackground>
  )
}

export default page