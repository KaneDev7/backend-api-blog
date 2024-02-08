"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { setAuth } from '../use.case/authSlice'
import { useDispatch } from "react-redux";
import ProfileNav from './components/profileNav'

export default function AcountLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const rooter = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    const sessionAuth = JSON.parse(sessionStorage.getItem('auth')) || null
    console.log('sessionAuth', sessionAuth)
    dispatch(setAuth(sessionAuth))
    if (sessionAuth) {
      setIsLoading(false)
    }
    if (!sessionAuth) {
      return rooter.push('/auth/login')
    }
  }, [])


  if (!isLoading) {
    return (
      <div className="mt-20">
        <div className="globalWidth">
          <ProfileNav/>
          {children}
        </div>
      </div>

    );
  }

}



