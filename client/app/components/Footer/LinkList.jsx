import Link from 'next/link'
import React from 'react'

export default function LinkList({list}) {
    return (
        <ul className='text-white/60 text-[11px] leading-8'>
            {
                list.map(item =>(
                    <li className='hover:text-white '> <Link href='#'> {item}  </Link> </li>
                )) 

            }
        </ul>
    )
}
