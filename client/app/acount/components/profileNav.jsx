import Link from 'next/link'
import React from 'react'
import { IoMdAddCircle } from "react-icons/io";

export default function ProfileNav() {
    return (
        <div className='globalWidth flex justify-end'>
            <div className="inline-flex rounded-md " role="group">
                <Link href='/acount/profile'>
                    <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 ">
                        <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                        Profile
                    </button>
                </Link>
                <Link href='/acount/add'>
                    <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 rounded-r-lg bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 ">
                        <IoMdAddCircle size={18}  />
                        
                        <span className='ml-2'>Ajouter</span>
                    </button>
                </Link>
            
            </div>

        </div>

    )
}
