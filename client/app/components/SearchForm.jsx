'use client'

import React,{useState}  from 'react'
import {useRouter} from 'next/navigation'


function SearchForm() {
  const [searchKey, setSearchKey] = useState('')
  const route =useRouter()

  const onSearch = async (e) => {
    e.preventDefault()
    route.push(`/search?key=${searchKey}`)  
    setSearchKey(``)
  }

    return (
        <form onSubmit={onSearch} className="">
            <div className="relative w-[250px] ">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                onChange={(e)=> setSearchKey(e.target.value) }
                    value={searchKey}
                    type="search"
                    id="default-search"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Rechercher d'articles..." required />
            </div>
        </form>
    );
}

export default SearchForm;
