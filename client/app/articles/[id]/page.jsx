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
  const router = useRouter()
  const { id } = useParams()
  const articleBody = useRef(null)

  const handleDelete = async (id) => {
    const data = await deleteArticle(id)
    router.push('/')
  }

  useEffect(() => {
    const fetcheData = async () => {
      setIsLoading(false)
      const data = await getArticle(id)
      articleBody.current.innerHTML = data.body
      setArticle(data)
    }
    fetcheData()
    setIsLoading(true)

  }, [id])

  if (!isLoading) return <p>Chargement...</p>
  return (
    <div className='globalWidth  '>

      <div className='my-[50px]'>
        <div className='w-4/6 '>
          <p className='py-1 px-3 bg-red-600 text-[12px] text-white inline-block font-bold mb-5'> {article.category} </p>
          <h1 className='text-4xl font-bold mb-5'> {article.title} </h1>
        </div>
        <div className='flex gap-10'>
          <div className='flex-1'>
            <Image className='my-10 w-full h-[400px] object-cover' alt="image de l'article" src={`/images/${article.url}`} width={500} height={400} />
            <div ref={articleBody} className='text-xl leading-10'></div>
            <button
              onClick={() => handleDelete(article.id)}
              className='bg-red-500 text-white mt-4 px-4 py-2 rounded-md opacity-90 hover:opacity-100  mr-5'>
              supprimer
            </button>
            <button

              className='bg-blue-500 text-white px-4 py-2 rounded-md opacity-90 hover:opacity-100 mt-4  '>
              <Link href={`/articles/edit/${article.id}`}>
                Modifier
              </Link>
            </button>
          </div>
          <SideBar articleId={article.id} />
        </div>

      </div>

    </div>
  )
}
