"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../use.case/authSlice'
import { FaCircleUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";

export default function Navbar() {
    const auth = useSelector(state => state.auth)
    const rooter = useRouter()
    const dispatch = useDispatch()

    const handleClick = () => {
        sessionStorage.removeItem('auth')
        dispatch(setAuth(null))
        rooter.push('/auth/login')
    }

    return (
        <div className='flex justify-center items-center w-full h-[70px]  bg-black/85'>
            <div className='flex justify-between  text-white globalWidth'>
                <h1 className='text-3xl text-white'>
                    <Link href='/' >KANBLOGS</Link>
                </h1>

                <ul className='flex justify-center items-center gap-5'>
                    {
                        auth ?
                            <>
                                <li className='text-withe-500 '>
                                    <Link href='/acount/profile' className='flex justify-center items-center gap-2 py-2 px-4 bg-red-500 rounded-md text-black font-bold '>
                                        <FaCircleUser size={25} />
                                        <p className='text-[12px] mt-1'>
                                            {auth.username}
                                        </p>
                                    </Link>
                                </li>
                                <li className='cursor-pointer' onClick={handleClick}>  <TbLogout size={25} /> </li>

                            </> :
                            <>
                                <li> <Link href='/auth/login'> Se connecter </Link> </li>
                                <li> <Link href='/auth/register'> S'inscrire </Link> </li>
                            </>
                    }

                </ul>
            </div>
        </div>
    )

}
