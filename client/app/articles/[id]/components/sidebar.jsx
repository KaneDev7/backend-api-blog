"use client"
import React, { useState, useEffect } from 'react'
import { getArticles } from '../../../../lib/articles'
import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar({ articleId }) {
    const [articles, setArticles] = useState([])

    const troncText = (text, length) => {
        if (text.length < length) return text
        return text.slice(0, length) + '...'
    }

    useEffect(() => {
        const fetcheData = async () => {
            const data = await getArticles()
            const dataFilterd = data.filter(item => item.id !== articleId)
            setArticles(dataFilterd.reverse())
        }
        fetcheData()
    }, [articleId])

    return (
        <div className='w-[300px]'>

            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>On en parle</h1>
                <span className='h-[2px] w-[100px] bg-black '></span>
            </div>

            <ul className=''>

                {
                    articles.map(article => (
                        <li key={article.id} className='my-5'>
                            <Image className='mt-10 w-full h-[160px] object-cover' alt="image de l'article" src={`/images/${article.url}`} width={500} height={400} />
                            <Link href={`/articles/${article.id}`}>
                                <h1 title={article.title} className='mt-2 text-[16px] font-bold hover:underline'> {troncText(article.title, 50)} </h1>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
