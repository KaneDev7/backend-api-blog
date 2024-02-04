import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div className='flex justify-center items-center w-full h-[70px]  bg-black/85'>
           <div className='flex justify-between  text-white globalWidth'>
            <h1 className='text-3xl text-white'>KANBLOGS</h1>
            <ul className='flex justify-center items-center gap-5'>
                <li> <Link href='/'> Articles </Link> </li>
                <li> <Link href='/articles/add'> Ajouter article </Link> </li>
            </ul>
           </div>
        </div>
    )
}
