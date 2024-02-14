
"use client"
import { useEffect, useState } from "react";
import { getArticles } from "../lib/articles";
import Link from "next/link";
import { setAuth } from "./use.case/authSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Category from './components/Category'
import {convertISOToDuration, troncText} from '../utils'

export default function Home() {
  const [articles, setArtcicles] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArticles()
      setArtcicles(data.reverse())
    }
    fetchData()
  }, [])

  useEffect(() => {
    const sessionAuth = JSON.parse(sessionStorage.getItem('auth')) || null
    dispatch(setAuth(sessionAuth))
  }, [])

  return (
    <main className="globalWidth">
      <Category/>
      <div className="mt-20">
        <h1 className="text-2xl font-bold">Actualités nationales</h1>
        <span> {articles?.length} article{articles?.length > 1 && 's'} </span>
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
  );
}
