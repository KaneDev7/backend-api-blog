"use client"
import React, { useEffect, useState } from 'react'
import { getCategory } from '../../lib/category'
import Link from 'next/link'

export default function Category({ categoryId = 1 }) {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCategory()
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
                            className={`border cursor-pointer border-white  ${Number(categoryId) === category?.id ? 'bg-red-500' : 'bg-black/90'} 
                            text-[11px] text-white text-nowrap hover:bg-red-500 hover:text-white`} >
                            <Link className='py-2 px-2 block' href={`/articles/category/${category?.id}?title=${category?.title} `}  > {category?.title} </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
