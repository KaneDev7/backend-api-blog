
"use client"
import { useEffect, useState } from "react";
import { getArticles } from "../lib/articles";
import { setAuth } from "./use.case/authSlice";
import { useDispatch } from "react-redux";
import Category from './components/Category'
import ArtticleItem from './components/ArtticleItem'

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
      <Category />
      <div className="mt-20">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Actualités nationales</h1>
        </header>

        <span> {articles?.length} article{articles?.length > 1 && 's'} </span>
        <ul className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-wrap">
          {
            articles && articles?.map(article => (
              <ArtticleItem article={article} />
            ))
          }

        </ul>
      </div>

    </main>
  );
}
