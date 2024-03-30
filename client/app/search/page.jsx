
"use client"
import { useEffect, useState } from "react";
import { getArticleByKey } from "../../lib/articles";
import ArtticleItem from '../components/ArtticleItem'

import React from 'react'
import {useSearchParams} from 'next/navigation'


export default function SearchResult() {
  const [articles, setArtcicles] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const serarchparam = useSearchParams()
  const searchKey= serarchparam.get('key')


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await getArticleByKey(searchKey)
      setArtcicles(data.reverse())
      setIsLoading(false)
    }
    fetchData()
  }, [searchKey])


  return (
    <main className="globalWidth">
      <div className="mt-20">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl">Resultats pour la recherche <span className="font-bold">{searchKey} </span> </h1>
         
        </header>
        <span> {articles?.length} article{articles?.length > 1 && 's'} </span>
        <ul className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-wrap">
          {
          articles &&  articles?.map(article => (
              <ArtticleItem key={article.id} article={article}/>
            ))
          }
        </ul>
        {isLoading && <p>Chargement...</p> }

      </div>

    </main>
  );
}
