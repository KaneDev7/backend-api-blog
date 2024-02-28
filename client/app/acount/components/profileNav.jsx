import Link from 'next/link'
import React from 'react'
import { IoMdAddCircle } from "react-icons/io"
import { FaCircleUser } from "react-icons/fa6";
;

export default function ProfileNav() {
    return (
        <div className='globalWidth flex justify-end'>
            <div className="inline-flex rounded-md " role="group">
                <Link href='/acount/profile'>
                    <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-primary ">
                    <FaCircleUser size={15} className='hover:text-primary'/>
                        <span className='ml-2'> Profile</span>
                    </button>
                </Link>
                <Link href='/acount/add'>
                    <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 rounded-r-lg bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-primary  ">
                        <IoMdAddCircle size={18}  />
                        <span className='ml-2'>Ajouter</span>
                    </button>
                </Link>
            
            </div>

        </div>

    )
}
