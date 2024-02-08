
"use client"
import { useEffect, useState } from "react";
import { getArticles } from "../lib/articles";
import Link from "next/link";
import { setAuth } from "./use.case/authSlice";
import { useDispatch } from "react-redux";

export default  function Home() {
  const [articles,setArtcicles] = useState()
  const dispatch = useDispatch()


  const troncText = (text, length) =>{
    if(text.length < length) return text
    return text.slice(0,length) + '...'
  }
 
  useEffect(() =>{
    const fetchData = async () =>{
      const data = await getArticles()
      setArtcicles(data)
    }
    fetchData()
  },[])
  
  useEffect(() => {
    const sessionAuth = JSON.parse(sessionStorage.getItem('auth')) || null
    dispatch(setAuth(sessionAuth))  
  }, [])

  return (
    <main className="globalWidth">
      <ul className="mt-[100px] ">
      <h1 className="text-4xl font-bold">Tous les articles</h1>

        {
          articles?.map(item => (
            <li className=" text-2xl mt-5">
              <Link className="hover:underline" href={`/articles/${item.id}`}> {troncText(item.title, 50)} </Link>
              <p className="text-sm "> {new Date(item.createdAt).toLocaleDateString()} </p>
            </li>
          ))
        }
      </ul>
    </main>
  );
}
