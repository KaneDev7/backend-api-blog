"use client"

import { deleteArticle, editArticle, getArticle } from '../../../lib/articles'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import SideBar from './sidebar'

export default function page() {
  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const articleBody = useRef(null)
  const router = useRouter()
  const { id } = useParams()



  useEffect(() => {
    const fetcheData = async () => {
      setIsLoading(false)
      const data = await getArticle(id)
      console.log('body', data)
      articleBody.current.innerHTML = data.body
      setArticle(data)
    }
    fetcheData()
    setIsLoading(true)

  }, [id])

  // if(article.message){
  //   return <p>{article.message} </p>
  // }
  if (!isLoading) return <p>Chargement...</p>
  return (
    <div className='globalWidth  '>

      <div className='my-[50px]'>
        <div className='w-4/6 '>
          <p className='py-1 px-3 bg-red-600 text-[12px] text-white inline-block font-bold mb-5'> {article.category?.title} </p>
          <h1 className='text-4xl font-bold mb-5'> {article.title} </h1>
        </div>
        <div className='flex gap-10'>
          <div className='flex-1'>
            <Image className='my-10 w-full h-[400px] object-cover' alt="image de l'article" src={`/images/${article.url}`} width={500} height={400} />
            <div ref={articleBody} className='text-xl leading-10'></div>
          </div>
          <SideBar articleId={article.id} />
        </div>

      </div>

    </div>
  )
}
