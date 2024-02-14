"use client"
import { getArticleByCategory } from '../../../../lib/articles'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Category from '../../../components/Category'
import { convertISOToDuration, troncText } from '../../../../utils'

export default function page() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const {categoryId } = useParams()
    const searchParam = useSearchParams()

    const title = searchParam.get('title')
    console.log('searchParam', searchParam.get('title'))


    useEffect(() => {
        const fetcheData = async () => {
            setIsLoading(false)
            const data = await getArticleByCategory(categoryId)
            console.log('body', data)
            setArticles(data.reverse())
        }
        fetcheData()
        setIsLoading(true)

    }, [categoryId])

    // if(article.message){
    //   return <p>{article.message} </p>
    // }
    if (!isLoading) return <p>Chargement...</p>
    return (
        <main className="globalWidth">
            <Category categoryId={categoryId}/>
            <div className="mt-20">
                <h1 className="text-2xl font-bold"> {title} </h1>
                <span> {articles.length} article{articles.length > 1 && 's'} </span>
                {articles.length < 1 && <p> Nous n'avons pas trouvé d'article pour cette catégorie </p>}

                <ul className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-wrap">
                    {
                        articles?.map(article => (
                            <li key={article.id} className='my-5'>

                                <Image className='w-full h-[160px] object-cover' alt="image de l'article" src={`/images/${article.url}`} width={500} height={400} />
                                <Link href={`/articles/${article.id}`}>
                                    <h1 title={article.title} className='mt-2 text-[16px] font-bold hover:underline'> {troncText(article.title, 50)} </h1>
                                </Link>
                                <span className="text-[13px] text-black/75"> {convertISOToDuration(article?.createdAt)}  </span>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </main>
    )
}
