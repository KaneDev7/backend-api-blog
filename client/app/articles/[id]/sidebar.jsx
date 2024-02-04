"use client"
import React, { useState, useEffect } from 'react'
import { getArticles } from '../../../lib/articles'
import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar({articleId}) {
    const [articles, setArticles] = useState([])

    const troncText = (text, length) => {
        if (text.length < length) return text
        return text.slice(0, length) + '...'
    }

    useEffect(() => {
        const fetcheData = async () => {
            const data = await getArticles()
            
            const dataFilterd = data.filter(item => item.id !== articleId)
            console.log('dataFilterd', dataFilterd)
            setArticles(dataFilterd)
        }
        fetcheData()
    }, [articleId])

    return (
        <div >
            <ul className='w-[300px] '>
                {
                    articles.map(article => (
                        <li key={article.id} className='my-5'>

                            <Image className='mt-10 w-full h-[160px] object-cover' alt="image de l'article" src={`/images/${article.url}`} width={500} height={400} />
                            <Link href={`/articles/${article.id}`}>
                                <h1 title={article.title} className='mt-2 text-xl font-bold hover:underline'> {troncText(article.title, 50)} </h1>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
