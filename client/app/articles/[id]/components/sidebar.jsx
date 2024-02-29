"use client"
import React, { useState, useEffect } from 'react'
import { getArticles } from '../../../../lib/articles'
import Image from 'next/image'
import Link from 'next/link'
import ArtticleItem from '../../../components/ArtticleItem'

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
        <div className='w-full lg:w-[300px]'>

            <div className='w-[300px] lg:w-full mb-6 lg:mb-0 flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>On en parle</h1>
                <span className='h-[2px] w-[100px] bg-black '></span>
            </div>

            <ul className='w-full flex flex-row lg:flex-col flex-wrap gap-6'>

                {
                    articles.map(article => (
                        <ArtticleItem key={article.id} article={article} />
                    ))
                }
            </ul>
        </div>
    )
}
