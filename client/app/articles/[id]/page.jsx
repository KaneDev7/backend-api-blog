"use client"
import { Oswald } from "next/font/google";

import { getArticle } from '../../../lib/articles'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import SideBar from './components/sidebar'
import Comments from './components/comments'
import Category from '../../components/Category'
import { getComments } from "../../../lib/comments";
import ArticleDetail from './components/articleDetail'


const inter = Oswald({ subsets: ["latin"] });

export default function page() {
  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [commentLength, setCommentLength] = useState(0)

  const articleBody = useRef(null)
  const { id: articleId } = useParams()

  console.log('article', article)

  useEffect(() => {
    const fetcheData = async () => {
      setIsLoading(false)
      const comments = await getComments(articleId)
      let responseLength = 0

      for (const comment of comments) {
        responseLength += comment.responseToComments.length
      }
      
      const data = await getArticle(articleId)
      articleBody.current.innerHTML = data.body
      setCommentLength(comments.length + responseLength)
      setArticle(data)
    }
    fetcheData()
    setIsLoading(true)
  }, [articleId])

  if (!isLoading) return <p>Chargement...</p>
  return (
    <div className={`globalWidth`}>
      <Category />
      <div className='my-[100px]'>
        <div className='w-4/6 '>
          <p className='py-1  px-3 bg-red-600 text-[12px] text-white inline-block font-bold mb-7'> {article.category?.title} </p>
          <h1 className={`${inter.className} text-5xl font-bold mb-5 text-black/90 `}> {article?.title} </h1>
          <ArticleDetail article={article} commentLength={commentLength} />
        </div>

        <div className='flex lg:flex-row flex-col gap-10'>
          <div className='flex-1'>
            <Image className='my-10 w-full h-[400px] object-cover' alt="image de l'article" src={`/images/${article.url}`} width={500} height={400} />
            <p className="text-[13px] pb-3 flex items-center gap-3">
              <span className="w-[4px] h-[4px] bg-primary rounded-full inline-block "></span>
              <span> {article?.title} </span>
            </p>
            <div ref={articleBody} className={`text-[18px] leading-8 mt-5`}></div>
            <Comments commentLength={commentLength} />
          </div>
          <SideBar articleId={article?.id} />
        </div>

      </div>

    </div>
  )
}
