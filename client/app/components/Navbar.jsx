"use client"
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const auth = useSelector(state => state.auth)
  console.log("nav", auth)

    return (
        <div className='flex justify-center items-center w-full h-[70px]  bg-black/85'>
            <div className='flex justify-between  text-white globalWidth'>
                <h1 className='text-3xl text-white'>
                    <Link href='/' >KANBLOGS</Link>
                </h1>
                <ul className='flex justify-center items-center gap-5'>
                    <li> <Link href='/'> Articles </Link> </li>
                    <li> <Link href='/acount/add'> Ajouter article </Link> </li>
                </ul>
                <ul className='flex justify-center items-center gap-5'>
                    <li> <Link href='/auth/login'> Se connecter </Link> </li>
                    <li> <Link href='/auth/register'> S'inscrire </Link> </li>
                    <li> <Link href='/acount/add'> {auth && auth.username} </Link> </li>
                </ul>
            </div>
        </div>
    )

}
