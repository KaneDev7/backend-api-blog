"use client"
import { Oswald } from "next/font/google";

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../use.case/authSlice'
import { FaCircleUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import SearchForm from "./SearchForm";

const inter = Oswald({ subsets: ["latin"] });

export default function Navbar() {
    const auth = useSelector(state => state.auth)
    const rooter = useRouter()
    const dispatch = useDispatch()

    const handleClick = () => {
        sessionStorage.removeItem('auth')
        dispatch(setAuth(null))
        rooter.push('/auth/login')
    }

    useEffect(() => {
        const sessionAuth = JSON.parse(sessionStorage.getItem('auth')) || null
        dispatch(setAuth(sessionAuth))
      }, [])

    return (
        <div className='flex justify-center items-center w-full h-[70px]  bg-black/90'>
            <div className='flex-1 globalWidth flex justify-between items-center text-white '>
                <h1 className={`${inter.className} text-4xl text-white`} >
                    <Link href='/' >SENBLOGS</Link>
                </h1>

                <ul className='flex justify-center items-center gap-5'>
                <SearchForm/>
                    {
                       auth &&
                            <>
                                <li className='text-withe-500 '>
                                    <Link href='/acount/profile' className='flex justify-center items-center gap-2 py-2 px-4 bg-primary rounded-md text-white/85 font-bold '>
                                        <FaCircleUser size={25} />
                                        <p className='text-[12px] mt-1'>
                                            {auth?.username}
                                        </p>
                                    </Link>
                                </li>
                                <li className='cursor-pointer' onClick={handleClick}>  <TbLogout size={25} /> </li>

                            </> 
                            }
                    {!auth &&
                        <>
                            <button className=" "> <Link href='/auth/register'> S'inscrire </Link> </button>
                            <button className="py-3 px-4 bg-primary/90 hover:bg-primary rounded-md text-sm "> <Link href='/auth/login'> Se connecter </Link> </button>
                        </>
                    }


                </ul>
            </div>
        </div>
    )

}
