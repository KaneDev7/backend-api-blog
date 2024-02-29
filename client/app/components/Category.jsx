"use client"
import React, { useEffect, useState } from 'react'
import { getCategories } from '../../lib/category'
import Link from 'next/link'

export default function Category({ categoryId = 1 }) {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCategories()
            setCategories(data)
        }
        fetchData()
    }, [])

    return (
        <div className='my-10'>
            <ul className='flex flex-wrap'>
                {
                    categories.map((category, index) => (
                        <li
                            key={category?.id}
                            className={`border cursor-pointer'} 
                            text-[11px] text-white text-nowrap bg-black/5 opacity-90 rounded-md hover:bg-black/10 hover:text-white m-1`} >
                            <Link className='py-1 px-2 text-black  block' href={`/articles/category/${category?.id}?title=${category?.title} `}  > {category?.title} </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
