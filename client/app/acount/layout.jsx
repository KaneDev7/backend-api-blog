"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { setAuth } from '../use.case/authSlice'

export default function AcountLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const rooter = useRouter()


  useEffect(() => {
    const sessionAuth = JSON.parse(sessionStorage.getItem('auth')) || null
    console.log('sessionAuth', sessionAuth)
    setAuth(sessionAuth)
    if(sessionAuth){
      setIsLoading(false)
    }
    if (!sessionAuth) {
      return rooter.push('/auth/login')
    }
  }, [])


  if (!isLoading) {
    return (
      <div className="globalWidth">
        {children}
      </div>
    );
  }

}



