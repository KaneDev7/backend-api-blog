"use client"
import React, { useEffect, useState } from 'react'
import ArtticleItem from './ArtticleItem'
import { getArticleByCategory } from '../../lib/articles'
import { getCategory } from '../../lib/category'

export default function ArticleList({ type, category }) {
    const [articles, setArtcicles] = useState()
    
    const gridCol = type === 'lg' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 flex-wrap mt-5' :
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap mt-5'

    useEffect(() => {
        const fetchData = async () => {
            const categoryData = await getCategory(category)
            const data = await getArticleByCategory(categoryData?.id)
            setArtcicles(data.reverse())
        }
        fetchData()
    }, [])


    return (
        <div className="mt-20">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-primary">{category} </h1>
            </header>

            <ul className={gridCol} >
                {
                    articles && articles?.map(article => (
                        <ArtticleItem key={article.id} article={article} />
                    ))
                }
            </ul>
        </div>

    )
}
